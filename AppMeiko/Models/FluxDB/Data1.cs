using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("Flux")]
    public class Data1
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Flux_id { get; set; }
        [MaxLength(256)]
        public string Thoigiantao { get; set; }
        public DateTime Ngay { get; set; }
        public string Thoigianhoanthanh { get; set; }
        [Required]
        [MaxLength(256)]
        public string Mahang { get; set; }
        [Required]
        [MaxLength(256)]
        public string Malot { get; set; }
        [Required]
        [MaxLength(256)]
        public string Doday { get; set; }
        [Required]
        public int Soluong { get; set; }
        [MaxLength(50)]
        public string Dodaytruoc { get; set; }
        [MaxLength(50)]
        public string Dodaysau { get; set; }
        [MaxLength(256)]
        public string Xacnhanql { get; set; }
        [MaxLength(256)]
        public string Xacnhanpq { get; set; }
        public string Ghichu { get; set; }
        public int Trangthai { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Thutu { get; set; }
        [Required]
        public string Groupid { get; set; }
        [ForeignKey("Groupid")]
        public virtual Data5 Data5 { get; set; }

    }
}