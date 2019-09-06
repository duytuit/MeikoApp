using AppMeiko.Models;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AppMeiko.Controllers
{
    [RoutePrefix("AppMeiko/Api")]
    public class ParadigmController : ApiController
    {
        //private Entities Paradigm = new Entities();

        [Route("GetAllPartNo")]
        [HttpGet]
        public HttpResponseMessage GetPartNo()
        {
            try
            {
                using ( var Paradigm = new Entities())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var propducts = Paradigm.DATA0050.Select(p =>p.CUSTOMER_PART_NUMBER.Trim()).ToList();
                    response.Content = new StringContent(JsonConvert.SerializeObject(propducts));
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    return response;
                }
                  
            }
            catch
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [Route("GetLotNoByPart/{partno}")]
        [HttpGet]
        public HttpResponseMessage GetLotNoByPart(string partno)
        {
            try
            {
                using (var Paradigm = new Entities())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);
                    var query = (from part in Paradigm.DATA0050
                                 join
                                 lot in Paradigm.DATA0006 on part.RKEY equals lot.CUST_PART_PTR
                                 where part.CUSTOMER_PART_NUMBER.Contains(partno)
                                 select lot.WORK_ORDER_NUMBER.Trim()
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

        [Route("GetThicknessByPart/{partno}")]
        [HttpGet]
        public HttpResponseMessage GetThicknessByPart(string partno)
        {
            try
            {
                using (var Paradigm = new Entities())
                {
                    var response = new HttpResponseMessage(HttpStatusCode.OK);

                    var query = from dt50 in Paradigm.DATA0050
                                join dt38 in Paradigm.DATA0038
                                on dt50.RKEY equals dt38.SOURCE_PTR
                                join dt34 in Paradigm.DATA0034
                                on dt38.DEPT_PTR equals dt34.RKEY
                                join dt35 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_1_PTR equals dt35.RKEY into dt38Group
                                from dt35 in dt38Group.DefaultIfEmpty()
                                join dt351 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_2_PTR equals dt351.RKEY into dt381Group
                                from dt351 in dt381Group.DefaultIfEmpty()
                                join dt352 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_3_PTR equals dt352.RKEY into dt382Group
                                from dt352 in dt381Group.DefaultIfEmpty()
                                join dt353 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_4_PTR equals dt353.RKEY into dt383Group
                                from dt353 in dt381Group.DefaultIfEmpty()
                                join dt354 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_5_PTR equals dt354.RKEY into dt384Group
                                from dt354 in dt381Group.DefaultIfEmpty()
                                join dt355 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_6_PTR equals dt355.RKEY into dt385Group
                                from dt355 in dt381Group.DefaultIfEmpty()
                                join dt356 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_7_PTR equals dt356.RKEY into dt386Group
                                from dt356 in dt381Group.DefaultIfEmpty()
                                join dt357 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_8_PTR equals dt357.RKEY into dt387Group
                                from dt357 in dt381Group.DefaultIfEmpty()
                                join dt358 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_9_PTR equals dt358.RKEY into dt388Group
                                from dt358 in dt381Group.DefaultIfEmpty()
                                join dt359 in Paradigm.DATA0035
                                on dt38.DEF_ROUT_PARA_10_PTR equals dt359.RKEY into dt389Group
                                from dt359 in dt381Group.DefaultIfEmpty()
                                where dt38.SOURCE_PTR == dt50.RKEY && dt38.TTYPE == 4 && dt38.DEPT_PTR == dt34.RKEY && dt34.RKEY == 88 && dt50.CUSTOMER_PART_NUMBER.Contains(partno)
                                select dt38.PARAMETER_2.Trim();
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
    }
}