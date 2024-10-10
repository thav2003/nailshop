namespace API.Dtos
{
    public class CreateCategoryDto
    {
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}
