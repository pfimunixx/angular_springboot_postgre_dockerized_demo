package tech.getarrays.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.SpendingExpectation;

import java.util.List;
import java.util.Optional;

public interface SpendingExpectationRepo extends JpaRepository<SpendingExpectation, Long> {

    List<SpendingExpectation> findByProfileId(Long profileId);
    Optional<SpendingExpectation> findSpendingExpectationById(Long id);
    void deleteSpendingExpectationById(Long id);
}
