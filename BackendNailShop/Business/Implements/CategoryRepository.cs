using Business.Interfaces;
using Data;
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
        public async Task<IEnumerable<CategoryWithChildrenDto>> GetCategoriesWithChildrenAsync()
        {
            var categories = await _context.Categories
               .Where(c => c.ParentCategoryId == null)
               .Select(c => new CategoryWithChildrenDto
               {
                   CategoryId = c.CategoryId,
                   CategoryName = c.CategoryName,
                   Description = c.Description,
                   ParentCategoryId = c.ParentCategoryId,
                   ChildCategories = c.InverseParentCategory.Select(child => new CategoryWithChildrenDto
                   {
                       CategoryId = child.CategoryId,
                       CategoryName = child.CategoryName,
                       Description = child.Description,
                       ParentCategoryId = child.ParentCategoryId
                   }).ToList()
               })
               .ToListAsync();

            return categories;
        }
        public async Task<IEnumerable<Category>> GetParentCategoriesAsync()
        {
            return await this._context.Categories
                .Where(c => c.ParentCategoryId == null)
                .ToListAsync();
        }
    }
}
