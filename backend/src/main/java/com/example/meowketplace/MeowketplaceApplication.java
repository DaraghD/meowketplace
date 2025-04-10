package com.example.meowketplace;

import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Tier;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MeowketplaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MeowketplaceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository, ProductRepository productRepository,
            TierRepository tierRepository) {
        return (args) -> {
            // for testing
            // User user1 = userRepository.findById(2L).get();
            /*
              User user1 = new User();
              user1.setUsername("user1");
              user1.setPassword("password1");
              user1.setEmail("test@test.com");
              userRepository.save(user1);

              Tier tier1 = new Tier();
              tier1.setPrice(99);
              tier1.setName("Tier 1: Basic");
              Product product1 = new Product();
              product1.setProductText("Product 1 description");
              product1.setUser(user1);
              product1.setName("Product 1");
              productRepository.save(product1);
              tier1.setProduct(product1);
              tierRepository.save(tier1);

              Tier tier2 = new Tier();
              tier2.setPrice(199);
              tier2.setName("Tier 2: Premium");
              tier2.setProduct(product1);
              tierRepository.save(tier2);

              User user2 = new User();
              user2.setUsername("user2");
              user2.setPassword("password2");
              user2.setEmail("test@test2.com");
              userRepository.save(user2);

              Product product2 = new Product();
              product2.setProductText("Product 2 description");
              product2.setUser(user2);
              product2.setName("Product 2");
              productRepository.save(product2);

              Tier tier3 = new Tier();
              tier3.setPrice(299);
              tier3.setName("Tier 3: Basic");
              tier3.setProduct(product2);
              tierRepository.save(tier3);

              Tier tier4 = new Tier();
              tier4.setPrice(399);
              tier4.setName("Tier 4: Premium");
              tier4.setProduct(product2);
              tierRepository.save(tier4);
              */

        };
    }
}
