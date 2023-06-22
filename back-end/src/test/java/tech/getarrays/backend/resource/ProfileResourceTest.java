package tech.getarrays.backend.resource;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tech.getarrays.backend.ProfileResource;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.service.ProfileService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProfileResourceTest {

    @Mock
    private ProfileService profileService;

    @InjectMocks
    private ProfileResource profileResource;

    private Profile profile;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        profile = new Profile();
        profile.setId(1L);
        profile.setName("Profile01");
        profile.setUser(new User());
    }

    @Test
    void shouldGetAllUserProfiles() {
        List<Profile> expectedProfiles = new ArrayList<Profile>();
        expectedProfiles.add(profile);
        when(profileService.findAllUserProfiles(1L)).thenReturn(expectedProfiles);
        ResponseEntity response = profileResource.getAllUserProfiles(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedProfiles, response.getBody());
    }
    @Test
    void shouldGetProfileById() {
        when(profileService.findProfileById(1L)).thenReturn(profile);
        ResponseEntity response = profileResource.getProfileById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(profile, response.getBody());
    }

    @Test
    void shouldAddProfile() {
        when(profileService.addProfile(profile)).thenReturn(profile);
        ResponseEntity response = profileResource.addProfile(profile);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(profile, response.getBody());
    }

    @Test
    void shouldUpdateProfile() {
        when(profileService.updateProfile(profile)).thenReturn(profile);
        ResponseEntity response = profileResource.updateProfile(profile);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(profile, response.getBody());
    }

    @Test
    void shouldDeleteProfile() {
        ResponseEntity response = profileResource.deleteProfile(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(profileService).deleteProfile(1L);
    }
}