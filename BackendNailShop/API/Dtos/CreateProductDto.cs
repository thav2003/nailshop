using System.ComponentModel;

namespace API.Dtos
{
    public class CreateProductDto
    {
        public int? CategoryId { get; set; }
        [DefaultValue("Default Product Name")]
        public string? Name { get; set; }
        [DefaultValue("Default Description")]
        public string? Description { get; set; }
        [DefaultValue(100.0)]
        public decimal? Price { get; set; }
        [DefaultValue(10)]
        public int? StockQuantity { get; set; }
        public List<IFormFile>? ImageFiles { get; set; }
        public List<ProductImageDto> Images { get; set; } = new List<ProductImageDto>();
        public List<CustomOptionDto> CustomOptions { get; set; } = new List<CustomOptionDto>();
    }
}
