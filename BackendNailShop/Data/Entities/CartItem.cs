using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public int? CartId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public string? Customization { get; set; }

    public decimal? TotalPrice { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual Product? Product { get; set; }
}
