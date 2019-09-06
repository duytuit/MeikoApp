using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    [Table("GroupFlux")]
    public class Data5
    {
        [Key]
        public string Groupid { get; set; }
        [MaxLength(100)]
        public string Namegroup { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Thutu { get; set; }
        public virtual ICollection<Data1> Data1 { get; set; }
        public virtual ICollection<Data4> Data4 { get; set; }
    }
}