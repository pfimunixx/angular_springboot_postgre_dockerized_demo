package tech.getarrays.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.model.Movement;
import tech.getarrays.backend.service.MovementService;

import java.util.List;

@RestController
@RequestMapping("/movement")
@CrossOrigin

public class MovementResource {

    public final MovementService movementService;

    public MovementResource(MovementService movementService) { this.movementService = movementService; }

    @GetMapping("/{profileId}/all")
    public ResponseEntity<List<Movement>> getAllProfileMovements(@PathVariable("profileId") Long profileId) {
        List<Movement> movements = movementService.findAllProfileMovements(profileId);
        return new ResponseEntity<>(movements, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Movement> addMovement(@RequestBody Movement movement) {
        Movement newMovement = movementService.addMovement(movement);
        return new ResponseEntity<>(newMovement, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Movement> updateMovement(@RequestBody Movement movement) {
        Movement updateMovement = movementService.updateMovement(movement);
        return new ResponseEntity<>(updateMovement, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMovement(@PathVariable("id") Long id) {
        movementService.deleteMovement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
