using AppMeiko.Models.FluxDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AppMeiko.Controllers
{
    [RoutePrefix("Api/Data2")]
  
    public class Data2Controller : ApiController
    {
        //private IdentityFluxDB FluxDB = new IdentityFluxDB();

        [Route("GetNhom")]
        [HttpGet]
        public HttpResponseMessage GetNhom()
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var query = FluxDB.Data2.ToList();
                    response.Content = new StringContent(JsonConvert.SerializeObject(query));
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
        public HttpResponseMessage Create(Data2 data2)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var nhomky = new Data2()
                    {
                        Nhomky_id=Guid.NewGuid(),
                        Tennhom = data2.Tennhom,
                        Kieunhom = data2.Kieunhom,
                        Trangthai = data2.Trangthai
                    };
                    FluxDB.Data2.Add(nhomky);
                    List<Data8> menu = FluxDB.Data8.ToList();
                    foreach (Data8 dt in menu)
                    {
                        var dataQuyen = new Data6()
                        {
                            Menuid = dt.Menuid,
                            Nhomky_id = nhomky.Nhomky_id,
                            quyenXem = false,
                            quyenThem = false,
                            quyenCapNhap = false,
                            quyenXoa = false
                        };
                        FluxDB.Data6.Add(dataQuyen);
                    }

                    FluxDB.SaveChanges();
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [HttpPut]
        public HttpResponseMessage Update(Data2 data2)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data2.SingleOrDefault(p => p.Nhomky_id == data2.Nhomky_id);
                    data.Thutu = data2.Thutu;
                    data.Tennhom = data2.Tennhom;
                    data.Kieunhom = data2.Kieunhom;
                    data.Trangthai = data2.Trangthai;
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
                    var data = FluxDB.Data2.SingleOrDefault(p => p.Nhomky_id == id);
                    FluxDB.Data2.Remove(data);
                    FluxDB.SaveChanges();
                    return response;
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
      
    }
}