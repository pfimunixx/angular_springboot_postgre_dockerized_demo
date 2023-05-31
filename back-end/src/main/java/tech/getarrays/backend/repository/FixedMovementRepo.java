package tech.getarrays.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.FixedMovement;
import tech.getarrays.backend.model.Movement;

import java.util.List;
import java.util.Optional;

public interface FixedMovementRepo extends JpaRepository<FixedMovement, Long> {
    List<FixedMovement> findByProfileId(Long profileId);
    Optional<FixedMovement> findFixedMovementById(Long id);
    void deleteFixedMovementById(Long id);
}
