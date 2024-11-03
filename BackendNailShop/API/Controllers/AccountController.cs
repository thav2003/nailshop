using API.Dtos;
using Business.Interfaces;
using Business.Services;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAccountRepository _accountRepository;
   
        public AccountController(IAccountService accountService, IAccountRepository accountRepository)
        {
            _accountService = accountService;
            _accountRepository = accountRepository;
        }
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            // Verify the Google token and retrieve the payload
            var payload = await _accountService.VerifyGoogleAccessTokenAsync(request.GoogleToken);
            if (payload == null)
            {
                return Unauthorized("Invalid Google token.");
            }

            // Create or retrieve the account based on the payload information
            var account = await _accountService.FindOrCreateAccountAsync(payload.Email);

            // Return the account information directly
            return Ok(account);

        }

        [HttpPost("register")]
        public async Task<ActionResult<Account>> Register(CreateAccountDto accountDto)
        {
            var newAccount = new Account
            {
                FirstName = accountDto.FirstName,
                LastName = accountDto.LastName,
                Email = accountDto.Email,
                PasswordHash = _accountService.HashPassword(accountDto.Password),
                Role = accountDto.Role,
                Avatar = "default.png",
                CreationDate = DateTime.UtcNow
            };
            var account = await _accountService.RegisterAsync(newAccount);
            return CreatedAtAction(nameof(Register), new { id = account.AccountId }, account);
        }

        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(LoginDto loginDto)
        {
            var account = await _accountService.LoginAsync(loginDto.Email, loginDto.Password);
            if (account == null)
            {
                return Unauthorized();
            }

            return Ok(account);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Account>> UpdateAccount(int id, UpdateAccountDto updateAccountDto)
        {
            var account = await _accountRepository.GetByIdAsync(id);
            if (account == null)
            {
                return NotFound("Account not found.");
            }

            account.FirstName = updateAccountDto.FirstName ?? account.FirstName;
            account.LastName = updateAccountDto.LastName ?? account.LastName;

           /* if (!string.IsNullOrEmpty(updateAccountDto.Password))
            {
                account.PasswordHash = _accountService.HashPassword(updateAccountDto.Password);
            }

            account.Avatar = updateAccountDto.Avatar ?? account.Avatar;*/

            await _accountRepository.UpdateAsync(account);

            return Ok(account);
        }
    }
}
