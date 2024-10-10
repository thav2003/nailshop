namespace API.Dtos
{
    public class CustomOptionDto
    {
        public int OptionId { get; set; }
        public int? ProductId { get; set; }
        public string? OptionName { get; set; }
        public string? OptionValue { get; set; }
        public decimal? AdditionalPrice { get; set; }
    }
}
