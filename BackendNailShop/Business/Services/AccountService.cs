using Business.Interfaces;
using Data.Entities;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Business.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        public AccountService(IAccountRepository accountRepository, IConfiguration configuration, HttpClient httpClient)
        {
            _accountRepository = accountRepository;
            _configuration = configuration;
            _httpClient = httpClient;
        }
        public async Task<GoogleUserInfo> VerifyGoogleAccessTokenAsync(string accessToken)
        {
            var tokenInfoUrl = $"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={accessToken}";
            var response = await _httpClient.GetAsync(tokenInfoUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var userInfo = JsonSerializer.Deserialize<GoogleUserInfo>(content, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase // Ensure JSON property names match
                });
                return userInfo;
            }

            return null; // Invalid or expired token
        }
        public async Task<Account> FindOrCreateAccountAsync(string email)
        {
            var account = await _accountRepository.GetByEmailAsync(email);
            if (account == null)
            {
                account = new Account
                {
                    Email = email,
                    FirstName = email,
                    Avatar = "default.png",
                    CreationDate = DateTime.UtcNow,
                    Role = "Customer"
                };
                await _accountRepository.AddAsync(account);
            }
            return account;
        }
        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string googleToken)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> { _configuration["Authentication:Google:ClientId"] }
            };


            var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken, settings);
            return payload;
        }
        public async Task<Account> RegisterAsync(Account account)
        {
            

            return await _accountRepository.AddAsync(account);
        }

        public async Task<Account> LoginAsync(string email, string password)
        {
            var account = await _accountRepository.GetByEmailAsync(email);
            if (account != null && VerifyPassword(password, account.PasswordHash))
            {
                return account; // Return account if password matches
            }

            return null; // Return null if login fails
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, storedHash);
        }

    }
}
