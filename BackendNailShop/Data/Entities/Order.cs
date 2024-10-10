using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Order
{
    public int OrderId { get; set; }

    public int? CartId { get; set; }

    public int? AccountId { get; set; }

    public int? VoucherId { get; set; }

    public decimal? TotalAmount { get; set; }

    public decimal? ShippingFee { get; set; }

    public string? PaymentStatus { get; set; }

    public string? OrderStatus { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? ShippingMethod { get; set; }

    public string? PaymentMethod { get; set; }

    public string? ShippingAddress { get; set; }

    public virtual Account? Account { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<RefundOrder> RefundOrders { get; set; } = new List<RefundOrder>();

    public virtual Voucher? Voucher { get; set; }
}
