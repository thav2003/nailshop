using Business.Interfaces;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Business.Implements
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(NailShopDbContext context) : base(context)
        {
        }
        public override async Task<IEnumerable<Product>> GetAllAsync()
        {
            
            return await _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.CustomOptions)
                .ToListAsync();
        }
        public override async Task<Product> GetByIdAsync(int id)
        {
           
            return await _dbSet
                .Include(p => p.ProductImages)
                .Include(p => p.CustomOptions)
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }
        public override async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products
                    .Include(p => p.ProductImages)
                    .Include(p => p.CustomOptions)
                    .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null) return false;

            var images = await _context.ProductImages.Where(img => img.ProductId == id).ToListAsync();
            _context.ProductImages.RemoveRange(images);

            var customOptions = await _context.CustomOptions.Where(opt => opt.ProductId == id).ToListAsync();
            _context.CustomOptions.RemoveRange(customOptions);

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
