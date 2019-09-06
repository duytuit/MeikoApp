using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("NhomKy")]
    public class Data2
    {
        [Key]
        public Guid Nhomky_id { get; set; }
        [Required]
        [MaxLength(256)]
        public string Tennhom { get; set; }
        [Required]
        public int Kieunhom { get; set; }
        public bool Trangthai { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Thutu { get; set; }
        public virtual ICollection<Data3> Data3 { get; set; }
        public virtual ICollection<Data6> Data6 { get; set; }
        public virtual ICollection<Data4> Data4 { get; set; }
    }
}