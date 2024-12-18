﻿namespace API.Dtos
{
    public class UpdateRefundOrderDto
    {
        public int RefundOrderId { get; set; }

        public int? OrderId { get; set; }

        public decimal? RefundAmount { get; set; }

        public DateTime? RefundDate { get; set; }

        public string? RefundReason { get; set; }

        public string? RefundStatus { get; set; }
        public string ContactEmail { get; set; }
    }
}
