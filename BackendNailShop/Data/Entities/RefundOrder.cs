using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class RefundOrder
{
    public int RefundOrderId { get; set; }

    public int OriginalOrderId { get; set; }

    public int? OrderId { get; set; }

    public decimal? RefundAmount { get; set; }

    public DateTime? RefundDate { get; set; }

    public string? RefundReason { get; set; }

    public string? RefundStatus { get; set; }

    public virtual Order? Order { get; set; }
}
