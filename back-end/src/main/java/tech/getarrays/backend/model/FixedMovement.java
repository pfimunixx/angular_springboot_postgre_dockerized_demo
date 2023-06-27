package tech.getarrays.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "\"fixed_movement\"")
public class FixedMovement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false)
    @Getter @Setter
    private long id;

    @Column(nullable = false)
    @Getter @Setter
    private String concept;

    @Column(nullable = true)
    @Getter @Setter
    private String description;

    @Column(nullable = false)
    @Getter @Setter
    private BigDecimal amount;

    @Column(nullable = false)
    @Getter @Setter
    private Date startDate;

    @Column(nullable = true)
    @Getter @Setter
    private Date endDate;

    @Column(nullable = false)
    @Getter @Setter
    private String amountType;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    @Getter @Setter
    private Profile profile;

    public FixedMovement(){}

    public FixedMovement(String concept, String description, BigDecimal amount, Date endDate, String amountType){
        this.concept = concept;
        this.description = description;
        this.amount = amount;
        this.endDate = endDate;
        this.amountType = amountType;
    }
}
