using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("AppUser")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid UserID { get; set; }
        [Required]
        [MaxLength(15)]
        public string Manhanvien { get; set; }
        [Required]
        [MaxLength(256)]
        public string Hovaten { get; set; }
        public string Email { get; set; }
        public string Sodienthoai { get; set; }
        public string Username { get; set; }
        [Required]
        [MaxLength(256)]
        public string Password { get; set; }
        public string Anhdaidien { get; set; }
        public string Diachi { get; set; }
        [Required]
        public string Ngaysinh { get; set; }
        public bool Tinhtrang { get; set; }
        public string CMTND { get; set; }
        [Required]
        public string Ngayvao { get; set; }
        public string Ngaycapnhap { get; set; }
        public int Kieuuser { get; set; }
        public int Capbac { get; set; }
        public string Chucvu { get; set; }
        public virtual ICollection<Data3> Data3 { get; set; }
    }
}