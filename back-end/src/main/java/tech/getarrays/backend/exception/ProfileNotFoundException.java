package tech.getarrays.backend.exception;

public class ProfileNotFoundException extends RuntimeException{
    public ProfileNotFoundException(String message){
        super(message);
    }
}
