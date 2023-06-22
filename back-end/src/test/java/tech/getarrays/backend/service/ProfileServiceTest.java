package tech.getarrays.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.model.User;
import tech.getarrays.backend.repository.ProfileRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProfileServiceTest {

    @Mock
    private ProfileRepo profileRepo;

    @InjectMocks
    private ProfileService profileService;

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
    public void shouldAddProfile() {
        when(profileRepo.save(profile)).thenReturn(profile);
        assertEquals(profileService.addProfile(profile), profile);
    }
    @Test
    public void shouldFindAllUserProfiles() {
        List<Profile> expectedProfiles = new ArrayList<Profile>();
        expectedProfiles.add(profile);
        when(profileRepo.findByUser_Id(1L)).thenReturn(expectedProfiles);
        assertEquals(expectedProfiles, profileService.findAllUserProfiles(1L));
    }
    @Test
    public void shouldFindProfileById() {
        when(profileRepo.findProfileById(1L)).thenReturn(Optional.ofNullable(profile));
        assertEquals(profile, profileService.findProfileById(1L));
    }
    @Test
    public void shouldUpdateProfile() {
        when(profileRepo.save(profile)).thenReturn(profile);
        assertEquals(profile, profileService.updateProfile(profile));
    }
    @Test
    public void shouldDeleteProfile() {
        profileService.deleteProfile(1L);
        verify(profileRepo).deleteProfileById(1L);
    }

}