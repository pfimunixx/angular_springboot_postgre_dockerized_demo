package tech.getarrays.backend.resource;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tech.getarrays.backend.UserResource;
import tech.getarrays.backend.exception.UserNotFoundException;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.service.UserService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class UserResourceTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserResource userResource;


    private User user;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);

        user = new User();
        user.setUserCode("12345678");
        user.setActivated(true);
        user.setId(1);
        user.setEmail("a@a.com");
        user.setPassword("1234");
        user.setSelectedProfileId(new Long(1));
    }
    @Test
    public void shouldGetAllUsers() {
        List<User> expectedUsers = new ArrayList<User>();
        expectedUsers.add(user);
        when(userService.findAllUsers()).thenReturn(expectedUsers);
        ResponseEntity<List<User>> response = userResource.getAllUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedUsers, response.getBody());
    }
    @Test
    public void shouldGetUserById() {
        when(userService.findUserById(1L)).thenReturn(user);
        ResponseEntity response = userResource.getUserById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldGetUserByEmail() {
        when(userService.findUserByEmail("a@a.com")).thenReturn(user);
        ResponseEntity response = userResource.getUserByEmail("a@a.com");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldGetUserByUserCode() {
        when(userService.findUserByUserCode("12345678")).thenReturn(user);
        ResponseEntity response = userResource.getUserByUserCode("12345678");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldAddUser() {
        when(userService.addUser(user)).thenReturn(user);
        ResponseEntity response = userResource.addUser(user);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldUpdateUser() {
        when(userService.updateUser(user)).thenReturn(user);
        ResponseEntity response = userResource.updateUser(user);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldDeleteUser() {
        ResponseEntity response = userResource.deleteUser(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @Test
    public void shouldLogin() {
        when(userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword())).thenReturn(user);
        ResponseEntity response = userResource.login(user.getEmail(), user.getPassword());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }
    @Test
    public void shouldNotLogin() {
        user.setActivated(false);
        when(userService.findUserByEmailAndPassword(user.getEmail(),user.getPassword())).thenReturn(user);
        ResponseEntity response = userResource.login(user.getEmail(), user.getPassword());
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        when(userService.findUserByEmailAndPassword(user.getEmail(),user.getPassword())).thenThrow(new UserNotFoundException("User not found"));
        response = userResource.login(user.getEmail(), user.getPassword());
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
    @Test
    public void shouldSendPasswordRestore() throws MessagingException, IOException {
        ResponseEntity response = userResource.sendPasswordRestore(user.getEmail());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
    @Test
    public void shouldSendActivationAccount() throws MessagingException, IOException {
        ResponseEntity response = userResource.sendActivateAccount(user.getEmail());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

}