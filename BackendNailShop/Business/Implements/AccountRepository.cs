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
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(NailShopDbContext context) : base(context) { }

        public async Task<Account> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(a => a.Email == email);
        }
    }
}
