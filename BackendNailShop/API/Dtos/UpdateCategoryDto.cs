﻿namespace API.Dtos
{
    public class UpdateCategoryDto
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}
