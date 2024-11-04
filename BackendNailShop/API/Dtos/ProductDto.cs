namespace API.Dtos
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? StockQuantity { get; set; }
        public DateTime? CreationDate { get; set; }
        public List<ProductImageDto>? Images { get; set; }
        public List<CustomOptionDto>? CustomOptions { get; set; }
    }
}
