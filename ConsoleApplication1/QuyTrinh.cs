//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ConsoleApplication1
{
    using System;
    using System.Collections.Generic;
    
    public partial class QuyTrinh
    {
        public System.Guid Quytrinh_id { get; set; }
        public string User_id { get; set; }
        public System.Guid Flux_id { get; set; }
        public System.Guid Nhomky_id { get; set; }
        public string Ngayky { get; set; }
        public string Ghichu { get; set; }
        public bool Daky { get; set; }
        public int Thutu { get; set; }
    
        public virtual Flux Flux { get; set; }
        public virtual NhomKy NhomKy { get; set; }
    }
}
