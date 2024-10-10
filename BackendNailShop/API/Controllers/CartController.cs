using API.Dtos;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly NailShopDbContext _context;

        public CartController(NailShopDbContext context)
        {
            _context = context;
        }

        [HttpPost("items")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddCartItemDto itemDto)
        {
            var product = await _context.Products.FindAsync(itemDto.ProductId);
            if (product == null)
            {
                return NotFound($"Product with ID {itemDto.ProductId} not found.");
            }
            if (itemDto.Quantity > product.StockQuantity)
            {
                return BadRequest($"Not enough quantity available for product {product.Name}.");
            }

            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.AccountId == itemDto.AccountId && c.Status == "Active");

            if (cart == null)
            {
                cart = new Cart
                {
                    AccountId = itemDto.AccountId,
                    Status = "Active",
                    CreationDate = DateTime.UtcNow
                };

                await _context.Carts.AddAsync(cart);
                await _context.SaveChangesAsync();
            }

            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == itemDto.ProductId && ci.Customization == itemDto.Customization);
            if (existingItem != null)
            {
                existingItem.Quantity += itemDto.Quantity;
                existingItem.TotalPrice = existingItem.Quantity * product.Price;

                _context.CartItems.Update(existingItem);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    CartId = cart.CartId,
                    CartItem = new CartItemDto
                    {
                        Price = (decimal)product.Price,
                        CartItemId = existingItem.CartItemId,
                        ProductName = product.Name,
                        ProductId = (int)existingItem.ProductId,
                        Quantity = (int)existingItem.Quantity,
                        Customization = existingItem.Customization,
                        TotalPrice = (decimal)existingItem.TotalPrice,
                        CreationDate = existingItem.CreationDate ?? DateTime.UtcNow
                    }
                });
            }

            var totalPrice = itemDto.Quantity * product.Price;

            var cartItem = new CartItem
            {
                ProductId = itemDto.ProductId,
                Quantity = itemDto.Quantity,
                Customization = itemDto.Customization,
                TotalPrice = totalPrice,
                CartId = cart.CartId
            };

            await _context.CartItems.AddAsync(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(AddItemToCart), new { cartId = cart.CartId, itemId = cartItem.CartItemId }, new
            {
                CartId = cart.CartId,
                CartItem = new CartItemDto
                {
                    Price = (decimal)product.Price,
                    CartItemId = cartItem.CartItemId,
                    ProductName = product.Name,
                    ProductId = (int)cartItem.ProductId,
                    Quantity = (int)cartItem.Quantity,
                    Customization = cartItem.Customization,
                    TotalPrice = (decimal)cartItem.TotalPrice,
                    CreationDate = cartItem.CreationDate ?? DateTime.UtcNow
                }
            });
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetCartByAccountId(int accountId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.AccountId == accountId && c.Status == "Active");

            if (cart == null)
            {
                return NotFound("No active cart found for the specified account.");
            }

            var cartDto = new CartDto
            {
                CartId = cart.CartId,
                AccountId = cart.AccountId,
                Status = cart.Status,
                CreationDate = cart.CreationDate ?? DateTime.UtcNow,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    Price = (decimal)ci.Product.Price,
                    CartItemId = ci.CartItemId,
                    ProductName= ci.Product.Name,
                    ProductId = (int)ci.ProductId,
                    Quantity = (int)ci.Quantity,
                    Customization = ci.Customization,
                    TotalPrice = ci.TotalPrice ?? 0,
                    CreationDate = ci.CreationDate ?? DateTime.UtcNow
                }).ToList()
            };

            return Ok(cartDto);
        }
        [HttpDelete("{cartId}/items/{cartItemId}")]
        public async Task<IActionResult> RemoveItemFromCart(int cartId, int cartItemId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CartId == cartId && c.Status == "Active");

            if (cart == null)
            {
                return NotFound("Cart not found or is not active.");
            }

            var item = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.CartId == cartId);

            if (item == null)
            {
                return NotFound("Item not found in the cart.");
            }

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{cartId}/items/{cartItemId}/increase")]
        public async Task<IActionResult> IncreaseItemQuantity(int cartId, int cartItemId, [FromBody] int quantityToAdd)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CartId == cartId && c.Status == "Active");

            if (cart == null)
            {
                return NotFound("Cart not found or is not active.");
            }

            var item = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.CartId == cartId);

            if (item == null)
            {
                return NotFound("Item not found in the cart.");
            }

            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null || item.Quantity + quantityToAdd > product.StockQuantity)
            {
                return BadRequest($"Not enough quantity available for product {product?.Name ?? "unknown"}.");
            }

            item.Quantity += quantityToAdd;
            item.TotalPrice = item.Quantity * product.Price;

            _context.CartItems.Update(item);
            await _context.SaveChangesAsync();

            return Ok(new CartItemDto
            {
                CartItemId = item.CartItemId,
                ProductId = (int)item.ProductId,
                Quantity = (int)item.Quantity,
                Customization = item.Customization,
                TotalPrice = item.TotalPrice ?? 0,
                CreationDate = item.CreationDate ?? DateTime.UtcNow
            });
        }

        [HttpPost("{cartId}/items/{cartItemId}/decrease")]
        public async Task<IActionResult> DecreaseItemQuantity(int cartId, int cartItemId, [FromBody] int quantityToRemove)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CartId == cartId && c.Status == "Active");

            if (cart == null)
            {
                return NotFound("Cart not found or is not active.");
            }

            var item = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.CartId == cartId);

            if (item == null)
            {
                return NotFound("Item not found in the cart.");
            }

            if (item.Quantity <= quantityToRemove)
            {
                return BadRequest("Cannot reduce quantity below zero. Consider removing the item instead.");
            }

            item.Quantity -= quantityToRemove;
            item.TotalPrice = item.Quantity * item.TotalPrice / (item.Quantity + quantityToRemove);

            _context.CartItems.Update(item);
            await _context.SaveChangesAsync();

            return Ok(new CartItemDto
            {
                CartItemId = item.CartItemId,
                ProductId = (int)item.ProductId,
                Quantity = (int)item.Quantity,
                Customization = item.Customization,
                TotalPrice = item.TotalPrice ?? 0,
                CreationDate = item.CreationDate ?? DateTime.UtcNow
            });
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckoutCart([FromBody] CheckoutDto checkoutDto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.AccountId == checkoutDto.AccountId && c.Status == "Active");

            if (cart == null || !cart.CartItems.Any())
            {
                return NotFound("No active cart found for the specified account or the cart is empty.");
            }

            decimal totalAmount = cart.CartItems.Sum(ci => ci.TotalPrice ?? 0) + checkoutDto.ShippingFee;


            var order = new Order
            {
                CartId = cart.CartId,
                AccountId = cart.AccountId,
                VoucherId = checkoutDto.VoucherId,
                TotalAmount = totalAmount,
                PaymentMethod = checkoutDto.PaymentMethod,
                ShippingMethod = checkoutDto.ShippingMethod,
                ShippingFee = checkoutDto.ShippingFee,
                ShippingAddress = checkoutDto.ShippingAddress,
                PaymentStatus = "Pending",
                OrderStatus = "Pending",
                OrderDate = DateTime.UtcNow
            };

            await _context.Orders.AddAsync(order);

            cart.Status = "Completed";

            await _context.SaveChangesAsync();

            var payment = new Payment
            {
                OrderId = order.OrderId,
                PaymentMethod = checkoutDto.PaymentMethod,
                PaymentAmount = totalAmount,
                PaymentStatus = "Pending",
                PaymentDate = DateTime.UtcNow
            };

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();

            var orderDto = new OrderDto
            {
                OrderId = order.OrderId,
                CartId = (int)order.CartId,
                AccountId = (int)order.AccountId,
                TotalAmount = (decimal)order.TotalAmount,
                PaymentMethod = order.PaymentMethod,
                ShippingMethod = order.ShippingMethod,
                ShippingFee = (decimal)order.ShippingFee,
                PaymentStatus = order.PaymentStatus,
                OrderStatus = order.OrderStatus,
                OrderDate = (DateTime)order.OrderDate,
                VoucherId = order.VoucherId,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    CartItemId = ci.CartItemId,
                    ProductId = (int)ci.ProductId,
                    Quantity = (int)ci.Quantity,
                    Customization = ci.Customization,
                    TotalPrice = ci.TotalPrice ?? 0,
                    Price = (decimal)ci.Product.Price,
                    CreationDate = ci.CreationDate ?? DateTime.UtcNow
                }).ToList()
            };
            return Ok(orderDto);
        }
    }
}
