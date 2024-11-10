using API.Dtos;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly NailShopDbContext _context;

        public OrderController(NailShopDbContext context)
        {
            _context = context;
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetOrdersByAccountId(int accountId)
        {
            var orders = await _context.Orders
                .Where(o => o.AccountId == accountId)
                .Include(o => o.Cart)
                .ThenInclude(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    CartId = (int)o.CartId,
                    AccountId = (int)o.AccountId,
                    TotalAmount = (decimal)o.TotalAmount,
                    PaymentMethod = o.PaymentMethod,
                    ShippingMethod = o.ShippingMethod,
                    ShippingFee = (decimal)o.ShippingFee,
                    PaymentStatus = o.PaymentStatus,
                    OrderStatus = o.OrderStatus,
                    OrderDate = (DateTime)o.OrderDate,
                    VoucherId = o.VoucherId,
                    Account = new AccountDto
                    {
                        AccountId = o.Account.AccountId,
                        FirstName = o.Account.FirstName,
                        LastName = o.Account.LastName,
                        Email = o.Account.Email,
                        Avatar = o.Account.Avatar,
                        Role = o.Account.Role,
                        CreationDate = o.Account.CreationDate,
                    },
                    CartItems = o.Cart.CartItems.Select(ci => new CartItemDto
                    {
                        CartItemId = ci.CartItemId,
                        ProductName = ci.Product.Name,
                        ProductId = (int)ci.ProductId,
                        Quantity = (int)ci.Quantity,
                        Customization = ci.Customization,
                        TotalPrice = ci.TotalPrice ?? 0,
                        Price = (decimal)ci.Product.Price,
                        CreationDate = ci.CreationDate ?? DateTime.UtcNow
                    }).ToList()
                }).ToListAsync();

            

            return Ok(orders);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Cart)
                .ThenInclude(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .Select(o => new OrderDto
                {
                    OrderId = o.OrderId,
                    CartId = (int)o.CartId,
                    AccountId = (int)o.AccountId,
                    TotalAmount = (decimal)o.TotalAmount,
                    PaymentMethod = o.PaymentMethod,
                    ShippingMethod = o.ShippingMethod,
                    ShippingFee = (decimal)o.ShippingFee,
                    PaymentStatus = o.PaymentStatus,
                    OrderStatus = o.OrderStatus,
                    OrderDate = (DateTime)o.OrderDate,
                    VoucherId = o.VoucherId,
                    Account = new AccountDto 
                    {
                        AccountId = o.Account.AccountId,
                        FirstName = o.Account.FirstName,
                        LastName = o.Account.LastName,
                        Email = o.Account.Email,
                        Avatar = o.Account.Avatar,
                        Role = o.Account.Role,
                        CreationDate = o.Account.CreationDate,
                    },
                    CartItems = o.Cart.CartItems.Select(ci => new CartItemDto
                    {
                        CartItemId = ci.CartItemId,
                        ProductName = ci.Product.Name,
                        ProductId = (int)ci.ProductId,
                        Quantity = (int)ci.Quantity,
                        Customization = ci.Customization,
                        TotalPrice = ci.TotalPrice ?? 0,
                        Price = (decimal)ci.Product.Price,
                        CreationDate = ci.CreationDate ?? DateTime.UtcNow
                    }).ToList()
                }).ToListAsync();

            return Ok(orders);
        }
    }
}
