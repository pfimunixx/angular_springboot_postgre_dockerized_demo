package tech.getarrays.backend;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.service.EmailSenderService;

@RestController
@RequestMapping("/system")
@CrossOrigin
public class SystemResource {

    private final EmailSenderService emailSenderService;

    public SystemResource(EmailSenderService emailSenderService) { this.emailSenderService = emailSenderService; }

    @PostMapping(path = "/send-email", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public void sendEmail(@RequestParam("toEmail") String toEmail, @RequestParam("subject") String subject, @RequestParam("body") String body) {
        emailSenderService.sendEmail(toEmail, subject, body);
    }
}
