using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    public class UserNhom
    {
        public Guid UserID { get; set; }
        public string Manhanvien { get; set; }
        public string Hovaten { get; set; }
        public string Email { get; set; }
        public string Sodienthoai { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Anhdaidien { get; set; }
        public string Diachi { get; set; }
        public string Ngaysinh { get; set; }
        public int Tinhtrang { get; set; }
        public string CMTND { get; set; }
        public string Ngayvao { get; set; }
        public string Ngaycapnhap { get; set; }
        public int Kieuuser { get; set; }
        public int Chucvu { get; set; }
        public Guid Usernhomky_id { get; set; }
        public string Tennhomky { get; set; }
        public Guid Nhomky_id { get; set; }
        public int Thutu { get; set; }
        public bool Trangthai { get; set; }
    }
}