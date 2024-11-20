namespace API.Dtos
{
    public class AccountDto
    {
        public int AccountId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Avatar { get; set; }
        public string? Role { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
