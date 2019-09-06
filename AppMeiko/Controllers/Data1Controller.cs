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
    [RoutePrefix("Api/Data1")]
    public class Data1Controller : ApiController
    {
        //private IdentityFluxDB FluxDB = new IdentityFluxDB();

        [Route("GetGroup")]
        [HttpGet]
        public HttpResponseMessage GetGroup()
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var query = FluxDB.Data5.OrderByDescending(x=>x.Thutu).ToList();
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

        [Route("GetGroupFlux/{groupid}")]
        [HttpGet]
        public HttpResponseMessage GetGroupFlux(string groupid)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data1.Where(x =>x.Groupid.Contains(groupid)).OrderByDescending(x => x.Thutu).ToList();
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

        [Route("SearchFlux/{mahang}/{malot}")]
        [HttpGet]
        public HttpResponseMessage Search(string mahang, string malot)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data1.Where(p => p.Mahang == mahang && p.Malot == malot).ToList();
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
        public HttpResponseMessage Create(List<Data1> data1)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    DateTime dtime = DateTime.Now;
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    foreach (Data1 dt in data1)
                    {
                        if(!string.IsNullOrEmpty(dt.Mahang)&&!string.IsNullOrEmpty(dt.Malot)&&!string.IsNullOrEmpty(dt.Doday)&&!string.IsNullOrEmpty(dt.Soluong.ToString()))
                        {
                            var data = new Data1();
                            data.Flux_id = Guid.NewGuid();
                            data.Ngay = dtime.Date;
                            data.Thoigiantao = dtime.ToString("yyyy-MM-dd HH:mm");
                            data.Mahang = dt.Mahang;
                            data.Malot = dt.Malot;
                            data.Doday = dt.Doday;
                            data.Soluong = dt.Soluong;
                            data.Ghichu = dt.Ghichu;
                            data.Trangthai = dt.Trangthai;
                            data.Groupid = dtime.ToString("yyMMddHHmmss");
                            FluxDB.Data1.Add(data);
                        }  
                    }
                    var data5 = new Data5()
                    {
                       Groupid= dtime.ToString("yyMMddHHmmss"),
                       Namegroup= dtime.ToString("yyMMddHHmmss")
                    };
                    FluxDB.Data5.Add(data5);
                    List<Data2> results = FluxDB.Data2.ToList();
                    foreach(Data2 dt2 in results)
                    {
                        var quytrinh = new Data4()
                        {
                            User_id = null,
                            Groupid = dtime.ToString("yyMMddHHmmss"),
                            Nhomky_id = dt2.Nhomky_id,
                            Ngayky = null,
                            Ghichu = null,
                            Daky = false,
                            Kieunhom=dt2.Kieunhom,
                            Ngaytao= dtime.Date
                        };
                        FluxDB.Data4.Add(quytrinh);
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
        public HttpResponseMessage Update(Data1 data1)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data1.FirstOrDefault(p => p.Flux_id == data1.Flux_id);
                    data.Thoigiantao = data1.Thoigiantao;
                    data.Thoigianhoanthanh = data1.Thoigianhoanthanh;
                    data.Ngay = data1.Ngay;
                    data.Mahang = data1.Mahang;
                    data.Malot = data1.Malot;
                    data.Doday = data1.Doday;
                    data.Soluong = data1.Soluong;
                    data.Dodaytruoc = data1.Dodaytruoc;
                    data.Dodaysau = data1.Dodaysau;
                    data.Xacnhanql = data1.Xacnhanql;
                    data.Xacnhanpq = data1.Xacnhanpq;
                    data.Ghichu = data1.Ghichu;
                    data.Thutu = data1.Thutu;
                    data.Trangthai = data1.Trangthai;
                    data.Groupid = data1.Groupid;
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
                    var data = FluxDB.Data1.FirstOrDefault(p => p.Flux_id == id);
                    if (data != null)
                    {
                        FluxDB.Data1.Remove(data);
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
    }
}