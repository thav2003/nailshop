using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class Product
{
    public int ProductId { get; set; }

    public int? CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public int? StockQuantity { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<CustomOption> CustomOptions { get; set; } = new List<CustomOption>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();
}
