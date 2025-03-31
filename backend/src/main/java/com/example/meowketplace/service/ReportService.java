package com.example.meowketplace.service;

import org.springframework.stereotype.Service;

import com.example.meowketplace.dto.ReportRequest;
import com.example.meowketplace.model.Report;
import com.example.meowketplace.model.ReportStatus;
import com.example.meowketplace.model.ReportType;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.ReportRepository;
import com.example.meowketplace.repository.ReviewRepository;
import com.example.meowketplace.repository.UserRepository;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository, ProductRepository productRepository,
            UserRepository userRepository,
            ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
        this.reportRepository = reportRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public void addReport(ReportRequest r, User user) throws Exception {
        Report report = new Report();
        report.setUser(user);

        report.setReportType(getReportTypeFromString(r.getReportType()));
        report.setReportReason(r.getReportReason());
        report.setReportTypeId(r.getReportTypeId());
        report.setReportStatus(ReportStatus.PENDING);

        reportRepository.save(report);
    }

    private ReportType getReportTypeFromString(String reportTypeString) throws Exception {
        if (reportTypeString == null) {
            throw new Exception("reportType required");
        }

        switch (reportTypeString.toUpperCase()) {
            case "PRODUCT":
                return ReportType.PRODUCT;
            case "USER":
                return ReportType.USER;
            case "REVIEW":
                return ReportType.REVIEW;
            case "MESSAGE":
                return ReportType.MESSAGE;
            default:
                throw new Exception("Unsupported Report Type");
        }
    }
}
