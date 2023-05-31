package tech.getarrays.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.backend.model.SpendingExpectation;
import tech.getarrays.backend.service.SpendingExpectationService;

import java.util.List;

@RestController
@RequestMapping("/spending-expectation")
@CrossOrigin
public class SpendingExpectationResource {

    public final SpendingExpectationService spendingExpectationService;
    public SpendingExpectationResource(SpendingExpectationService spendingExpectationService) { this.spendingExpectationService = spendingExpectationService; }
    @GetMapping("/{profileId}/all")
    public ResponseEntity<List<SpendingExpectation>> getAllProfileSpendingExpectations(@PathVariable("profileId") Long profileId) {
        List<SpendingExpectation> spendingExpectations = spendingExpectationService.findAllProfileSpendingExpectations(profileId);
        return new ResponseEntity<>(spendingExpectations, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<SpendingExpectation> addSpendingExpectation(@RequestBody SpendingExpectation spendingExpectation) {
        SpendingExpectation newSpendingExpectation = spendingExpectationService.addSpendingExpectation(spendingExpectation);
        return new ResponseEntity<>(newSpendingExpectation, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<SpendingExpectation> updateSpendingExpectation(@RequestBody SpendingExpectation spendingExpectation) {
        SpendingExpectation updateSpendingExpectation = spendingExpectationService.updateSpendingExpectation(spendingExpectation);
        return new ResponseEntity<>(updateSpendingExpectation, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSpendingExpectation(@PathVariable("id") Long id) {
        spendingExpectationService.deleteSpendingExpectation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
