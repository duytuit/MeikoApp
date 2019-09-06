using AppMeiko.Models.FluxDB;
using AppMeiko.Sendmail;
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
    [RoutePrefix("Api/Data4")]
    public class Data4Controller : ApiController
    {
        //private IdentityFluxDB FluxDB = new IdentityFluxDB();
        AutoSendMail s = new AutoSendMail();
        [Route("GetQuytrinh/{nhomkyid}")]
        [HttpGet]
        public HttpResponseMessage GetQuytrinh(string nhomkyid)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data4.Where(x=>x.Nhomky_id.ToString().Contains(nhomkyid)).OrderByDescending(x => x.Thutu).ToList();
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
        [Route("GetQuytrinhKieunhom/{kieunhom}")]
        [HttpGet]
        public HttpResponseMessage GetQuytrinhKieunhom(int kieunhom)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data4.Where(x => x.Kieunhom==kieunhom).ToList();
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
        [Route("GetQuytrinhGroupFlux/{groupid}")]
        [HttpGet]
        public HttpResponseMessage GetQuytrinhGroupFlux(string groupid)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data4.Where(x => x.Groupid.ToString().Contains(groupid)).ToList();
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
        [Route("SearchQuytrinh/{mahang}/{malot}")]
        [HttpGet]
        public HttpResponseMessage Search(string mahang,string malot)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = (from dt4 in FluxDB.Data4
                                 join dt1 in FluxDB.Data1
                                 on dt4.Groupid equals dt1.Groupid
                                 where dt1.Mahang.Contains(mahang) && dt1.Malot.Contains(malot)
                                 select new
                                 {
                                     mahang = dt1.Mahang,
                                     malot = dt1.Malot,
                                     doday = dt1.Doday,
                                     soluong = dt1.Soluong,
                                     dodaytruoc = dt1.Dodaytruoc,
                                     dodaysau = dt1.Dodaysau,
                                     xacnhanql = dt1.Xacnhanql,
                                     xacnhanpq = dt1.Xacnhanpq,
                                     flux_note = dt1.Ghichu,
                                     ngayky = dt4.Ngayky,
                                     ql_note = dt4.Ghichu,
                                     daky = dt4.Daky,
                                     user_id = dt4.User_id,
                                 }
                                ).ToList();
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
        public HttpResponseMessage Create(Data4 data4)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = new Data4()
                    {
                        User_id = data4.User_id,
                        Groupid = data4.Groupid,
                        Nhomky_id = data4.Nhomky_id,
                        Ngayky = data4.Ngayky,
                        Ghichu = data4.Ghichu,
                        Daky = data4.Daky,
                    };
                    FluxDB.Data4.Add(data);
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
        public HttpResponseMessage Update(Data4 data4)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data4.SingleOrDefault(p => p.Quytrinh_id == data4.Quytrinh_id);
                    data.User_id = data4.User_id;
                    data.Nhomky_id = data4.Nhomky_id;
                    data.Ngayky = data4.Ngayky;
                    data.Ghichu = data4.Ghichu;
                    data.Daky = data4.Daky;
                    data.Thutu = data4.Thutu;
                    data.Groupid = data4.Groupid;
                    FluxDB.SaveChanges();
                    string idnhomky= data4.Nhomky_id.ToString();
                    //gửi yêu cầu qua mail

                    //mailtitle tên nhóm yêu cầu
                    string tennhom = FluxDB.Data2.Where(x => x.Nhomky_id.ToString().Contains(idnhomky)).ToList().First().Tennhom;

                    int MaxKieunhom = FluxDB.Data2.Max(x => x.Kieunhom);

                    if(MaxKieunhom-data4.Kieunhom>0)
                    {
                        Guid nhomkuid = FluxDB.Data2.Where(x => x.Kieunhom == data4.Kieunhom + 1).ToList().First().Nhomky_id;
                        List<Data3> getlistMail = FluxDB.Data3.Where(x => x.Nhomky_id.ToString().Contains(nhomkuid.ToString())).ToList();
                        List<string> listmail = new List<string>();
                        foreach (Data3 dt in getlistMail)
                        {
                            if (dt.Email != null || dt.Email != "")
                            {
                                listmail.Add(dt.Email);
                            }
                        }
                        s.SendMail(listmail[0].ToString(), listmail, tennhom, data4.Groupid, data4.Ngayky, data4.User_id, data4.Ghichu);
                    }else
                    {
                        Guid nhomkuid = FluxDB.Data2.Where(x => x.Kieunhom ==1).ToList().First().Nhomky_id;

                        List<Data3> getlistMail = FluxDB.Data3.Where(x => x.Nhomky_id.ToString().Contains(nhomkuid.ToString())).ToList();
                        List<string> listmail = new List<string>();
                        foreach (Data3 dt in getlistMail)
                        {
                            if (dt.Email != null || dt.Email != "")
                            {
                                listmail.Add(dt.Email);
                            }
                        }
                        
                        s.SendMail(listmail[0].ToString(), listmail, tennhom, data4.Groupid, data4.Ngayky, data4.User_id, data4.Ghichu);
                    }

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
                    var data = FluxDB.Data4.SingleOrDefault(p => p.Quytrinh_id == id);
                    FluxDB.Data4.Remove(data);
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
