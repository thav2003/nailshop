using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IAccountService
    {
        Task<Account> RegisterAsync(Account account);
        Task<Account> LoginAsync(string email, string password);
        string HashPassword(string password);
    }
}
