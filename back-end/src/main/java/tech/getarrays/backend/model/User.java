package tech.getarrays.backend.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Getter @Setter
    private List<Profile> profiles = new ArrayList<>();

    public User(){}

    public User(String email, String password, String userCode){
        this.email = email;
        this.password = password;
        this.userCode = userCode;
    }

    public void addProfile(Profile profile){
        profile.setUser(this);
        this.profiles.add(profile);
    }
}
