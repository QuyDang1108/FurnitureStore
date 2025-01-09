package com.furnistyle.furniturebackend.services;

import static org.hamcrest.core.IsInstanceOf.any;
import static org.instancio.Select.field;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.furnistyle.furniturebackend.dtos.bases.ProductDTO;
import com.furnistyle.furniturebackend.dtos.responses.ProductResponse;
import com.furnistyle.furniturebackend.enums.EProductStatus;
import com.furnistyle.furniturebackend.exceptions.NotFoundException;
import com.furnistyle.furniturebackend.models.Category;
import com.furnistyle.furniturebackend.models.Material;
import com.furnistyle.furniturebackend.models.Product;
import com.furnistyle.furniturebackend.repositories.CategoryRepository;
import com.furnistyle.furniturebackend.repositories.MaterialRepository;
import com.furnistyle.furniturebackend.repositories.ProductRepository;
import com.furnistyle.furniturebackend.services.impl.ProductServiceImpl;
import com.furnistyle.furniturebackend.utils.Constants;
import java.util.Optional;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProductServiceTest {

    @MockBean
    ProductRepository productRepository;

    @Autowired
    ProductServiceImpl productService;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private MaterialRepository materialRepository;

    public static Product generateFakeProduct() {
        return Instancio.of(Product.class)
            .set(field(Product.class, "name"), "Test Product")
            .set(field(Product.class, "description"), "Test Description")
            .set(field(Product.class, "price"), 100.0)
            .set(field(Product.class, "status"), EProductStatus.ACTIVE)
            .create();
    }

    public static ProductDTO generateFakeProductDTO() {
        return Instancio.of(ProductDTO.class)
            .set(field(ProductDTO.class, "name"), "New Product")
            .set(field(ProductDTO.class, "description"), "New Description")
            .set(field(ProductDTO.class, "price"), 150.0)
            .set(field(ProductDTO.class, "status"), EProductStatus.ACTIVE)
            .create();
    }

//    public static Category generateFakeCategory() {
//        return Instancio.of(Category.class)
//            .set(field(Category.class, "id"), 1L)
//            .set(field(Category.class, "name"), "Sample Category")
//            .create();
//    }
//
//    public static Material generateFakeMaterial() {
//        return Instancio.of(Material.class)
//            .set(field(Material.class, "id"), 1L)
//            .set(field(Material.class, "name"), "Sample Material")
//            .create();
//    }
//
//    @Test
//    void createProduct_WhenValidInput_ShouldSaveProduct() {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setName("Sample Product");
//        productDTO.setCategoryId(1L);
//        productDTO.setMaterialId(1L);
//
//        Category category = generateFakeCategory();
//        Material material = generateFakeMaterial();
//
//        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
//        when(materialRepository.findById(1L)).thenReturn(Optional.of(material));
//
//        Product product = new Product();
//        product.setName("Sample Product");
//        product.setCategory(category);
//        product.setMaterial(material);
//
//        when(productRepository.save(any(Product.class))).thenReturn(product);
//
//        ProductDTO createdProduct = productService.createProduct(productDTO);
//
//        assertEquals("Sample Product", createdProduct.getName());
//        assertEquals(category, createdProduct.getCategory());
//        assertEquals(material, createdProduct.getMaterial());
//        verify(productRepository, times(1)).save(any(Product.class));
//    }
//
//    @Test
//    void createProduct_WhenCategoryNotFound_ShouldThrowNotFoundException() {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setCategoryId(999L);
//
//        when(categoryRepository.findById(999L)).thenReturn(Optional.empty());
//
//        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
//            productService.createProduct(productDTO);
//        });
//
//        assertEquals("Không tìm thấy phân loại!", exception.getMessage());
//        verify(productRepository, times(0)).save(any(Product.class));
//    }
//
//    @Test
//    void createProduct_WhenMaterialNotFound_ShouldThrowNotFoundException() {
//        ProductDTO productDTO = new ProductDTO();
//        productDTO.setMaterialId(999L);
//
//        when(materialRepository.findById(999L)).thenReturn(Optional.empty());
//
//        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
//            productService.createProduct(productDTO);
//        });
//
//        assertEquals("Không tìm thấy nguyên liệu!", exception.getMessage());
//        verify(productRepository, times(0)).save(any(Product.class));
//    }
//}

    @Test
    void getProductById_WhenProductExists_ThenReturnProduct() {
        Product product = generateFakeProduct();
        when(productRepository.findById(1L)).thenReturn(java.util.Optional.of(product));

        ProductResponse result = productService.getProductById(1L);

        assertEquals(product.getName(), result.getName());
        assertEquals(product.getDescription(), result.getDescription());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void getProductById_WhenProductDoesNotExist_ThenThrowNotFoundException() {
        when(productRepository.findById(99L)).thenReturn(java.util.Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            productService.getProductById(99L);
        });

        assertEquals(Constants.Message.NOT_FOUND_PRODUCT, exception.getMessage());
    }

//    @Test
//    void addProduct_WhenValidRequestProvided_ThenSaveProduct() {
//        ProductDTO request = generateFakeProductDTO();
//        Product product = generateFakeProduct();
//
//        when(productRepository.save(product)).thenReturn(product);
//
//        ProductDTO result = productService.createProduct(request);
//
//        assertEquals(request.getName(), result.getName());
//        assertEquals(request.getPrice(), result.getPrice());
//        verify(productRepository, times(1)).save(product);
//    }

//    @Test
//    void deleteProduct_WhenProductExists_ThenDeleteProduct() {
//        Product product = generateFakeProduct();
//        when(productRepository.findById(1L)).thenReturn(java.util.Optional.of(product));
//
//        productService.deleteProduct(1L);
//
//        verify(productRepository, times(1)).delete(product);
//    }

//    @Test
//    void deleteProduct_WhenProductExists_ShouldMarkAsInactive() {
//        Long productId = 1L;
//        Product product = generateFakeProduct();
//        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
//
//        boolean result = productService.deleteProduct(productId);
//
//        assertTrue(result);
//        assertEquals(EProductStatus.INACTIVE, product.getStatus());
//        verify(productRepository, times(1)).save(product);
//    }
}
