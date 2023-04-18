package tech.getarrays.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.service.ProfileService;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin

public class ProfileResource {

    private final ProfileService profileService;

    public ProfileResource(ProfileService profileService) {
        this.profileService = profileService;
    }


    @GetMapping("/{user_id}/all")
    public ResponseEntity<List<Profile>> getAllUsers(@PathVariable("user_id") Long user_id){
        List<Profile> profiles = profileService.findAllUserProfiles(user_id);
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }
}
