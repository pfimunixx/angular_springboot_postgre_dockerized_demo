package tech.getarrays.backend.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message){
            super(message);
    }
}
