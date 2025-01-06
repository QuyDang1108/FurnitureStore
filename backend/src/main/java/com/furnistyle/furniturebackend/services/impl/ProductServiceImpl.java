package com.furnistyle.furniturebackend.services.impl;

import com.furnistyle.furniturebackend.dtos.bases.ProductDTO;
import com.furnistyle.furniturebackend.dtos.responses.ProductResponse;
import com.furnistyle.furniturebackend.enums.EProductStatus;
import com.furnistyle.furniturebackend.exceptions.NotFoundException;
import com.furnistyle.furniturebackend.mappers.ProductMapper;
import com.furnistyle.furniturebackend.mappers.ProductResponseMapper;
import com.furnistyle.furniturebackend.models.Product;
import com.furnistyle.furniturebackend.repositories.CategoryRepository;
import com.furnistyle.furniturebackend.repositories.MaterialRepository;
import com.furnistyle.furniturebackend.repositories.ProductRepository;
import com.furnistyle.furniturebackend.services.ProductService;
import com.furnistyle.furniturebackend.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final MaterialRepository materialRepository;
    private final ProductMapper productMapper;
    private final ProductResponseMapper productResponseMapper;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        if (!categoryRepository.existsById(productDTO.getCategoryId())) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_CATEGORY);
        }
        if (!materialRepository.existsById(productDTO.getMaterialId())) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_MATERIAL);
        }
        productRepository.save(productMapper.toEntity(productDTO));
        return productDTO;
    }

    @Override
    public ProductResponse getProductById(long id) {
        Product existingProduct = productRepository
            .findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.Message.NOT_FOUND_PRODUCT));
        return productResponseMapper.toDTO(existingProduct);
    }

    @Override
    public Page<ProductResponse> getAllProducts(String keyword, Long categoryId, Long materialId, PageRequest pageRequest) {
        Page<Product> productPage;
        productPage = productRepository.searchProducts(keyword, categoryId, materialId, pageRequest);
        return productPage.map(productResponseMapper::toDTO);
    }

    @Override
    public ProductDTO updateProduct(ProductDTO productDTO) {
        if (!productRepository.existsById(productDTO.getId())) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_PRODUCT);
        }

        if (!categoryRepository.existsById(productDTO.getCategoryId())) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_CATEGORY);
        }

        if (!materialRepository.existsById(productDTO.getMaterialId())) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_MATERIAL);
        }

        productRepository.save(productMapper.toEntity(productDTO));
        return productDTO;
    }

    @Override
    public boolean deleteProduct(long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.Message.NOT_FOUND_PRODUCT));
        product.setStatus(EProductStatus.INACTIVE);
        productRepository.save(product);
        return true;
    }
}
