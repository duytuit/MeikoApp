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
    [RoutePrefix("Api/AppUser")]
    public class AppUserController : ApiController
    {
        [Route("GetAppUser")]
        [HttpGet]
        public HttpResponseMessage GetAppUser()
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.User.ToList();
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
        public HttpResponseMessage Create(User user)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = new User()
                    {
                        Manhanvien = user.Manhanvien,
                        Hovaten  = user.Hovaten,
                        Email = user.Email,
                        Sodienthoai = user.Sodienthoai,
                        Username = user.Username,
                        Password = user.Password,
                        Anhdaidien = user.Anhdaidien,
                        Diachi = user.Diachi,
                        Ngaysinh = user.Ngaysinh,
                        Tinhtrang = user.Tinhtrang,
                        CMTND = user.CMTND,
                        Ngayvao = DateTime.Now.ToString("yyyy-MM-dd HH:mm"),
                        Kieuuser = user.Kieuuser,
                        Chucvu = user.Chucvu,
                        Capbac=user.Capbac
                    };
                    FluxDB.User.Add(data);
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
        public HttpResponseMessage Update(User user)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.User.SingleOrDefault(p => p.UserID == user.UserID);
                    data.Manhanvien = user.Manhanvien;
                    data.Hovaten = user.Hovaten;
                    data.Email = user.Email;
                    data.Sodienthoai = user.Sodienthoai;
                    data.Username = user.Username;
                    data.Password = user.Password;
                    data.Anhdaidien = user.Anhdaidien;
                    data.Diachi = user.Diachi;
                    data.Ngaysinh = user.Ngaysinh;
                    data.Tinhtrang = user.Tinhtrang;
                    data.CMTND = user.CMTND;
                    data.Ngayvao = user.Ngayvao;
                    data.Ngaycapnhap = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                    data.Kieuuser = user.Kieuuser;
                    data.Chucvu = user.Chucvu;
                    data.Capbac = user.Capbac;
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
                    var data = FluxDB.User.SingleOrDefault(p => p.UserID == id);
                    FluxDB.User.Remove(data);
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
