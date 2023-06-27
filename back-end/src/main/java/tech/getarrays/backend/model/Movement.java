package tech.getarrays.backend.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "\"movement\"")
public class Movement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false)
    @Getter @Setter
    private long id;

    @Column(nullable = false)
    @Getter @Setter
    private String concept;

    @Column(nullable = false)
    @Getter @Setter
    private String description;

    @Column(nullable = false)
    @Getter @Setter
    private BigDecimal amount;

    @Column(nullable = false)
    @Getter @Setter
    private Date date;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    @Getter @Setter
    private Profile profile;

    public Movement(){}

    public Movement(String concept, String description, BigDecimal amount) {
        this.concept = concept;
        this.description = description;
        this.amount = amount;
    }
}
