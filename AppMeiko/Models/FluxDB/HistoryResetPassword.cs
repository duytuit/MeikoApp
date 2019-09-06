using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    public class HistoryResetPassword
    {
        public string HistoryResetID { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string IPtruycap { get; set; }
        public string Thietbitruycap { get; set; }
        public bool tinhTrang { get; set; }
        public string Ngayreset { get; set; }
    }
}