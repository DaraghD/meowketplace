package com.example.meowketplace.service;

import com.example.meowketplace.dto.UpdateProduct;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private  ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public void addProduct(Product product){
        productRepository.save(product);
    }

    public void modifyProduct(Long productId, UpdateProduct newProduct) throws Exception {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null){
            throw new Exception("Product not found");
        }

       // existingProduct.setProductText(newProduct.getProductText());
        //existingProduct.setPrices(newProduct.getPrices());

    }

}
