package tech.getarrays.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.backend.model.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    void deleteUserById(Long id);
    Optional<User> findUserById(Long id);
    Optional<User>  findUserByEmail(String email);
    Optional<User> findUserByEmailAndPassword(String email, String password);
}