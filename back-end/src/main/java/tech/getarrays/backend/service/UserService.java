package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.backend.exception.UserNotFoundException;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.UserRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user){
        user.setUserCode(UUID.randomUUID().toString());
        return userRepo.save(user);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findUserById(Long id){
        return userRepo.findUserById(id)
                .orElseThrow(()-> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public User findUserByEmail(String email){
        return userRepo.findUserByEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User by email " + email + " was not found"));
    }

    public void deleteUser(Long id){
        userRepo.deleteUserById(id);
    }


    public User findUserByEmailAndPassword(String email, String password) {
        return userRepo.findUserByEmailAndPassword(email, password)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " and password " + password + " was not found"));
    }

    public void sendConfirmationEmail(String toEmail){
        EmailSenderService ess = new EmailSenderService();
        ess.sendEmail("pfadarraga@gmail.com", "aaa","aaa");
    }

}
