package tech.getarrays.backend.service;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import tech.getarrays.backend.exception.UserNotFoundException;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.UserRepo;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;
    private final EmailSenderService emailSenderService;
    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Autowired
    private Environment env;

    @Autowired
    public UserService(UserRepo userRepo, EmailSenderService emailSenderService) {
        this.userRepo = userRepo;
        this.emailSenderService = emailSenderService;

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
        String htmlBody = getHtmlFromTemplatesForUser(toEmail, "passwordRestore.html");
        emailSenderService.sendEmail(toEmail, "Password Restore", htmlBody, true);
    }

    public void sendActivateAccount(String toEmail) throws IOException, MessagingException {
        String htmlBody = getHtmlFromTemplatesForUser(toEmail, "activateAccount.html");
        emailSenderService.sendEmail(toEmail, "Activate your account", htmlBody, true);
    }

    private String getHtmlFromTemplatesForUser(String toEmail, String whichone) throws IOException{
        User user = findUserByEmail(toEmail);
        String userCode = user.getUserCode();
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("userCode", userCode);
        placeholders.put("email", toEmail);
        String whereToLook = "templates/htmlemail/"+whichone;
        String htmlBody = loadResourceFromJar(whereToLook);
        htmlBody = substitutePlaceholders(htmlBody, placeholders);
        return htmlBody;
    }

    private String loadResourceFromJar(String resourcePath) throws IOException {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
            if (inputStream == null) {
                throw new FileNotFoundException("Resource not found: " + resourcePath);
            }
            ByteArrayOutputStream result = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                result.write(buffer, 0, length);
            }
            return result.toString(StandardCharsets.UTF_8.name());
        }
    }

    private String loadResource(String resourcePath) throws IOException {
        return new String(Files.readAllBytes(Paths.get(resourcePath)), StandardCharsets.UTF_8);
    }

    private String substitutePlaceholders(String html, Map<String, String> placeholders) {
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            String placeholder = "\\{\\{" + entry.getKey() + "\\}\\}";
            html = html.replaceAll(placeholder, entry.getValue());
        }
        return html;
    }
}
