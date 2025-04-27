package com.example.meowketplace.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.meowketplace.dto.ReportRequest;
import com.example.meowketplace.dto.ReportUpdate;
import com.example.meowketplace.model.Report;
import com.example.meowketplace.model.ReportStatus;
import com.example.meowketplace.model.ReportType;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ReportRepository;

@Service
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserService userService;
    private final ReviewService reviewService;
    private final ProductService productService;

    public ReportService(ReportRepository reportRepository, ReviewService reviewService, UserService userService,
            ProductService productService) {
        this.reportRepository = reportRepository;
        this.productService = productService;
        this.userService = userService;
        this.reviewService = reviewService;
    }

    public void addReport(ReportRequest r, User user) throws Exception {
        if (r.getReportReason().equals(""))
            throw new Exception("Reports must have a reason");

        // check if user already reported this
        Optional<List<Report>> user_reports = reportRepository.findAllByUserId(user.getId());
        if (user_reports.isPresent()) {
            var reports = user_reports.get();
            for (Report report : reports) {
                if (report.getReportType() == getReportTypeFromString(r.getReportType())
                        && report.getReportTypeId() == r.getReportTypeId()) {
                    throw new Exception("Already reported this " + r.getReportType().toLowerCase());
                }
            }
        }

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
            default:
                throw new Exception("Unsupported Report Type");
        }
    }

    private ReportStatus getReportStatusFromString(String reportTypeString) throws Exception {
        if (reportTypeString == null) {
            throw new Exception("reportType required");
        }

        switch (reportTypeString.toUpperCase()) {
            case "PENDING":
                return ReportStatus.PENDING;
            case "RESOLVED":
                return ReportStatus.RESOLVED;
            case "DENIED":
                return ReportStatus.DENIED;
            default:
                throw new Exception("Unsupported Report Status");
        }
    }

    public List<Report> findByUserId(Long id) {
        return reportRepository.findAllByUserId(id).get();
    }

    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    public void updateReport(ReportUpdate report_update, User user) throws Exception {// user doing the update
        Report report = reportRepository.findById(report_update.getId()).get();
        report.setReportStatus(getReportStatusFromString(report_update.getReportStatus()));

        if (report.getReportStatus() != ReportStatus.PENDING) {
            switch (report.getReportType()) {
                case ReportType.REVIEW:
                    reviewService.deleteReview(user, reviewService.getReviewById(report.getReportTypeId()));
                case ReportType.USER:
                    userService.deleteUser(report.getReportTypeId());
                case ReportType.PRODUCT:
                    productService.deleteProduct(user, productService.getProductById(report.getReportTypeId()));
            }
        }
        reportRepository.save(report);
    }
}
