package tech.getarrays.backend.service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class ResourcePathFinder {

    private final ResourceLoader resourceLoader;

    public ResourcePathFinder(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public String getResourcePath(String resource) throws IOException {
        Resource res = resourceLoader.getResource(resource);
        File file = res.getFile();
        return file.getAbsolutePath();
    }
}