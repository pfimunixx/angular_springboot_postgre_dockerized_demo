package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import tech.getarrays.backend.exception.UserNotFoundException;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.UserRepo;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;
    private final EmailSenderService emailSenderService;
    private final HtmlTemplateGetterService htmlTemplateGetterService;
    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Autowired
    private Environment env;

    @Autowired
    public UserService(UserRepo userRepo, EmailSenderService emailSenderService, HtmlTemplateGetterService htmlTemplateGetterService) {
        this.userRepo = userRepo;
        this.emailSenderService = emailSenderService;
        this.htmlTemplateGetterService = htmlTemplateGetterService;
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

    public User findUserByUserCode(String userCode) {
        return userRepo.findUserByUserCode(userCode)
                .orElseThrow(() -> new UserNotFoundException("User with userCode " + userCode + " not found"));
    }

    public void sendPasswordRestore(String toEmail) throws IOException, MessagingException {
        String htmlBody = htmlTemplateGetterService.getHtmlFromTemplatesForUser(toEmail, "passwordRestore.html");
        emailSenderService.sendEmail(toEmail, "Password Restore", htmlBody, true);
    }

    public void sendActivateAccount(String toEmail) throws IOException, MessagingException {
        String htmlBody = htmlTemplateGetterService.getHtmlFromTemplatesForUser(toEmail, "activateAccount.html");
        emailSenderService.sendEmail(toEmail, "Activate your account", htmlBody, true);
    }
}
