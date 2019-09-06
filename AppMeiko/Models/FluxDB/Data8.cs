using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppMeiko.Models.FluxDB
{
    [Table("Menu")]
    public class Data8
    {
        [Key]
        public string Menuid { get; set; }

        [Required]
        public Guid Danhmucid { get; set; }
        [ForeignKey("Danhmucid")]
        public virtual Data7 Data7 { get; set; }

        public string Idcha { get; set; }

        public string Tenmenu { get; set; }

        public string Duongdan { get; set; }

        public string Macode { get; set; }

        public int Capdo { get; set; }

        public string Icon { get; set; }

        public int Thutu { get; set; }

        public bool Tinhtrang { get; set; }

        public virtual ICollection<Data6> Data6 { get; set; }
    }
}