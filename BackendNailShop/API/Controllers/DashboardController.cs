using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly NailShopDbContext _context;

        public DashboardController(NailShopDbContext context)
        {
            _context = context;
        }
        [HttpGet("summary")]
        public IActionResult GetDashboardSummary()
        {
            // Tổng số đơn hàng
            var totalOrders = _context.Orders.Count();

            // Tổng doanh thu từ những thanh toán đã hoàn thành
            var totalRevenue = _context.Payments
                .Where(p => p.PaymentStatus == "Paid")
                .Sum(p => p.PaymentAmount ?? 0);

            // Đơn hàng đang chờ xử lý
            var pendingOrders = _context.Orders
                .Where(o => o.OrderStatus == "Pending")
                .Count();

            // Đơn hàng gần đây (3 đơn hàng gần nhất)
            var recentOrders = _context.Orders
                .Include(o=>o.Account)
                .OrderByDescending(o => o.OrderDate)
                .Take(3)
                .Select(o => new
                {
                    OrderId = o.OrderId,
                    Customer = $"{o.Account.FirstName} {o.Account.LastName}",
                    Status = o.OrderStatus,
                    Total = o.TotalAmount
                })
                .ToList();

            // Trả về kết quả
            return Ok(new
            {
                TotalOrders = totalOrders,
                Revenue = totalRevenue,
                PendingOrders = pendingOrders,
                RecentOrders = recentOrders
            });
        }
    }
}
