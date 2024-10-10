﻿namespace API.Dtos
{
    public class ParentCategoryDto
    {
        public int? ParentCategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
    }

    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public ParentCategoryDto? ParentCategory { get; set; }
    }
}
