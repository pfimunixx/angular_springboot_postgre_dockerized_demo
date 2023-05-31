package tech.getarrays.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.backend.exception.FixedMovementNotFoundException;
import tech.getarrays.backend.model.FixedMovement;
import tech.getarrays.backend.repository.FixedMovementRepo;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FixedMovementService {

    private final FixedMovementRepo fixedMovementRepo;

    @Autowired
    public FixedMovementService(FixedMovementRepo fixedMovementRepo) { this.fixedMovementRepo = fixedMovementRepo; }

    public FixedMovement addFixedMovement(FixedMovement fixedMovement) {return fixedMovementRepo.save(fixedMovement); }

    public List<FixedMovement> findAllProfileFixedMovements(Long profileId) { return fixedMovementRepo.findByProfileId(profileId); }

    public FixedMovement findFixedMovementById(Long id) {
        return fixedMovementRepo.findFixedMovementById(id)
                .orElseThrow(()-> new FixedMovementNotFoundException("Movement by id" + id + "was not found"));
    }

    public FixedMovement updateFixedMovement(FixedMovement fixedMovement) { return fixedMovementRepo.save(fixedMovement); }

    public void deleteFixedMovement(Long id) { fixedMovementRepo.deleteFixedMovementById(id); }
}
