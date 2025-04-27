package com.example.meowketplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meowketplace.component.JwtUtil;
import com.example.meowketplace.dto.DeleteReviewRequest;
import com.example.meowketplace.dto.ReportRequest;
import com.example.meowketplace.dto.ReportUpdate;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Report;
import com.example.meowketplace.model.Review;
import com.example.meowketplace.model.User;
import com.example.meowketplace.service.ProductService;
import com.example.meowketplace.service.ReportService;
import com.example.meowketplace.service.ReviewService;
import com.example.meowketplace.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final ReviewService reviewService;
    private final ProductService productService;
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService, ProductService productService, ReviewService reviewService,
            UserService userService,
            JwtUtil jwtUtil) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.productService = productService;
        this.jwtUtil = jwtUtil;
        this.reportService = reportService;
    }

    @GetMapping
    public ResponseEntity<String> getReports(@RequestHeader("Authorization") String authHeader) {
        try {
            User user = userService.getUserById(jwtUtil.authAndGetUserId(authHeader));
            List<Report> reports = new ArrayList<Report>();
            if (user.isIs_admin())
                reports = reportService.findAll();
            else
                reports = reportService.findByUserId(user.getId());

            ObjectMapper mapper = new ObjectMapper();
            return ResponseEntity.status(HttpStatus.OK).body(mapper.writeValueAsString(reports));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> addReport(@RequestBody ReportRequest report_req,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = userService.getUserById(jwtUtil.authAndGetUserId(authHeader));
            reportService.addReport(report_req, user);

            return ResponseEntity.status(HttpStatus.OK).body("Report successfully made");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> updateReport(@RequestBody ReportUpdate report_update,
            @RequestHeader("Authorization") String authHeader) {
        try {
            User user = userService.getUserById(jwtUtil.authAndGetUserId(authHeader));
            if (!user.isIs_admin())
                throw new Exception("Only admins can update reports");

            reportService.updateReport(report_update, user);

            return ResponseEntity.status(HttpStatus.OK).body("Report updated");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
