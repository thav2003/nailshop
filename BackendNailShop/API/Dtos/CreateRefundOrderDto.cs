namespace API.Dtos
{
    public class CreateRefundOrderDto
    {

        public int? OrderId { get; set; }

        public decimal RefundAmount { get; set; }

        public DateTime RefundDate { get; set; }

        public string RefundReason { get; set; }

        public string ContactEmail { get; set; }
        public string RefundStatus { get; set; }
    }
}
