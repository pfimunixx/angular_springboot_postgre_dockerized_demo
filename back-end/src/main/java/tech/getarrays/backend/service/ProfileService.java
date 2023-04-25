package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.backend.exception.ProfileNotFoundException;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.repository.ProfileRepo;
import tech.getarrays.backend.repository.UserRepo;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProfileService {

    private final ProfileRepo profileRepo;

    @Autowired
    public ProfileService(ProfileRepo profileRepo) { this.profileRepo = profileRepo;}

    public Profile addProfile(Profile profile) {
        return profileRepo.save(profile);
    }

    public List<Profile> findAllUserProfiles(Long userId){
        return profileRepo.findByUser_Id(userId);
    }

    public Profile findProfileById(Long id){
        return profileRepo.findProfileById(id)
                .orElseThrow(()-> new ProfileNotFoundException("Profile by id" + id + "was not found"));
    }

    public Profile updateProfile(Profile profile){
        return profileRepo.save(profile);
    }

    public void deleteProfile(Long id) {
        profileRepo.deleteProfileById(id);
    }
}
