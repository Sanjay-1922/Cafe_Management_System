using System;

using System.Collections.Generic;

using System.Linq;

using CafeManagementSystem.Data;

using CafeManagementSystem.DTOs;

using Microsoft.EntityFrameworkCore;

namespace CafeManagementSystem.Services

{

    public class CustomerReportService

    {

        private readonly ApplicationDbContext _context;

        public CustomerReportService(ApplicationDbContext context)

        {

            _context = context;

        }

        // Returns a summary report for all customers for the given date.

        public List<DailyCustomerReportDto> GetDailyCustomerSummaryReport(DateTime date)

        {

            var ordersForDay = _context.Orders

                .Where(o => o.OrderDate.Date == date.Date && o.IsPaid)

                .Include(o => o.Customer)

                .ToList();

            var summaryReport = ordersForDay

                .GroupBy(o => new { o.Customer.CustomerId, o.Customer.Name })

                .Select(g => new DailyCustomerReportDto

                {

                    CustomerId = g.Key.CustomerId,

                    CustomerName = g.Key.Name,

                    OrderCount = g.Count(),

                    TotalSpent = g.Sum(o => o.TotalAmount)

                })

                .ToList();

            return summaryReport;

        }

        // Returns a detailed report for each customer, including order items.

        public List<CustomerOrderReportDto> GetCustomerOrderReport(DateTime date, string customerName = null)

        {

            var ordersForDay = _context.Orders

                .Where(o => o.OrderDate.Date == date.Date && o.IsPaid)

                .Include(o => o.Customer)

                .Include(o => o.OrderItems)

                    .ThenInclude(oi => oi.MenuItem)

                .ToList();

            if (!string.IsNullOrWhiteSpace(customerName))

            {

                ordersForDay = ordersForDay

                    .Where(o => o.Customer.Name.Contains(customerName, StringComparison.OrdinalIgnoreCase))

                    .ToList();

            }

            var detailedReport = ordersForDay

                .GroupBy(o => new { o.Customer.CustomerId, o.Customer.Name })

                .Select(g => new CustomerOrderReportDto

                {

                    CustomerId = g.Key.CustomerId,

                    CustomerName = g.Key.Name,

                    Orders = g.Select(o => new CustomerOrderDto

                    {

                        OrderId = o.OrderId,

                        OrderDate = o.OrderDate,

                        OrderTotal = o.TotalAmount,

                        OrderItems = o.OrderItems.Select(oi => new CustomerOrderItemDto

                        {

                            MenuItemName = oi.MenuItem.Name,

                            Quantity = oi.Quantity,

                            PricePerUnit = oi.Price,

                            TotalPrice = oi.Quantity * oi.Price

                        }).ToList()

                    }).ToList(),

                    TotalAmount = g.Sum(o => o.TotalAmount)

                })

                .ToList();

            return detailedReport;

        }

    }

}