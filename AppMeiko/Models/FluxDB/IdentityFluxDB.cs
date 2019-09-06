using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AppMeiko.Models.FluxDB
{
    public class IdentityFluxDB:DbContext
    {
        public IdentityFluxDB():base("name=DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        public DbSet<Data1> Data1 { get; set; }
        public DbSet<Data2> Data2 { get; set; }
        public DbSet<Data3> Data3 { get; set; }
        public DbSet<Data4> Data4 { get; set; }
        public DbSet<Data5> Data5 { get; set; }
        public DbSet<Data6> Data6 { get; set; }
        public DbSet<Data7> Data7 { get; set; }
        public DbSet<Data8> Data8 { get; set; }
        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
  
}