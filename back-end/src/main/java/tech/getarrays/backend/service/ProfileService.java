package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.backend.model.Profile;
import tech.getarrays.backend.repository.ProfileRepo;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProfileService {

    private final ProfileRepo profileRepo;

    @Autowired
    public ProfileService(ProfileRepo profileRepo) { this.profileRepo = profileRepo; }

    public List<Profile> findAllUserProfiles(Long userId){
        return profileRepo.findByUser_Id(userId);
    }
}
