package tech.getarrays.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.Profile;
import java.util.List;
import java.util.Optional;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    List<Profile> findByUser_Id(Long userId);
    Optional<Profile> findProfileById(Long id);
    void deleteProfileById(Long id);
}
