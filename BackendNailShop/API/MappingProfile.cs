using API.Dtos;
using AutoMapper;
using Data.Entities;

namespace API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.ParentCategory, opt => opt.MapFrom(src => src.ParentCategory != null ? new ParentCategoryDto
                {
                    ParentCategoryId = src.ParentCategory.ParentCategoryId,
                    CategoryName = src.ParentCategory.CategoryName,
                    Description = src.ParentCategory.Description
                } : null));

            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();


            CreateMap<ProductImage, ProductImageDto>();
            CreateMap<ProductImageDto, ProductImage>();

            CreateMap<CustomOption, CustomOptionDto>();
            CreateMap<CustomOptionDto, CustomOption>();

            // Product mappings
            CreateMap<Product, ProductDto>()
             .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.ProductImages))
             .ForMember(dest => dest.CustomOptions, opt => opt.MapFrom(src => src.CustomOptions)); ;
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();

            CreateMap<ProductDto, Product>()
            .ForMember(dest => dest.ProductImages, opt => opt.MapFrom(src => src.Images))
            .ForMember(dest => dest.CustomOptions, opt => opt.MapFrom(src => src.CustomOptions));

            CreateMap<CreateProductDto, Product>()
            .ForMember(dest => dest.ProductImages, opt => opt.MapFrom(src => src.Images))
            .ForMember(dest => dest.CustomOptions, opt => opt.MapFrom(src => src.CustomOptions));
        }
    }
}
