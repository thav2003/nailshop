namespace Data
{
    public class CategoryWithChildrenDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? Description { get; set; }
        public int? ParentCategoryId { get; set; }
        public List<CategoryWithChildrenDto> ChildCategories { get; set; } = new List<CategoryWithChildrenDto>();
    }
}
