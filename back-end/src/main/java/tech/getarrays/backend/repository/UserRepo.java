package tech.getarrays.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.model.User;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    void deleteUserById(Long id);
    Optional<User> findUserById(Long id);
    Optional<User>  findUserByEmail(String email);
    Optional<User> findUserByEmailAndPassword(String email, String password);
    Optional<User> findUserByUserCode(String userCode);
}