using System;
using System.Collections.Generic;

namespace Data.Entities;

public partial class CustomOption
{
    public int OptionId { get; set; }

    public int? ProductId { get; set; }

    public string? OptionName { get; set; }

    public string? OptionValue { get; set; }

    public decimal? AdditionalPrice { get; set; }

    public virtual Product? Product { get; set; }
}
