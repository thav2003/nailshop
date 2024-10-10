namespace API.Dtos
{
    public class CheckoutDto
    {
        public int AccountId { get; set; }
        public int? VoucherId { get; set; }
        public string? ShippingMethod { get; set; }
        public string? PaymentMethod { get; set; }
        public string? ShippingAddress { get; set; }
        public decimal ShippingFee { get; set; }
    }
}
