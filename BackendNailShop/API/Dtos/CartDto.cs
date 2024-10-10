namespace API.Dtos
{
    public class CartItemDto
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string? Customization { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal Price { get; set; }
        public DateTime CreationDate { get; set; }
    }
    public class CartDto
    {
        public int CartId { get; set; }
        public int? AccountId { get; set; }
        public string? Status { get; set; }
        public DateTime CreationDate { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    }
}
