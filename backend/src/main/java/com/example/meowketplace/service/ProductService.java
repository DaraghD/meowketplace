package com.example.meowketplace.service;

import com.example.meowketplace.dto.AddProductRequest;
import com.example.meowketplace.dto.UpdateProduct;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public void addProduct(AddProductRequest product) throws JsonProcessingException {
        User user = userRepository.findById(product.getUserId()).get();
        Product newProduct = new Product(product,user);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(newProduct));
        productRepository.save(newProduct);
    }

    public void modifyProduct(Long productId, UpdateProduct newProduct) throws Exception {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null){
            throw new Exception("Product not found");
        }
        //TODO: updating product logic


    }

}
