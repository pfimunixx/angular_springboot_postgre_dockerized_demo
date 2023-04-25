package tech.getarrays.backend.model;

import javax.persistence.*;
import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "\"user\"")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, insertable = false)
    @Getter @Setter
    private long id;

    @Column(nullable = false, unique = true)
    @Getter @Setter
    private String email;

    @Column(nullable = false)
    @Getter @Setter
    private String password;

    @Column(nullable = false)
    @Getter @Setter
    private String userCode;

    @Getter @Setter
    private Long selectedProfileId;

    public User(){}

    public User(String email, String password, String userCode){
        this.email = email;
        this.password = password;
        this.userCode = userCode;
    }
}
