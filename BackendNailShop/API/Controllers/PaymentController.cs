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
        public async Task<IActionResult> PayOSTransferHandler(WebhookType body)
        {
            try
            {
                Console.WriteLine("Received webhook request with body: " + Newtonsoft.Json.JsonConvert.SerializeObject(body));

                WebhookData data = _payOS.verifyPaymentWebhookData(body);
                Console.WriteLine("Verified webhook data: " + Newtonsoft.Json.JsonConvert.SerializeObject(data));

                if (data.description == "Ma giao dich thu nghiem" || data.description == "VQRIO123")
                {
                    Console.WriteLine("Test transaction or specific description detected: " + data.description);
                    return Ok(new Response(0, "Ok", null));
                }

                var order = await _context.Orders
                    .FirstOrDefaultAsync(o => o.OrderId == data.orderCode);

                if (order == null)
                {
                    Console.WriteLine("Order not found with OrderId: " + data.orderCode);
                    return NotFound(new Response(-1, "Order not found", null));
                }

                if (data.code.Equals("00"))
                {
                    Console.WriteLine("Payment successful for OrderId: " + data.orderCode);
                    order.PaymentStatus = "Paid";
                }
                else
                {
                    Console.WriteLine("Payment failed or canceled for OrderId: " + data.orderCode);
                    order.PaymentStatus = "Cancel";
                }

                await _context.SaveChangesAsync();
                Console.WriteLine("Order payment status updated to: " + order.PaymentStatus);

                return Ok(new Response(0, "Ok", null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception occurred: " + e.Message);
                return Ok(new Response(-1, "fail", null));
            }
        }

    }
}
