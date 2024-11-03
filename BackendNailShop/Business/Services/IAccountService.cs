using Data.Entities;
using Google.Apis.Auth;
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
        Task<GoogleUserInfo> VerifyGoogleAccessTokenAsync(string accessToken);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string googleToken);
        Task<Account> FindOrCreateAccountAsync(string email);
    }
}
