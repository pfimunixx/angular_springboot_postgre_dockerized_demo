package tech.getarrays.backend.model;

import javax.persistence.*;
import java.io.Serializable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "\"user\"")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    @Getter @Setter
    private long id;

    @Column(nullable = false)
    @Getter @Setter
    private String email;

    @Column(nullable = false)
    @Getter @Setter
    private String password;

    @Column(nullable = false)
    @Getter @Setter
    private String userCode;

    public User(){}

    public User(String email, String password, String userCode){
        this.email = email;
        this.password = password;
        this.userCode = userCode;
    }
}
