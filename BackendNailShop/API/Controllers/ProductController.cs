using API.Dtos;
using AutoMapper;
using Business.Interfaces;
using Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _productRepository.GetAllAsync();
            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var productDto = _mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromForm] CreateProductDto createProductFormDto)
        {
            foreach (var imageFile in createProductFormDto.ImageFiles)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(memoryStream);
                    byte[] imageBytes = memoryStream.ToArray();
                    string base64String = Convert.ToBase64String(imageBytes);

                    createProductFormDto.Images.Add(new ProductImageDto
                    {
                        ImageUrl = base64String // Store base64 string in ImageUrl
                    });
                }
            }
            var product = _mapper.Map<Product>(createProductFormDto);

            await _productRepository.AddAsync(product);
            var productDto = _mapper.Map<ProductDto>(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, productDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromForm] UpdateProductDto updateProductDto)
        {
            if (id != updateProductDto.ProductId)
            {
                return BadRequest();
            }

            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

    

            // Process new image uploads if provided
            if (updateProductDto.ImageFiles != null && updateProductDto.ImageFiles.Count > 0)
            {
                product.ProductImages.Clear(); // Optionally clear existing images

                foreach (var imageFile in updateProductDto.ImageFiles)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await imageFile.CopyToAsync(memoryStream);
                        byte[] imageBytes = memoryStream.ToArray();
                        string base64String = Convert.ToBase64String(imageBytes);

                        updateProductDto.Images.Add(new ProductImageDto
                        {
                            ImageUrl = base64String // Store new base64 string in ImageUrl
                        });
                    }
                }
            }

            // Update product details
            _mapper.Map(updateProductDto, product);
            await _productRepository.UpdateAsync(product);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var success = await _productRepository.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
