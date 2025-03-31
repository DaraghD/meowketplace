package com.example.meowketplace.repository;

import com.example.meowketplace.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<List<Report>> findAllByUserId(Long userId);
}
