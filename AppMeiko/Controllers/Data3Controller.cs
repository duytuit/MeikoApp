using AppMeiko.Models.FluxDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

namespace AppMeiko.Controllers
{
    [RoutePrefix("Api/Data3")]
    public class Data3Controller : ApiController
    {
       // private IdentityFluxDB FluxDB = new IdentityFluxDB();

        [Route("GetUserNhom")]
        [HttpGet]
        public HttpResponseMessage GetUserNhom()
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data3.ToList();
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
        public HttpResponseMessage Create(Data3 data3)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                        var data = new Data3()
                        {
                            Tennhomky=data3.Tennhomky,
                            UserID = data3.UserID,
                            Manhanvien = data3.Manhanvien,
                            Username =data3.Username,
                            Email = data3.Email,
                            Nhomky_id = data3.Nhomky_id,
                            Trangthai=data3.Trangthai
                        };
                        FluxDB.Data3.Add(data);
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
        public HttpResponseMessage Update(Data3 data3)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data3.SingleOrDefault(p => p.Usernhomky_id == data3.Usernhomky_id);
                    data.UserID = data3.UserID;
                    data.Manhanvien = data3.Manhanvien;
                    data.Tennhomky = data3.Tennhomky;
                    data.Nhomky_id = data3.Nhomky_id;
                    data.Username = data3.Username;
                    data.Email = data3.Email;
                    data.Thutu = data3.Thutu;
                    data.Trangthai = data3.Trangthai;
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
                    var data = FluxDB.Data3.SingleOrDefault(p => p.Usernhomky_id == id);
                    FluxDB.Data3.Remove(data);
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
