using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net.payOS.Types;
using Net.payOS;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public record Response(
              int error,
              String message,
              object? data
          );
        private readonly PayOS _payOS;
        private readonly NailShopDbContext _context; // Cần quyền truy cập vào DbContext

        public PaymentController(PayOS payOS, NailShopDbContext context)
        {
            _payOS = payOS;
            _context = context;
        }

        [HttpPost("payos_transfer_handler")]
        public async Task<IActionResult> payOSTransferHandler(WebhookType body)
        {
            try
            {
                WebhookData data = _payOS.verifyPaymentWebhookData(body);

                if (data.description == "Ma giao dich thu nghiem" || data.description == "VQRIO123")
                {
                    return Ok(new Response(0, "Ok", null));
                }
            
                if (data.code.Equals("00"))
                {
                    var order = await _context.Orders
                        .FirstOrDefaultAsync(o => o.OrderId == data.orderCode);
                    if (order == null)
                    {
                        return NotFound(new Response(-1, "Order not found", null));
                    }
                    order.PaymentStatus = "Paid";

                    await _context.SaveChangesAsync();
                }
               

                return Ok(new Response(0, "Ok", null));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Ok(new Response(-1, "fail", null));
            }

        }
    }
}
