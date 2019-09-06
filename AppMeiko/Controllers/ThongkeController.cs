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
    [RoutePrefix("Api/Flux")]
    public class ThongkeController : ApiController
    {
        [Route("GetFlux/{ngaybatdau}/{ngayketthuc}/{trangthai}")]
        [HttpGet]
        public HttpResponseMessage GetGroup(string ngaybatdau,string ngayketthuc,string trangthai)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    DateTime datefrom = Convert.ToDateTime(ngaybatdau).Date;
                    DateTime dateto = Convert.ToDateTime(ngayketthuc).Date;
                    if(trangthai=="1")
                    {
                        var query = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom && x.Ngaytao <= dateto).Select(x => x.Groupid).Distinct().ToList();
                        var query1 = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom).Where(x => x.Ngaytao <= dateto).ToList();
                        var query2 = (from dtFlux in FluxDB.Data1
                                      where dtFlux.Ngay >= datefrom && dtFlux.Ngay <= dateto && dtFlux.Trangthai == 1
                                      select new NewFlux()
                                      {
                                          Flux_id = dtFlux.Flux_id,
                                          Thoigiantao = dtFlux.Thoigiantao,
                                          Ngay = dtFlux.Ngay,
                                          Thoigianhoanthanh = dtFlux.Thoigianhoanthanh,
                                          Mahang = dtFlux.Mahang,
                                          Malot = dtFlux.Malot,
                                          Doday = dtFlux.Doday,
                                          Soluong = dtFlux.Soluong,
                                          Dodaytruoc = dtFlux.Dodaytruoc,
                                          Dodaysau = dtFlux.Dodaysau,
                                          Xacnhanql = dtFlux.Xacnhanql,
                                          Xacnhanpq = dtFlux.Xacnhanpq,
                                          Ghichu = dtFlux.Ghichu,
                                          Trangthai = dtFlux.Trangthai,
                                          Thutu = dtFlux.Thutu,
                                          Groupid = dtFlux.Groupid
                                      }).ToList();

                        List<string> nhomky = new List<string>();
                        string nguoiky = null;
                        foreach (string dt4Distinct in query)
                        {
                            foreach (Data4 dt4 in query1)
                            {
                                if (dt4.Groupid.Contains(dt4Distinct))
                                {
                                    nguoiky += dt4.User_id + ">";
                                }
                                nhomky.Add(dt4Distinct + "+" + nguoiky);
                            }
                            nguoiky = null;
                        }
                        List<NewFlux> Result = new List<NewFlux>();
                        foreach (NewFlux nFlux in query2)
                        {
                            foreach (string nk in nhomky)
                            {
                                if (nFlux.Groupid.Contains(nk.Split('+')[0]))
                                {
                                    if (nk.Split('+').Length > 0)
                                    {
                                        nFlux.Nhomky = nk.Split('+')[1];
                                    }
                                }
                            }
                            Result.Add(nFlux);
                        }
                        response.Content = new StringContent(JsonConvert.SerializeObject(Result));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        return response;
                    }
                    else if(trangthai=="0")
                    {
                        var query = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom && x.Ngaytao <= dateto).Select(x => x.Groupid).Distinct().ToList();
                        var query1 = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom).Where(x => x.Ngaytao <= dateto).ToList();
                        var query2 = (from dtFlux in FluxDB.Data1
                                      where dtFlux.Ngay >= datefrom && dtFlux.Ngay <= dateto && dtFlux.Trangthai == 0
                                      select new NewFlux()
                                      {
                                          Flux_id = dtFlux.Flux_id,
                                          Thoigiantao = dtFlux.Thoigiantao,
                                          Ngay = dtFlux.Ngay,
                                          Thoigianhoanthanh = dtFlux.Thoigianhoanthanh,
                                          Mahang = dtFlux.Mahang,
                                          Malot = dtFlux.Malot,
                                          Doday = dtFlux.Doday,
                                          Soluong = dtFlux.Soluong,
                                          Dodaytruoc = dtFlux.Dodaytruoc,
                                          Dodaysau = dtFlux.Dodaysau,
                                          Xacnhanql = dtFlux.Xacnhanql,
                                          Xacnhanpq = dtFlux.Xacnhanpq,
                                          Ghichu = dtFlux.Ghichu,
                                          Trangthai = dtFlux.Trangthai,
                                          Thutu = dtFlux.Thutu,
                                          Groupid = dtFlux.Groupid
                                      }).ToList();

                        List<string> nhomky = new List<string>();
                        string nguoiky = null;
                        foreach (string dt4Distinct in query)
                        {
                            foreach (Data4 dt4 in query1)
                            {
                                if (dt4.Groupid.Contains(dt4Distinct))
                                {
                                    nguoiky += dt4.User_id + ">";
                                }
                                nhomky.Add(dt4Distinct + "+" + nguoiky);
                            }
                            nguoiky = null;
                        }
                        List<NewFlux> Result = new List<NewFlux>();
                        foreach (NewFlux nFlux in query2)
                        {
                            foreach (string nk in nhomky)
                            {
                                if (nFlux.Groupid.Contains(nk.Split('+')[0]))
                                {
                                    if (nk.Split('+').Length > 0)
                                    {
                                        nFlux.Nhomky = nk.Split('+')[1];
                                    }
                                }
                            }
                            Result.Add(nFlux);
                        }
                        response.Content = new StringContent(JsonConvert.SerializeObject(Result));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        return response;
                    }
                    else
                    {
                        var query = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom && x.Ngaytao <= dateto).Select(x => x.Groupid).Distinct().ToList();
                        var query1 = FluxDB.Data4.Where(x => x.Ngaytao >= datefrom).Where(x => x.Ngaytao <= dateto).ToList();
                        var query2 = (from dtFlux in FluxDB.Data1
                                      where dtFlux.Ngay >= datefrom && dtFlux.Ngay <= dateto
                                      select new NewFlux()
                                      {
                                          Flux_id = dtFlux.Flux_id,
                                          Thoigiantao = dtFlux.Thoigiantao,
                                          Ngay = dtFlux.Ngay,
                                          Thoigianhoanthanh = dtFlux.Thoigianhoanthanh,
                                          Mahang = dtFlux.Mahang,
                                          Malot = dtFlux.Malot,
                                          Doday = dtFlux.Doday,
                                          Soluong = dtFlux.Soluong,
                                          Dodaytruoc = dtFlux.Dodaytruoc,
                                          Dodaysau = dtFlux.Dodaysau,
                                          Xacnhanql = dtFlux.Xacnhanql,
                                          Xacnhanpq = dtFlux.Xacnhanpq,
                                          Ghichu = dtFlux.Ghichu,
                                          Trangthai = dtFlux.Trangthai,
                                          Thutu = dtFlux.Thutu,
                                          Groupid = dtFlux.Groupid
                                      }).ToList();

                        List<string> nhomky = new List<string>();
                        string nguoiky = null;
                        foreach (string dt4Distinct in query)
                        {
                            foreach (Data4 dt4 in query1)
                            {
                                if (dt4.Groupid.Contains(dt4Distinct))
                                {
                                    nguoiky += dt4.User_id + ">";
                                }
                                nhomky.Add(dt4Distinct + "+" + nguoiky);
                            }
                            nguoiky = null;
                        }
                        List<NewFlux> Result = new List<NewFlux>();
                        foreach (NewFlux nFlux in query2)
                        {
                            foreach (string nk in nhomky)
                            {
                                if (nFlux.Groupid.Contains(nk.Split('+')[0]))
                                {
                                    if (nk.Split('+').Length > 0)
                                    {
                                        nFlux.Nhomky = nk.Split('+')[1];
                                    }
                                }
                            }
                            Result.Add(nFlux);
                        }
                        response.Content = new StringContent(JsonConvert.SerializeObject(Result));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                        return response;
                    }
                   
                }
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        private class NewFlux
        {
            public Guid Flux_id { get; set; }
            public string Thoigiantao { get; set; }
            public DateTime Ngay { get; set; }
            public string Thoigianhoanthanh { get; set; }
            public string Mahang { get; set; }
            public string Malot { get; set; }
            public string Doday { get; set; }
            public int Soluong { get; set; }
            public string Dodaytruoc { get; set; }
            public string Dodaysau { get; set; }
            public string Xacnhanql { get; set; }
            public string Xacnhanpq { get; set; }
            public string Ghichu { get; set; }
            public int Trangthai { get; set; }
            public int Thutu { get; set; }
            public string Groupid { get; set; }
            public string Nhomky { get; set; }
        }
    }
}
