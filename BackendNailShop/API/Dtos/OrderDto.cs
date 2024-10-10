namespace API.Dtos
{
    public class OrderDto
    {
        public int OrderId { get; set; }         
        public int CartId { get; set; }            
        public int AccountId { get; set; }          
        public decimal TotalAmount { get; set; }    
        public string PaymentMethod { get; set; }   
        public string ShippingMethod { get; set; }   
        public decimal ShippingFee { get; set; }    
        public string PaymentStatus { get; set; }   
        public string OrderStatus { get; set; }   
        public DateTime OrderDate { get; set; }    
        public int? VoucherId { get; set; }    
        public List<CartItemDto> CartItems { get; set; }
    }
}
