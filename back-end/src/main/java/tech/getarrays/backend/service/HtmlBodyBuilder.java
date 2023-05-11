package tech.getarrays.backend.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class HtmlBodyBuilder {

    public HtmlBodyBuilder() {}

    public String buildHtmlBody(String filePath, Map<String, String> placeholders) throws IOException {
        String content = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            String placeholder = "\\{\\{" + entry.getKey() + "\\}\\}";
            content = content.replaceAll(placeholder, entry.getValue());
        }
        return content;
    }
}
