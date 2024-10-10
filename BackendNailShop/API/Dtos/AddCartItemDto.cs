namespace API.Dtos
{
    public class AddCartItemDto
    {
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public string? Customization { get; set; }
        public int AccountId { get; set; }
    }
}
