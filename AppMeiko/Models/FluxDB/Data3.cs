using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("UserNhomKy")]
    public class Data3
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Usernhomky_id { get; set; }
        [Required]
        public Guid UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
        [Required]
        [MaxLength(15)]
        public string Manhanvien { get; set; }
        public string Username { get; set; }
        public string Tennhomky { get; set; }
        public string Email { get; set; }
        [Required]
        public Guid Nhomky_id { get; set; }
        [ForeignKey("Nhomky_id")]
        public virtual Data2 Data2 { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Thutu { get; set; }
        public bool Trangthai { get; set; }
    }
}