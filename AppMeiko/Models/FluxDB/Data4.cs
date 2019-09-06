using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("QuyTrinh")]
    public class Data4
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Quytrinh_id { get; set; }
        public string User_id { get; set; }
        [Required]
        public string Groupid { get; set; }
        [ForeignKey("Groupid")]
        public virtual Data5 Data5 { get; set; }
        [Required]
        public Guid Nhomky_id { get; set; }
        [ForeignKey("Nhomky_id")]
        public virtual Data2 Data2 { get; set; }
        public string Ngayky { get; set; }
        public DateTime Ngaytao { get; set; }
        public string Ghichu { get; set; }
        public bool Daky { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Thutu { get; set; }
        public int Kieunhom { get; set; }

    } 
}