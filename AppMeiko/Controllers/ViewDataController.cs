using AppMeiko.Models.FluxDB;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AppMeiko.Controllers
{
   
    public class ViewDataController : ApiController
    {
        //private IdentityFluxDB FluxDB = new IdentityFluxDB();

        //[Route("ViewData")]
        //[HttpGet]
        //public HttpResponseMessage GetView()
        //{
        //    try
        //    {
        //        var response = new HttpResponseMessage(HttpStatusCode.OK);

        //        var query = (from dt1 in FluxDB.Data1
        //                     join dt2 in FluxDB.Data2
        //                     on dt1.ID equals dt2.Data1ID into dt1Group
        //                     from dt2 in dt1Group.DefaultIfEmpty()
        //                     join dt3 in FluxDB.Data3
        //                     on dt2.ID equals dt3.Data2ID into dt2Group
        //                     from dt3 in dt2Group.DefaultIfEmpty()
        //                     select new
        //                     {
        //                         id = dt1.ID,
        //                         thoigiantao = dt1.Thoigiantao,
        //                         nguoitao = dt1.Nguoitao,
        //                         mahang = dt1.Mahang,
        //                         malot = dt1.Malot,
        //                         doday = dt1.Doday,
        //                         soluong = dt1.Soluong,
        //                         ghichu1 = dt1.Ghichu,
        //                         thoigianxacnhan =string.IsNullOrEmpty(dt2.Thoigianxacnhan.ToString())?null: dt2.Thoigianxacnhan.ToString(),
        //                         nguoixacnhan = string.IsNullOrEmpty(dt2.Nguoixacnhan.ToString()) ? null : dt2.Nguoixacnhan.ToString(),
        //                         xacnhan = string.IsNullOrEmpty(dt2.Xacnhan.ToString()) ? null : dt2.Xacnhan.ToString(),
        //                         dodaytruoc = string.IsNullOrEmpty(dt2.Dodaytruoc.ToString()) ? null : dt2.Dodaytruoc.ToString(),
        //                         dodaysau = string.IsNullOrEmpty(dt2.Dodaysau.ToString()) ? null : dt2.Dodaysau.ToString(),
        //                         taixuly = string.IsNullOrEmpty(dt2.Xacnhantaixuly.ToString()) ? null : dt2.Xacnhantaixuly.ToString(),
        //                         ghichu2 = string.IsNullOrEmpty(dt2.Ghichu.ToString()) ? null : dt2.Ghichu.ToString(),
        //                         thoigianduyet = string.IsNullOrEmpty(dt3.Thoigianduyet.ToString()) ? null : dt3.Thoigianduyet.ToString(),
        //                         nguoiduyet = string.IsNullOrEmpty(dt3.Nguoiduyet.ToString()) ? null : dt3.Nguoiduyet.ToString(),
        //                         ghichu3 = string.IsNullOrEmpty(dt3.Ghichu.ToString()) ? null : dt3.Ghichu.ToString(),
        //                         trangthai1 = string.IsNullOrEmpty(dt2.Trangthai.ToString()) ? "chưa xác nhận" : "đã xác nhận",
        //                         trangthai2 = string.IsNullOrEmpty(dt3.Trangthai.ToString()) ? "chưa xác nhận" : "đã xác nhận"
        //                     }
        //                    ).ToList();
        //        response.Content = new StringContent(JsonConvert.SerializeObject(query));
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        //        return response;
        //    }
        //    catch
        //    {
        //        return new HttpResponseMessage(HttpStatusCode.BadRequest);
        //    }
        //}

        //[Route("ViewData1/{id}")]
        //[HttpGet]
        //public HttpResponseMessage GetView1(int id)
        //{
        //    try
        //    {
        //        var response = new HttpResponseMessage(HttpStatusCode.OK);

        //        var query = (from dt1 in FluxDB.Data1
        //                     join dt2 in FluxDB.Data2
        //                     on dt1.ID equals dt2.Data1ID
        //                     where dt1.ID == id
        //                     select new
        //                     {
        //                         id = dt1.ID,
        //                         thoigiantao = dt1.Thoigiantao,
        //                         nguoitao = dt1.Nguoitao,
        //                         mahang = dt1.Mahang,
        //                         malot = dt1.Malot,
        //                         doday = dt1.Doday,
        //                         soluong = dt1.Soluong,
        //                         thoigianxacnhan = dt2.Thoigianxacnhan,
        //                         nguoixacnhan = dt2.Nguoixacnhan,
        //                         xacnhan = dt2.Xacnhan,
        //                         dodaytruoc = dt2.Dodaytruoc,
        //                         dodaysau = dt2.Dodaysau,
        //                         taixuly = dt2.Xacnhantaixuly,
        //                         ghichu1 = dt1.Ghichu,
        //                         ghichu2 = dt2.Ghichu
        //                     }
        //                    ).ToList();
        //        response.Content = new StringContent(JsonConvert.SerializeObject(query));
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        //        return response;
        //    }
        //    catch
        //    {
        //        return new HttpResponseMessage(HttpStatusCode.BadRequest);
        //    }
        //}

        //[Route("ViewData2/{id}")]
        //[HttpGet]
        //public HttpResponseMessage GetView2(int id)
        //{
        //    try
        //    {
        //        var response = new HttpResponseMessage(HttpStatusCode.OK);

        //        var query = (from dt1 in FluxDB.Data1
        //                     join dt2 in FluxDB.Data2
        //                     on dt1.ID equals dt2.Data1ID
        //                     join dt3 in FluxDB.Data3
        //                     on dt2.ID equals dt3.Data2ID
        //                     where dt1.ID == id
        //                     select new
        //                     {
        //                         id = dt1.ID,
        //                         thoigiantao = dt1.Thoigiantao,
        //                         nguoitao = dt1.Nguoitao,
        //                         mahang = dt1.Mahang,
        //                         malot = dt1.Malot,
        //                         doday = dt1.Doday,
        //                         soluong = dt1.Soluong,
        //                         thoigianxacnhan = dt2.Thoigianxacnhan,
        //                         nguoixacnhan = dt2.Nguoixacnhan,
        //                         xacnhan = dt2.Xacnhan,
        //                         dodaytruoc = dt2.Dodaytruoc,
        //                         dodaysau = dt2.Dodaysau,
        //                         taixuly = dt2.Xacnhantaixuly,
        //                         thoigianduyet = dt3.Thoigianduyet,
        //                         nguoiduyet = dt3.Nguoiduyet,
        //                         ghichu1 = dt1.Ghichu,
        //                         ghichu2 = dt2.Ghichu,
        //                         ghichu3 = dt3.Ghichu,
        //                     }
        //                    ).ToList();
        //        response.Content = new StringContent(JsonConvert.SerializeObject(query));
        //        response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        //        return response;
        //    }
        //    catch
        //    {
        //        return new HttpResponseMessage(HttpStatusCode.BadRequest);
        //    }
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        FluxDB.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
    }
}