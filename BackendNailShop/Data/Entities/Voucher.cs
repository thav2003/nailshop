using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Voucher
{
    public int VoucherId { get; set; }

    public string? Code { get; set; }

    public decimal? DiscountAmount { get; set; }

    public decimal? MinimumSpend { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
