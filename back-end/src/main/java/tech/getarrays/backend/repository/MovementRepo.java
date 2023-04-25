package tech.getarrays.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.Movement;

import java.util.List;
import java.util.Optional;

public interface MovementRepo extends JpaRepository<Movement, Long> {

    List<Movement> findByProfile_Id(Long profileId);
    Optional<Movement> findMovementById(Long id);
    void deleteMovementById(Long id);
}
