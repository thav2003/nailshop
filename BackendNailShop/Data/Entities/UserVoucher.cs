using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class UserVoucher
{
    public int UserVoucherId { get; set; }

    public int? AccountId { get; set; }

    public int? VoucherId { get; set; }

    public bool? IsUsed { get; set; }

    public DateTime? AppliedDate { get; set; }

    public virtual Account? Account { get; set; }

    public virtual Voucher? Voucher { get; set; }
}
