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
    [RoutePrefix("Api/Menu")]
    public class MenuController : ApiController
    {
       
        [Route("GetMenu")]
        [HttpGet]
        public HttpResponseMessage GetMenu()
        {
            try
            {
               
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = FluxDB.Data8.ToList();
                    List<menu> menuTree = GetMenuTree(query, null);
                    response.Content = new StringContent(JsonConvert.SerializeObject(menuTree));
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
        public HttpResponseMessage Create(Data8 data8)
        {
            try
            {
               
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                        var data = new Data8()
                        {
                            Menuid=data8.Menuid,
                            Danhmucid = data8.Danhmucid,
                            Idcha = data8.Idcha,
                            Tenmenu = data8.Tenmenu,
                            Duongdan = data8.Duongdan,
                            Macode = data8.Macode,
                            Icon = data8.Icon,
                            Thutu= data8.Thutu,
                            Tinhtrang= data8.Tinhtrang,
                            Capdo=data8.Capdo
                        };
                    FluxDB.Data8.Add(data);
                    List<Data2> nhomky = FluxDB.Data2.ToList();
                    foreach (Data2 dt in nhomky) 
                        {
                        var dataQuyen = new Data6()
                        {
                            Menuid = data8.Menuid,
                            Nhomky_id = dt.Nhomky_id,
                            quyenXem = false,
                            quyenThem = false,
                            quyenCapNhap = false,
                            quyenXoa = false
                        };
                        FluxDB.Data6.Add(dataQuyen);
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
        public HttpResponseMessage Update(Data8 data8)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data8.SingleOrDefault(p => p.Menuid == data8.Menuid);
                    data.Danhmucid = data8.Danhmucid;
                    data.Idcha = data8.Idcha;
                    data.Tenmenu = data8.Tenmenu;
                    data.Duongdan = data8.Duongdan;
                    data.Macode = data8.Macode;
                    data.Icon = data8.Icon;
                    data.Thutu = data8.Thutu;
                    data.Tinhtrang = data8.Tinhtrang;
                    data.Capdo = data8.Capdo;
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
        public HttpResponseMessage Delete(string id)
        {
            try
            {
                using (var FluxDB = new IdentityFluxDB())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var data = FluxDB.Data8.SingleOrDefault(p => p.Menuid == id);
                    if (data != null)
                    {
                        var menuC1 = FluxDB.Data8.Where(x => x.Idcha == data.Menuid).ToList();
                        if (menuC1.Count > 0)
                        {
                            foreach (var item in menuC1)
                            {
                                var menuC1_IDC1 = item.Menuid;
                                var menuC2 = FluxDB.Data8.Where(a => a.Idcha == menuC1_IDC1).ToList();
                                if (menuC2.Count > 0)
                                {
                                    FluxDB.Data8.RemoveRange(menuC2);
                                }
                            }
                            FluxDB.Data8.RemoveRange(menuC1);
                        }
                    }
                    FluxDB.Data8.Remove(data);
                    FluxDB.SaveChanges();
                    return response;
                }
               
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
         
        }
        [Route("GetMenuTest")]
        [HttpGet]
        public HttpResponseMessage GetMenuTest()
        {
            try
            {

                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    //List<Data8> dt8 = new List<Data8>()
                    //{
                    //    new Data8() { Menuid="DM09",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha=null,Tenmenu="System Admin1",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=1,Tinhtrang=true},
                    //     new Data8() { Menuid="DM00",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha=null,Tenmenu="System Admin2",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=2,Tinhtrang=true},
                    //      new Data8() { Menuid="DM01",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM09",Tenmenu="System Admin3",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=3,Tinhtrang=true},
                    //       new Data8() { Menuid="DM02",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM00",Tenmenu="System Admin4",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=4,Tinhtrang=true},
                    //        new Data8() { Menuid="DM03",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM01",Tenmenu="System Admin5",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=5,Tinhtrang=true},
                    //         new Data8() { Menuid="DM04",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM02",Tenmenu="System Admin6",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=6,Tinhtrang=true},
                    //          new Data8() { Menuid="DM05",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM03",Tenmenu="System Admin7",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=7,Tinhtrang=true},
                    //           new Data8() { Menuid="DM06",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM04",Tenmenu="System Admin8",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=8,Tinhtrang=true},
                    //            new Data8() { Menuid="DM07",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM05",Tenmenu="System Admin9",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=9,Tinhtrang=true},
                    //             new Data8() { Menuid="DM08",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM06",Tenmenu="System Admin10",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=10,Tinhtrang=true},
                    //              new Data8() { Menuid="DM13",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM05",Tenmenu="System Admin11",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=11,Tinhtrang=true},
                    //             new Data8() { Menuid="DM10",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM06",Tenmenu="System Admin12",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=12,Tinhtrang=true},
                    //              new Data8() { Menuid="DM11",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM05",Tenmenu="System Admin14",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=13,Tinhtrang=true},
                    //             new Data8() { Menuid="DM12",Danhmucid=Guid.Parse("dacf60f2-37b3-e911-b125-b06ebfbb6771"),Idcha="DM06",Tenmenu="System Admin15",Duongdan="#",Macode="SDM",Capdo=1,Icon="http://192.84.100.207/AdminAPI/Portals/images/Users/systemadmin.png",Thutu=14,Tinhtrang=true},
                    //};
                   // List<menu> menuTree = GetMenuTree(dt8, null);
                  //  response.Content = new StringContent(JsonConvert.SerializeObject(menuTree));
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return response;

            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
        private List<menu> GetMenuTree(List<Data8> list, string parentID)
        {
            return list.Where(x => x.Idcha==parentID).Select(x => new menu()
            {
                Menuid=x.Menuid,
                Danhmucid=x.Danhmucid,
                Idcha=x.Idcha,
                Tenmenu=x.Tenmenu,
                Duongdan=x.Duongdan,
                Macode=x.Macode,
                Capdo=x.Capdo,
                Icon=x.Icon,
                Thutu=x.Thutu,
                Tinhtrang=x.Tinhtrang,
                ListMenu=GetMenuTree(list,x.Menuid)
            }).ToList();
        }
        private class menu
        {
            public string Menuid { get; set; }
            
            public Guid Danhmucid { get; set; }

            public string Idcha { get; set; }

            public string Tenmenu { get; set; }

            public string Duongdan { get; set; }

            public string Macode { get; set; }

            public int Capdo { get; set; }

            public string Icon { get; set; }

            public int Thutu { get; set; }

            public bool Tinhtrang { get; set; }

            public List<menu> ListMenu { get; set; }
        }
    }
}
