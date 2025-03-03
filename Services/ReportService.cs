using System;
using System.Collections.Generic;
using System.Linq;
using CafeManagementSystem.Data;
using CafeManagementSystem.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CafeManagementSystem.Services
{
    public class ReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Returns a full daily sales report grouped by category.
        public List<DailySalesReportDto> GetDailySalesReport(DateTime date)
        {
            var ordersForDay = _context.Orders
                .Where(o => o.OrderDate.Date == date.Date && o.IsPaid)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(m => m.Category);

            var orderItems = ordersForDay.SelectMany(o => o.OrderItems);

            var report = orderItems
                .GroupBy(oi => oi.MenuItem.Category.Name)
                .Select(categoryGroup => new DailySalesReportDto
                {
                    Category = categoryGroup.Key,
                    Items = categoryGroup
                        .GroupBy(oi => oi.MenuItem.Name)
                        .Select(itemGroup => new ItemSalesDto
                        {
                            ItemName = itemGroup.Key,
                            QuantitySold = itemGroup.Sum(oi => oi.Quantity),
                            TotalRevenue = itemGroup.Sum(oi => oi.Quantity * oi.Price)
                        }).ToList(),
                    TotalCategoryRevenue = categoryGroup.Sum(oi => oi.Quantity * oi.Price)
                })
                .ToList();

            return report;
        }

        // Returns a daily report for a specific category.
        public DailySalesReportDto GetCategorySalesReport(DateTime date, string categoryName)
        {
            var ordersForDay = _context.Orders
                .Where(o => o.OrderDate.Date == date.Date && o.IsPaid)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(m => m.Category);

            var orderItems = ordersForDay.SelectMany(o => o.OrderItems)
                .AsEnumerable() // Switch to client-side evaluation
                .Where(oi => oi.MenuItem.Category.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase));

            if (!orderItems.Any())
                return null;

            var report = new DailySalesReportDto
            {
                Category = categoryName,
                Items = orderItems
                    .GroupBy(oi => oi.MenuItem.Name)
                    .Select(itemGroup => new ItemSalesDto
                    {
                        ItemName = itemGroup.Key,
                        QuantitySold = itemGroup.Sum(oi => oi.Quantity),
                        TotalRevenue = itemGroup.Sum(oi => oi.Quantity * oi.Price)
                    }).ToList(),
                TotalCategoryRevenue = orderItems.Sum(oi => oi.Quantity * oi.Price)
            };

            return report;
        }

        // Returns the sales details for a specific item within a category.
        public ItemSalesDto GetItemSalesReport(DateTime date, string categoryName, string itemName)
        {
            var ordersForDay = _context.Orders
                .Where(o => o.OrderDate.Date == date.Date && o.IsPaid)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.MenuItem)
                        .ThenInclude(m => m.Category);

            var orderItems = ordersForDay.SelectMany(o => o.OrderItems)
                .AsEnumerable() // Switch to client-side evaluation
                .Where(oi => oi.MenuItem.Category.Name.Equals(categoryName, StringComparison.OrdinalIgnoreCase)
                    && oi.MenuItem.Name.Equals(itemName, StringComparison.OrdinalIgnoreCase));

            if (!orderItems.Any())
                return null;

            var result = new ItemSalesDto
            {
                ItemName = itemName,
                QuantitySold = orderItems.Sum(oi => oi.Quantity),
                TotalRevenue = orderItems.Sum(oi => oi.Quantity * oi.Price)
            };

            return result;
        }
    }
}
