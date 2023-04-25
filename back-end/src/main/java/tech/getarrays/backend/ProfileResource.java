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
    public ResponseEntity<List<Profile>> getAllUserProfiles(@PathVariable("user_id") Long user_id){
        List<Profile> profiles = profileService.findAllUserProfiles(user_id);
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable("id") Long id) {
        Profile profile = profileService.findProfileById(id);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PostMapping("/add")
    public  ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
        Profile newProfile = profileService.addProfile(profile);
        return new ResponseEntity<>(newProfile, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile){
        Profile updateProfile = profileService.updateProfile(profile);
        return new ResponseEntity<>(updateProfile, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfile(@PathVariable("id") Long id) {
        profileService.deleteProfile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
