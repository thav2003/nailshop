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
                int? orderId = ExtractOrderIdFromDescription(data.description);
                var order = await _context.Orders
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);
                var payment = await _context.Payments.FirstOrDefaultAsync(p => p.OrderId == orderId);
                if (order == null)
                {
                    Console.WriteLine("Order not found with OrderId: " + orderId);
                    return NotFound(new Response(-1, "Order not found", null));
                }
                if (payment == null)
                {
                    Console.WriteLine("Payment not found with OrderId: " + orderId);
                    return NotFound(new Response(-1, "Payment not found", null));
                }

                if (data.code.Equals("00"))
                {
                    Console.WriteLine("Payment successful for OrderId: " + orderId);
                    order.PaymentStatus = "Paid";
                    order.OrderStatus = "Paid";
                    payment.PaymentStatus = "Paid";
                }
                else
                {
                    Console.WriteLine("Payment failed or canceled for OrderId: " + orderId);
                    order.PaymentStatus = "Cancel";
                    order.OrderStatus = "Cancel";
                    payment.PaymentStatus = "Cancel";
                }

                await _context.SaveChangesAsync();
                return Ok(new Response(0, "Ok", null));
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception occurred: " + e.Message);
                return Ok(new Response(-1, "fail", null));
            }
        }
        private int? ExtractOrderIdFromDescription(string description)
        {
            Console.WriteLine("Extracting OrderId from description: " + description);
            string prefix = "don hang "; // Example prefix to locate the OrderId
            int startIndex = description.IndexOf(prefix, StringComparison.OrdinalIgnoreCase);
            if (startIndex == -1)
            {
                Console.WriteLine("Prefix not found in description.");
                return null;
            }

            startIndex += prefix.Length;
            int endIndex = description.IndexOf(" ", startIndex); // Optional: Find the end of the OrderId if needed
            if (endIndex == -1) endIndex = description.Length;

            string orderIdString = description.Substring(startIndex, endIndex - startIndex).Trim();
            Console.WriteLine("Extracted OrderId string: " + orderIdString);

            if (int.TryParse(orderIdString, out int orderId))
            {
                Console.WriteLine("Parsed OrderId: " + orderId);
                return orderId;
            }

            Console.WriteLine("Failed to parse OrderId as an integer.");
            return null;
        }
    }
}
