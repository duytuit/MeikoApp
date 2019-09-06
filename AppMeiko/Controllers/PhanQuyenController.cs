using AppMeiko.Models.FluxDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AppMeiko.Controllers
{
    [RoutePrefix("Api/PhanQuyen")]
    public class PhanQuyenController : ApiController
    {
        [Route("GetQuyen/{nhomkyid}")]
        [HttpGet]
        public HttpResponseMessage GetQuyen(string nhomkyid)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var query = (from dtMenu in FluxDB.Data8
                                 join dtPhanQuyen in FluxDB.Data6
                                  on dtMenu.Menuid equals dtPhanQuyen.Menuid into dtGroup1
                                 from dtPhanQuyen in dtGroup1.DefaultIfEmpty()
                                 where dtPhanQuyen.Nhomky_id.ToString().Contains(nhomkyid)
                                 select new phanquyen()
                                 {
                                     Quyenid = dtPhanQuyen.Quyenid,
                                     Menuid = dtMenu.Menuid,
                                     Idcha = dtMenu.Idcha,
                                     Tenmenu = dtMenu.Tenmenu,
                                     Capdo = dtMenu.Capdo,
                                     Duongdan = dtMenu.Duongdan,
                                     Icon = dtMenu.Icon,
                                     Nhomky_id = string.IsNullOrEmpty(dtPhanQuyen.Nhomky_id.ToString())?null :dtPhanQuyen.Nhomky_id.ToString(),
                                     quyenXem = dtPhanQuyen.quyenXem,
                                     quyenThem = dtPhanQuyen.quyenThem,
                                     quyenCapNhap = dtPhanQuyen.quyenCapNhap,
                                     quyenXoa = dtPhanQuyen.quyenXoa
                                 }).ToList();
                    List<phanquyen> PhanquyenTree = GetPhanQuyenTree(query, null);
                    response.Content = new StringContent(JsonConvert.SerializeObject(PhanquyenTree));
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        [HttpPost]
        public HttpResponseMessage Create(List<Data6> data6)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    foreach (Data6 dt in data6)
                    {
                        var data = new Data6()
                        {
                            Menuid = dt.Menuid,
                            Nhomky_id = dt.Nhomky_id,
                            quyenXem=dt.quyenXem,
                            quyenThem=dt.quyenThem,
                            quyenCapNhap=dt.quyenCapNhap,
                            quyenXoa=dt.quyenXoa
                        };
                        FluxDB.Data6.Add(data);
                    }

                    FluxDB.SaveChanges();
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(Data6 data6)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                        var data = FluxDB.Data6.SingleOrDefault(p => p.Quyenid == data6.Quyenid);
                        data.Menuid = data6.Menuid;
                        data.Nhomky_id = data6.Nhomky_id;
                        data.quyenXem = data6.quyenXem;
                        data.quyenThem = data6.quyenThem;
                        data.quyenCapNhap = data6.quyenCapNhap;
                        data.quyenXoa = data6.quyenXoa;
                        FluxDB.SaveChanges();
                   
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Delete(Guid id)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data6.SingleOrDefault(p => p.Quyenid == id);
                    FluxDB.Data6.Remove(data);
                    FluxDB.SaveChanges();
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        private List<phanquyen> GetPhanQuyenTree(List<phanquyen> list, string parentID)
        {
            return list.Where(x => x.Idcha == parentID).Select(x => new phanquyen()
            {
                Quyenid = x.Quyenid,
                Menuid = x.Menuid,
                Idcha = x.Idcha,
                Tenmenu = x.Tenmenu,
                Capdo = x.Capdo,
                Duongdan=x.Duongdan,
                Icon=x.Icon,
                Nhomky_id = x.Nhomky_id,
                quyenXem = x.quyenXem,
                quyenThem = x.quyenThem,
                quyenCapNhap = x.quyenCapNhap,
                quyenXoa = x.quyenXoa,
                ListPhanquyen = GetPhanQuyenTree(list,x.Menuid)
            }).ToList();
        }
        private class phanquyen
        {
            public Guid Quyenid { get; set; }

            public string Menuid { get; set; }

            public string Idcha { get; set; }

            public string Tenmenu { get; set; }

            public int Capdo { get; set; }

            public string Duongdan { get; set; }

            public string Icon { get; set; }

            public string Nhomky_id { get; set; }

            public bool quyenXem { get; set; }

            public bool quyenThem { get; set; }

            public bool quyenCapNhap { get; set; }

            public bool quyenXoa { get; set; }

            public List<phanquyen> ListPhanquyen { get; set; }
        }
    }
}
