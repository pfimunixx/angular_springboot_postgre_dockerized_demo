package tech.getarrays.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.Profile;
import java.util.List;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    List<Profile> findByUser_Id(Long userId);
}
