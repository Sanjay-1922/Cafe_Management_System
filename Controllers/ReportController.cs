using Microsoft.AspNetCore.Mvc;

using System;

using CafeManagementSystem.Services;

using CafeManagementSystem.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers

{
    [Authorize(Roles = "Owner")]
    [Route("api/[controller]")]

    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ReportService _reportService;
        private readonly ILogger<ReportController> _logger;

        public ReportController(ReportService reportService, ILogger<ReportController> logger)
        {
            _reportService = reportService;
            _logger = logger;
        }

        // GET: api/report/daily-sales?date=2025-02-12
        [HttpGet("daily-sales")]
        public IActionResult GetDailySalesReport([FromQuery] DateTime date)
        {
            if (date == default)
            {
                _logger.LogWarning("Invalid date provided for daily sales report.");
                return BadRequest("Invalid date.");
            }

            _logger.LogInformation("Fetching daily sales report for date: {Date}", date);
            var report = _reportService.GetDailySalesReport(date);
            return Ok(report);
        }

        // GET: api/report/category?date=2025-02-12&category=Beverages
        [HttpGet("category")]
        public IActionResult GetCategorySalesReport([FromQuery] DateTime date, [FromQuery] string category)
        {
            if (date == default || string.IsNullOrWhiteSpace(category))
            {
                _logger.LogWarning("Invalid date or category provided for category sales report.");
                return BadRequest("Invalid date or category.");
            }

            _logger.LogInformation("Fetching category sales report for date: {Date} and category: {Category}", date, category);
            var report = _reportService.GetCategorySalesReport(date, category);

            if (report == null)
            {
                _logger.LogWarning("No sales data found for the specified category: {Category} on date: {Date}", category, date);
                return NotFound("No sales data found for the specified category.");
            }

            return Ok(report);
        }

        // GET: api/report/item?date=2025-02-12&category=Beverages&item=Cappuccino
        [HttpGet("item")]
        public IActionResult GetItemSalesReport([FromQuery] DateTime date, [FromQuery] string category, [FromQuery] string item)
        {
            if (date == default || string.IsNullOrWhiteSpace(category) || string.IsNullOrWhiteSpace(item))
            {
                _logger.LogWarning("Invalid date, category, or item provided for item sales report.");
                return BadRequest("Invalid date, category, or item.");
            }

            _logger.LogInformation("Fetching item sales report for date: {Date}, category: {Category}, and item: {Item}", date, category, item);
            var result = _reportService.GetItemSalesReport(date, category, item);

            if (result == null)
            {
                _logger.LogWarning("No sales data found for the specified item: {Item} in category: {Category} on date: {Date}", item, category, date);
                return NotFound("No sales data found for the specified item in the category.");
            }

            return Ok(result);
        }
    }

}