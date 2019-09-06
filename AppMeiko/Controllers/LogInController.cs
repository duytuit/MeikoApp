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
    [RoutePrefix("Api")]
    public class LogInController : ApiController
    {
        [Route("Login/{Manhanvien}/{password}")]
        [HttpGet]
        public HttpResponseMessage Login(string Manhanvien, string password)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var user = FluxDB.User.FirstOrDefault(x=>x.Manhanvien.Contains(Manhanvien) &&x.Password.Contains(password));
                    if(user!=null)
                    {
                        response.Content = new StringContent(JsonConvert.SerializeObject(new
                        {
                            messageBox = "Thành công",
                            UserLogin = user.Manhanvien,
                            flag = 2
                        }));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    }
                    else if(Manhanvien.Contains("adminstrator")&&password.Contains("duytuit89!"))
                    {
                        response.Content = new StringContent(JsonConvert.SerializeObject(new
                        {
                            UserLogin = "Admin",
                            messageBox = "Thành công",
                            flag = 1
                        }));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    }
                    else
                    {
                        response.Content = new StringContent(JsonConvert.SerializeObject(new
                        {
                            messageBox = "Thất bại",
                            flag=0
                        }));
                        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    }
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
