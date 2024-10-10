using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Data.Entities;

public partial class NailShopDbContext : DbContext
{
    private readonly IConfiguration _configuration;
    public NailShopDbContext()
    {
    }

    public NailShopDbContext(DbContextOptions<NailShopDbContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CustomOption> CustomOptions { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductImage> ProductImages { get; set; }

    public virtual DbSet<RefundOrder> RefundOrders { get; set; }

    public virtual DbSet<UserVoucher> UserVouchers { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string connectionString = _configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__Accounts__349DA5863F8334A6");

            entity.HasIndex(e => e.Email, "UQ__Accounts__A9D10534E2457F7E").IsUnique();

            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.PasswordHash).HasMaxLength(256);
            entity.Property(e => e.Role).HasMaxLength(50);
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__Carts__51BCD7974E40FF27");

            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.SessionId)
                .HasMaxLength(100)
                .HasColumnName("SessionID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Active");

            entity.HasOne(d => d.Account).WithMany(p => p.Carts)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Carts__AccountID__4AB81AF0");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => e.CartItemId).HasName("PK__CartItem__488B0B2ABAE24581");

            entity.Property(e => e.CartItemId).HasColumnName("CartItemID");
            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Cart).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("FK__CartItems__CartI__4F7CD00D");

            entity.HasOne(d => d.Product).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__CartItems__Produ__5070F446");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A2B5A7995BB");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ParentCategoryId).HasColumnName("ParentCategoryID");

            entity.HasOne(d => d.ParentCategory).WithMany(p => p.InverseParentCategory)
                .HasForeignKey(d => d.ParentCategoryId)
                .HasConstraintName("FK__Categorie__Paren__3C69FB99");
        });

        modelBuilder.Entity<CustomOption>(entity =>
        {
            entity.HasKey(e => e.OptionId).HasName("PK__CustomOp__92C7A1DFF383CBC2");

            entity.Property(e => e.OptionId).HasColumnName("OptionID");
            entity.Property(e => e.AdditionalPrice)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OptionName).HasMaxLength(50);
            entity.Property(e => e.OptionValue).HasMaxLength(50);
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Product).WithMany(p => p.CustomOptions)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__CustomOpt__Produ__46E78A0C");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF2037D1E8");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.CartId).HasColumnName("CartID");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OrderStatus).HasMaxLength(50);
            entity.Property(e => e.PaymentMethod).HasMaxLength(100);
            entity.Property(e => e.PaymentStatus).HasMaxLength(50);
            entity.Property(e => e.ShippingAddress).HasMaxLength(255);
            entity.Property(e => e.ShippingFee)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ShippingMethod).HasMaxLength(100);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.VoucherId).HasColumnName("VoucherID");

            entity.HasOne(d => d.Account).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Orders__AccountI__5DCAEF64");

            entity.HasOne(d => d.Cart).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("FK__Orders__CartID__5CD6CB2B");

            entity.HasOne(d => d.Voucher).WithMany(p => p.Orders)
                .HasForeignKey(d => d.VoucherId)
                .HasConstraintName("FK__Orders__VoucherI__5EBF139D");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payments__9B556A585EEC4A22");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PaymentAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PaymentDate).HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.PaymentStatus).HasMaxLength(50);

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payments__OrderI__6383C8BA");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__B40CC6ED46E76BB2");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Products__Catego__3F466844");
        });

        modelBuilder.Entity<ProductImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__ProductI__7516F4EC8B385EEA");

            entity.Property(e => e.ImageId).HasColumnName("ImageID");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ImageUrl).HasColumnName("ImageURL");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductImages)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__ProductIm__Produ__4316F928");
        });

        modelBuilder.Entity<RefundOrder>(entity =>
        {
            entity.HasKey(e => e.RefundOrderId).HasName("PK__RefundOr__76E2C0E812015064");

            entity.ToTable("RefundOrder");

            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.RefundAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.RefundDate).HasColumnType("datetime");
            entity.Property(e => e.RefundReason).HasMaxLength(255);
            entity.Property(e => e.RefundStatus).HasMaxLength(50);

            entity.HasOne(d => d.Order).WithMany(p => p.RefundOrders)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__RefundOrd__Order__72C60C4A");
        });

        modelBuilder.Entity<UserVoucher>(entity =>
        {
            entity.HasKey(e => e.UserVoucherId).HasName("PK__UserVouc__8017D4B9E90D4BC3");

            entity.Property(e => e.UserVoucherId).HasColumnName("UserVoucherID");
            entity.Property(e => e.AccountId).HasColumnName("AccountID");
            entity.Property(e => e.AppliedDate).HasColumnType("datetime");
            entity.Property(e => e.IsUsed).HasDefaultValue(false);
            entity.Property(e => e.VoucherId).HasColumnName("VoucherID");

            entity.HasOne(d => d.Account).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__UserVouch__Accou__5812160E");

            entity.HasOne(d => d.Voucher).WithMany(p => p.UserVouchers)
                .HasForeignKey(d => d.VoucherId)
                .HasConstraintName("FK__UserVouch__Vouch__59063A47");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.HasKey(e => e.VoucherId).HasName("PK__Vouchers__3AEE79C126008C15");

            entity.HasIndex(e => e.Code, "UQ__Vouchers__A25C5AA742C26337").IsUnique();

            entity.Property(e => e.VoucherId).HasColumnName("VoucherID");
            entity.Property(e => e.Code).HasMaxLength(50);
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DiscountAmount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.MinimumSpend).HasColumnType("decimal(18, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
