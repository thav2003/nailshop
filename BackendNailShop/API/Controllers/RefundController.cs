using API.Dtos;
using AutoMapper;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefundController : ControllerBase
    {
        private readonly NailShopDbContext _context;
        private readonly IMapper _mapper;

        public RefundController(NailShopDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Refund
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RefundOrderDto>>> GetRefundOrders()
        {
            var refunds = await _context.RefundOrders.ToListAsync();
            var refundDtos = _mapper.Map<IEnumerable<RefundOrderDto>>(refunds);
            return Ok(refundDtos);
        }

        // GET: api/Refund/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RefundOrderDto>> GetRefundOrder(int id)
        {
            var refund = await _context.RefundOrders.FindAsync(id);
            if (refund == null)
            {
                return NotFound();
            }
            var refundDto = _mapper.Map<RefundOrderDto>(refund);
            return Ok(refundDto);
        }

        // POST: api/Refund
        [HttpPost]
        public async Task<ActionResult<RefundOrderDto>> CreateRefundOrder(CreateRefundOrderDto createRefundOrderDto)
        {
            var refundOrder = _mapper.Map<RefundOrder>(createRefundOrderDto);
            _context.RefundOrders.Add(refundOrder);
            await _context.SaveChangesAsync();
            var refundOrderDto = _mapper.Map<RefundOrderDto>(refundOrder);
            return CreatedAtAction(nameof(GetRefundOrder), new { id = refundOrder.RefundOrderId }, refundOrderDto);
        }

        // PUT: api/Refund/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateRefundOrder(int id, UpdateRefundOrderDto updateRefundOrderDto)
        {
            if (id != updateRefundOrderDto.RefundOrderId)
            {
                return BadRequest();
            }

            var refundOrder = _mapper.Map<RefundOrder>(updateRefundOrderDto);
            _context.Entry(refundOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RefundOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Refund/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRefundOrder(int id)
        {
            var refundOrder = await _context.RefundOrders.FindAsync(id);
            if (refundOrder == null)
            {
                return NotFound();
            }

            _context.RefundOrders.Remove(refundOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RefundOrderExists(int id)
        {
            return _context.RefundOrders.Any(e => e.RefundOrderId == id);
        }
    }
}
