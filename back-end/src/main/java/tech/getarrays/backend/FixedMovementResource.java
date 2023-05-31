package tech.getarrays.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.model.FixedMovement;
import tech.getarrays.backend.service.FixedMovementService;

import java.util.List;

@RestController
@RequestMapping("/fixed-movement")
@CrossOrigin
public class FixedMovementResource {

    public final FixedMovementService fixedMovementService;

    public FixedMovementResource(FixedMovementService fixedMovementService) { this.fixedMovementService = fixedMovementService; }

    @GetMapping("/{profileId}/all")
    public ResponseEntity<List<FixedMovement>> getAllProfileFixedMovements(@PathVariable("profileId") Long profileId) {
        List<FixedMovement> fixedMovements = fixedMovementService.findAllProfileFixedMovements(profileId);
        return new ResponseEntity<>(fixedMovements, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<FixedMovement> addFixedMovement(@RequestBody FixedMovement fixedMovement) {
        FixedMovement newFixedMovement = fixedMovementService.addFixedMovement(fixedMovement);
        return new ResponseEntity<>(fixedMovement, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public  ResponseEntity<FixedMovement> updateFixedMovement(@RequestBody FixedMovement fixedMovement) {
        FixedMovement updateFixedMovement = fixedMovementService.updateFixedMovement(fixedMovement);
        return new ResponseEntity<>(updateFixedMovement, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteFixedMovement(@PathVariable("id") Long id) {
        fixedMovementService.deleteFixedMovement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
