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
    [RoutePrefix("Api/DanhMuc")]
    public class DanhMucController : ApiController
    {
        [Route("GetDanhMuc")]
        [HttpGet]
        public HttpResponseMessage GetDanhMuc()
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data7.ToList();
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
        public HttpResponseMessage Create(Data7 data7)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                   
                        var data = new Data7()
                        {
                            Madanhmuc = data7.Madanhmuc,
                            Tendanhmuc = data7.Tendanhmuc,
                            Thutu = data7.Thutu,
                            Tinhtrang = data7.Tinhtrang
                        };
                        FluxDB.Data7.Add(data);
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
        public HttpResponseMessage Update(Data7 data7)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data7.SingleOrDefault(p => p.Danhmucid == data7.Danhmucid);
                    data.Madanhmuc = data7.Madanhmuc;
                    data.Tendanhmuc = data7.Tendanhmuc;
                    data.Thutu = data7.Thutu;
                    data.Tinhtrang = data7.Tinhtrang;
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
                    var data = FluxDB.Data7.SingleOrDefault(p => p.Danhmucid == id);
                    FluxDB.Data7.Remove(data);
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
