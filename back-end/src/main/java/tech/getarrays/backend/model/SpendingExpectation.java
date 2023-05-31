package tech.getarrays.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "\"spending_expectation\"")
public class SpendingExpectation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false)
    @Getter
    @Setter
    private long id;

    @Column(nullable = false)
    @Getter @Setter
    private String concept;

    @Column(nullable = false)
    @Getter @Setter
    private BigDecimal amount;

    @Column(nullable = false)
    @Getter @Setter
    private String amount_type;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    @Getter @Setter
    private Profile profile;

    public SpendingExpectation(){}

    public SpendingExpectation(String concept, BigDecimal amount, String amount_type) {
        this.concept = concept;
        this.amount = amount;
        this.amount_type = amount_type;
    }
}
