﻿using Data;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetParentCategoriesAsync();
        Task<IEnumerable<CategoryWithChildrenDto>> GetCategoriesWithChildrenAsync();
    }
}
