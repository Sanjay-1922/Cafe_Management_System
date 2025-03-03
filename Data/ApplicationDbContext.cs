using Microsoft.EntityFrameworkCore;
using CafeManagementSystem.Models;
using Microsoft.Data.SqlClient;

namespace CafeManagementSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Core entities
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }

        // Product and category
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Category> Categories { get; set; }

        // Order and related entities
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Payment> Payments { get; set; }

        // Cart and its items
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // -------------------------
            // User Configuration
            // -------------------------
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // -------------------------
            // Category → MenuItem (One-to-Many)
            // -------------------------
            modelBuilder.Entity<MenuItem>()
                .HasOne(m => m.Category)
                .WithMany(c => c.MenuItems)
                .HasForeignKey(m => m.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // -------------------------
            // Customer → Orders (One-to-Many)
            // -------------------------
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // Order → OrderItems (One-to-Many)
            // -------------------------
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // MenuItem → OrderItems (One-to-Many)
            // -------------------------
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.MenuItem)
                .WithMany(m => m.OrderItems)
                .HasForeignKey(oi => oi.MenuItemId)
                .OnDelete(DeleteBehavior.Restrict);

            // -------------------------
            // Order → Token (One-to-One)
            // -------------------------
            modelBuilder.Entity<Token>()
                .HasOne(t => t.Order)
                .WithOne(o => o.Token)
                .HasForeignKey<Token>(t => t.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // Order → Payment (One-to-One)
            // -------------------------
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Order)
                .WithOne(o => o.Payment)
                .HasForeignKey<Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // Customer → Cart (One-to-One)
            // -------------------------
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Customer)
                .WithOne(cu => cu.Cart)
                .HasForeignKey<Cart>(c => c.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // Cart → CartItems (One-to-Many)
            // -------------------------
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            // -------------------------
            // MenuItem → CartItems (One-to-Many)
            // -------------------------
            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.MenuItem)
                .WithMany(m => m.CartItems)
                .HasForeignKey(ci => ci.MenuItemId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }


        //    public decimal GetTotalSalesForDate(DateTime date)
        //    {
        //        var dateParam = new SqlParameter("@Date", date);
        //        var result = this.Database.ExecuteSqlRaw("SELECT dbo.GetTotalSales(@Date)", dateParam);
        //        return Convert.ToDecimal(result);
        //    }

        //    // Method to call stored procedure
        //    public List<OrderReportDto> GetOrderReport(int orderId)
        //    {
        //        var orderIdParam = new SqlParameter("@OrderId", orderId);
        //        return this.OrderReports.FromSqlRaw("EXEC GetOrderReport @OrderId", orderIdParam).ToList();
        //    }

        //    // DbSet for OrderReportDto
        //    public DbSet<OrderReportDto> OrderReports { get; set; }
        //}

        //public class OrderReportDto
        //{
        //    public int OrderId { get; set; }
        //    public int CustomerId { get; set; }
        //    public DateTime OrderDate { get; set; }
        //    public decimal TotalAmount { get; set; }
        //    public bool IsPaid { get; set; }
        //    public string Status { get; set; }
        //    public int MenuItemId { get; set; }
        //    public int Quantity { get; set; }
        //    public decimal Price { get; set; }
    }


}

