package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.UserRepo;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Configuration
public class HtmlTemplateGetterService {
    
    private final UserRepo userRepo;

    public HtmlTemplateGetterService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public String getHtmlFromTemplatesForUser(String toEmail, String whichOne) throws IOException {
        Optional<User> userOptional = userRepo.findUserByEmail(toEmail);
        User user = userOptional.get();
        String userCode = user.getUserCode();
        Map<String, String> placeholders = new HashMap<>();
        placeholders.put("userCode", userCode);
        placeholders.put("email", toEmail);
        String whereToLook = "templates/htmlemail/"+whichOne;
        String htmlBody = loadResource(whereToLook);
        htmlBody = substitutePlaceholders(htmlBody, placeholders);
        return htmlBody;
    }

    private String loadResource(String resourcePath) throws IOException {
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

    private String substitutePlaceholders(String html, Map<String, String> placeholders) {
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            String placeholder = "\\{\\{" + entry.getKey() + "\\}\\}";
            html = html.replaceAll(placeholder, entry.getValue());
        }
        return html;
    }
}
