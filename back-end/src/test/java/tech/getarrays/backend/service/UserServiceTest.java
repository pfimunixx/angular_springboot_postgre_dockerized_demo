package tech.getarrays.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.UserRepo;

import jakarta.mail.MessagingException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepo userRepo;
    @Mock
    private HtmlTemplateGetterService htmlTemplateGetterService;
    @Mock
    private EmailSenderService emailSenderService;

    @InjectMocks
    private UserService userService;


    private User user;


    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);

        user = new User();
        user.setUserCode("12345678");
        user.setActivated(false);
        user.setId(1);
        user.setEmail("a@a.com");
        user.setPassword("1234");
        user.setSelectedProfileId(new Long(1));
    }

    @Test
    void shouldAddUser() {
        when(userRepo.save(user)).thenReturn(user);
        assertNotNull(userService.addUser(user));
    }
    @Test
    void shouldFindAllUsers() {
        when(userRepo.findAll()).thenReturn(Arrays.asList(user));
        assertNotNull(userService.findAllUsers());
    }

    @Test
    void  shouldUpdateUser() {
        when(userRepo.save(user)).thenReturn(user);
        assertNotNull(userService.updateUser(user));
    }

    @Test
    void shouldFindUserById() {
        when(userRepo.findUserById(new Long(1))).thenReturn(Optional.ofNullable(user));
        assertNotNull(userService.findUserById(new Long(1)));
    }

    @Test
    void shouldFindUserByEmail() {
        when(userRepo.findUserByEmail("a@a.com")).thenReturn(Optional.ofNullable(user));
        assertNotNull(userService.findUserByEmail("a@a.com"));
    }

    @Test
    void shouldDeleteUser() {
        Long userId = 1L;
        userService.deleteUser(userId);
        verify(userRepo).deleteUserById(userId);
    }

    @Test
    void shouldFindUserByEmailAndPassword() {
        when(userRepo.findUserByEmailAndPassword(user.getEmail(), user.getPassword())).thenReturn(Optional.ofNullable(user));
        assertNotNull(userService.findUserByEmailAndPassword(user.getEmail(), user.getPassword()));
    }

    @Test
    void shouldFindUserByUserCode() {
        when(userRepo.findUserByUserCode(user.getUserCode())).thenReturn(Optional.ofNullable(user));
        assertNotNull(userService.findUserByUserCode(user.getUserCode()));
    }

    @Test
    void shouldSendPasswordRestore() throws IOException, MessagingException {
        String expectedHtmlBody = "<html><body>Password restore email</body></html>";
        when(htmlTemplateGetterService.getHtmlFromTemplatesForUser(user.getEmail(), "passwordRestore.html"))
                .thenReturn(expectedHtmlBody);
        userService.sendPasswordRestore(user.getEmail());
        verify(emailSenderService).sendEmail(user.getEmail(),"Password Restore", expectedHtmlBody, true);
    }

    @Test
    void shouldSendActivationAccount() throws IOException, MessagingException {
        String expectedHtmlBody = "<html><body>Password restore email</body></html>";
        when(htmlTemplateGetterService.getHtmlFromTemplatesForUser(user.getEmail(), "activateAccount.html"))
                .thenReturn(expectedHtmlBody);
        userService.sendActivateAccount(user.getEmail());
        verify(emailSenderService).sendEmail(user.getEmail(),"Activate your account", expectedHtmlBody, true);
    }

}