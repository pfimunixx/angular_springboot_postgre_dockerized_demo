package tech.getarrays.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.exception.UserNotFoundException;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.service.UserService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserResource {
    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/find/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email){
        User user = userService.findUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("find/user-code/{userCode}")
    public ResponseEntity<User> getUserByUserCode(@PathVariable("userCode") String userCode) {
        User user = userService.findUserByUserCode(userCode);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User updateUser = userService.updateUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<User> login(@RequestParam("email") String email, @RequestParam("password") String password) {
        try {
            User user = userService.findUserByEmailAndPassword(email, password);
            if(user.getActivated())
                return ResponseEntity.ok().body(user);
            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/send-password-restore")
    public ResponseEntity<?> sendPasswordRestore(@RequestBody String toEmail) throws IOException, MessagingException {
        userService.sendPasswordRestore(toEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send-activate-account")
    public ResponseEntity<?> sendActivateAccount(@RequestBody String toEmail) throws IOException, MessagingException {
        userService.sendActivateAccount(toEmail);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}