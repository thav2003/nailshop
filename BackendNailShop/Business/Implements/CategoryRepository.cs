using Business.Interfaces;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(NailShopDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Category>> GetParentCategoriesAsync()
        {
            return await this._context.Categories
                .Where(c => c.ParentCategoryId == null)
                .ToListAsync();
        }
    }
}
