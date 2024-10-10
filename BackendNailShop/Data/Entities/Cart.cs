using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Cart
{
    public int CartId { get; set; }

    public int? AccountId { get; set; }

    public string? SessionId { get; set; }

    public string? Status { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
