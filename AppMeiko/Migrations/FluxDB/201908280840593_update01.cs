namespace AppMeiko.Migrations.FluxDB
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update01 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Flux",
                c => new
                    {
                        Flux_id = c.Guid(nullable: false, identity: true),
                        Thoigiantao = c.String(maxLength: 256),
                        Ngay = c.DateTime(nullable: false),
                        Thoigianhoanthanh = c.String(),
                        Mahang = c.String(nullable: false, maxLength: 256),
                        Malot = c.String(nullable: false, maxLength: 256),
                        Doday = c.String(nullable: false, maxLength: 256),
                        Soluong = c.Int(nullable: false),
                        Dodaytruoc = c.String(maxLength: 50),
                        Dodaysau = c.String(maxLength: 50),
                        Xacnhanql = c.String(maxLength: 256),
                        Xacnhanpq = c.String(maxLength: 256),
                        Ghichu = c.String(),
                        Trangthai = c.Int(nullable: false),
                        Thutu = c.Int(nullable: false, identity: true),
                        Groupid = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Flux_id)
                .ForeignKey("dbo.GroupFlux", t => t.Groupid, cascadeDelete: true)
                .Index(t => t.Groupid);
            
            CreateTable(
                "dbo.GroupFlux",
                c => new
                    {
                        Groupid = c.String(nullable: false, maxLength: 128),
                        Namegroup = c.String(maxLength: 100),
                        Thutu = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Groupid);
            
            CreateTable(
                "dbo.QuyTrinh",
                c => new
                    {
                        Quytrinh_id = c.Guid(nullable: false, identity: true),
                        User_id = c.String(),
                        Groupid = c.String(nullable: false, maxLength: 128),
                        Nhomky_id = c.Guid(nullable: false),
                        Ngayky = c.String(),
                        Ngaytao = c.DateTime(nullable: false),
                        Ghichu = c.String(),
                        Daky = c.Boolean(nullable: false),
                        Thutu = c.Int(nullable: false, identity: true),
                        Kieunhom = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Quytrinh_id)
                .ForeignKey("dbo.NhomKy", t => t.Nhomky_id, cascadeDelete: true)
                .ForeignKey("dbo.GroupFlux", t => t.Groupid, cascadeDelete: true)
                .Index(t => t.Groupid)
                .Index(t => t.Nhomky_id);
            
            CreateTable(
                "dbo.NhomKy",
                c => new
                    {
                        Nhomky_id = c.Guid(nullable: false),
                        Tennhom = c.String(nullable: false, maxLength: 256),
                        Kieunhom = c.Int(nullable: false),
                        Trangthai = c.Boolean(nullable: false),
                        Thutu = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Nhomky_id);
            
            CreateTable(
                "dbo.UserNhomKy",
                c => new
                    {
                        Usernhomky_id = c.Guid(nullable: false, identity: true),
                        UserID = c.Guid(nullable: false),
                        Manhanvien = c.String(nullable: false, maxLength: 15),
                        Username = c.String(),
                        Tennhomky = c.String(),
                        Email = c.String(),
                        Nhomky_id = c.Guid(nullable: false),
                        Thutu = c.Int(nullable: false, identity: true),
                        Trangthai = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Usernhomky_id)
                .ForeignKey("dbo.NhomKy", t => t.Nhomky_id, cascadeDelete: true)
                .ForeignKey("dbo.AppUser", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID)
                .Index(t => t.Nhomky_id);
            
            CreateTable(
                "dbo.AppUser",
                c => new
                    {
                        UserID = c.Guid(nullable: false, identity: true),
                        Manhanvien = c.String(nullable: false, maxLength: 15),
                        Hovaten = c.String(nullable: false, maxLength: 256),
                        Email = c.String(),
                        Sodienthoai = c.String(),
                        Username = c.String(),
                        Password = c.String(nullable: false, maxLength: 256),
                        Anhdaidien = c.String(),
                        Diachi = c.String(),
                        Ngaysinh = c.String(nullable: false),
                        Tinhtrang = c.Boolean(nullable: false),
                        CMTND = c.String(),
                        Ngayvao = c.String(nullable: false),
                        Ngaycapnhap = c.String(),
                        Kieuuser = c.Int(nullable: false),
                        Capbac = c.Int(nullable: false),
                        Chucvu = c.String(),
                    })
                .PrimaryKey(t => t.UserID);
            
            CreateTable(
                "dbo.PhanQuyen",
                c => new
                    {
                        Quyenid = c.Guid(nullable: false, identity: true),
                        Menuid = c.String(nullable: false, maxLength: 128),
                        Nhomky_id = c.Guid(nullable: false),
                        quyenXem = c.Boolean(nullable: false),
                        quyenThem = c.Boolean(nullable: false),
                        quyenCapNhap = c.Boolean(nullable: false),
                        quyenXoa = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Quyenid)
                .ForeignKey("dbo.NhomKy", t => t.Nhomky_id, cascadeDelete: true)
                .ForeignKey("dbo.Menu", t => t.Menuid, cascadeDelete: true)
                .Index(t => t.Menuid)
                .Index(t => t.Nhomky_id);
            
            CreateTable(
                "dbo.Menu",
                c => new
                    {
                        Menuid = c.String(nullable: false, maxLength: 128),
                        Danhmucid = c.Guid(nullable: false),
                        Idcha = c.String(),
                        Tenmenu = c.String(),
                        Duongdan = c.String(),
                        Macode = c.String(),
                        Capdo = c.Int(nullable: false),
                        Icon = c.String(),
                        Thutu = c.Int(nullable: false),
                        Tinhtrang = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Menuid)
                .ForeignKey("dbo.DanhMuc", t => t.Danhmucid, cascadeDelete: true)
                .Index(t => t.Danhmucid);
            
            CreateTable(
                "dbo.DanhMuc",
                c => new
                    {
                        Danhmucid = c.Guid(nullable: false, identity: true),
                        Madanhmuc = c.String(),
                        Tendanhmuc = c.String(),
                        Thutu = c.Int(nullable: false),
                        Tinhtrang = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Danhmucid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.QuyTrinh", "Groupid", "dbo.GroupFlux");
            DropForeignKey("dbo.Menu", "Danhmucid", "dbo.DanhMuc");
            DropForeignKey("dbo.PhanQuyen", "Menuid", "dbo.Menu");
            DropForeignKey("dbo.PhanQuyen", "Nhomky_id", "dbo.NhomKy");
            DropForeignKey("dbo.QuyTrinh", "Nhomky_id", "dbo.NhomKy");
            DropForeignKey("dbo.UserNhomKy", "UserID", "dbo.AppUser");
            DropForeignKey("dbo.UserNhomKy", "Nhomky_id", "dbo.NhomKy");
            DropForeignKey("dbo.Flux", "Groupid", "dbo.GroupFlux");
            DropIndex("dbo.Menu", new[] { "Danhmucid" });
            DropIndex("dbo.PhanQuyen", new[] { "Nhomky_id" });
            DropIndex("dbo.PhanQuyen", new[] { "Menuid" });
            DropIndex("dbo.UserNhomKy", new[] { "Nhomky_id" });
            DropIndex("dbo.UserNhomKy", new[] { "UserID" });
            DropIndex("dbo.QuyTrinh", new[] { "Nhomky_id" });
            DropIndex("dbo.QuyTrinh", new[] { "Groupid" });
            DropIndex("dbo.Flux", new[] { "Groupid" });
            DropTable("dbo.DanhMuc");
            DropTable("dbo.Menu");
            DropTable("dbo.PhanQuyen");
            DropTable("dbo.AppUser");
            DropTable("dbo.UserNhomKy");
            DropTable("dbo.NhomKy");
            DropTable("dbo.QuyTrinh");
            DropTable("dbo.GroupFlux");
            DropTable("dbo.Flux");
        }
    }
}
