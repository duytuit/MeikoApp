using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppMeiko.Models.FluxDB
{
    [Table("DanhMuc")]
    public class Data7
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Danhmucid { get; set; }

        public string Madanhmuc { get; set; }

        public string Tendanhmuc { get; set; }

        public int Thutu { get; set; }

        public bool Tinhtrang { get; set; }

        public virtual ICollection<Data8> Data8 { get; set; }
    }
}