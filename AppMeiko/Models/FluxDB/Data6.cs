using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppMeiko.Models.FluxDB
{
    [Table("PhanQuyen")]
    public class Data6
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Quyenid { get; set; }

        [Required]
        public string Menuid { get; set; }

        [ForeignKey("Menuid")]
        public virtual Data8 Data8 { get; set; }

        [Required]
        public Guid Nhomky_id { get; set; }

        [ForeignKey("Nhomky_id")]
        public virtual Data2 Data2 { get; set; }

        public bool quyenXem { get; set; }

        public bool quyenThem { get; set; }

        public bool quyenCapNhap { get; set; }

        public bool quyenXoa { get; set; }
    }
}