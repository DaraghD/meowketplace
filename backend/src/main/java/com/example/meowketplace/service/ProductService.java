package com.example.meowketplace.service;

import com.example.meowketplace.dto.AddProductRequest;
import com.example.meowketplace.dto.GetProductsResponse;
import com.example.meowketplace.dto.UpdateProduct;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<GetProductsResponse> getAllProducts() {
        var x = productRepository.findAll();
        List<GetProductsResponse> resp = new ArrayList<>();
        for (var y : x) {
            resp.add(new GetProductsResponse(y));
        }
        return resp;
    }

    public void addProduct(AddProductRequest product, User user, List<MultipartFile> images)
            throws JsonProcessingException {
        // if(!user.isIs_business()){ TODO uncomment this after testing
        // throw new IllegalArgumentException("User is not a business");
        // }
        Product newProduct = new Product(product, user);
        productRepository.save(newProduct);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(newProduct));
        newProduct.setImageCount(images.size());

        // save images
        String uploadDir = "uploads/product_images/" + newProduct.getId();
        for (int i = 0; i < images.size(); i++) {
            try {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                try (InputStream inputStream = images.get(i).getInputStream()) {
                    Path filePath = uploadPath.resolve(Integer.toString(i));
                    System.out.println("Uploading to " + filePath);
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new Exception("Could not save image");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        productRepository.save(newProduct);
    }

    public void modifyProduct(Long productId, UpdateProduct newProduct) throws Exception {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null) {
            throw new Exception("Product not found");
        }
        // TODO: updating product logic

    }

    // TODO: this dto may have to be a bit different/ more detailed or the other one
    // less detailed for the preview
    public GetProductsResponse getProductById(Long id) {
        return (new GetProductsResponse(productRepository.findById(id).get()));
    }

}
