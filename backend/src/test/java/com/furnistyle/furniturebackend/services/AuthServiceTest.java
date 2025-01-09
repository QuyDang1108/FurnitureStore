package com.furnistyle.furniturebackend.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.furnistyle.furniturebackend.dtos.requests.AuthenticationRequest;
import com.furnistyle.furniturebackend.dtos.requests.RegisterRequest;
import com.furnistyle.furniturebackend.exceptions.BadRequestException;
import com.furnistyle.furniturebackend.exceptions.NotFoundException;
import com.furnistyle.furniturebackend.models.OTP;
import com.furnistyle.furniturebackend.models.User;
import com.furnistyle.furniturebackend.repositories.OTPRepository;
import com.furnistyle.furniturebackend.repositories.UserRepository;
import java.time.LocalDateTime;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AuthServiceTest {
    @MockBean
    private UserRepository userRepository;

    @MockBean
    private OTPRepository otpRepository;

    @MockBean
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Test
    void register_WhenUsernameAlreadyExists_ThenThrowBadRequestException() {
        // Arrange
        RegisterRequest request = Instancio.create(RegisterRequest.class);
        request.setUsername("existingUsername");
        Mockito.when(userRepository.findByUsername(request.getUsername())).thenReturn(new User());

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.register(request));
    }

    @Test
    void register_WhenEmailAlreadyExists_ThenThrowBadRequestException() {
        // Arrange
        RegisterRequest request = Instancio.create(RegisterRequest.class);
        request.setEmail("existingEmail@example.com");
        Mockito.when(userRepository.findByEmail(request.getEmail())).thenReturn(new User());

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.register(request));
    }

    @Test
    void register_WhenPhoneAlreadyExists_ThenThrowBadRequestException() {
        // Arrange
        RegisterRequest request = Instancio.create(RegisterRequest.class);
        request.setPhone("0123456789");
        Mockito.when(userRepository.findByPhone(request.getPhone())).thenReturn(new User());

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.register(request));
    }

    @Test
    void register_WhenValidData_ThenSaveUser() {
        // Arrange
        RegisterRequest request = Instancio.create(RegisterRequest.class);
        request.setRole("USER");
        request.setGender("MALE");

        User user = Instancio.create(User.class);
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);

        // Act
        boolean result = authService.register(request);

        // Assert
        assertTrue(result);
        Mockito.verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    }

    @Test
    void authenticate_WhenInvalidCredentials_ThenThrowBadRequestException() {
        // Arrange
        AuthenticationRequest request = new AuthenticationRequest("invalidUser", "wrongPassword");

        Mockito.doThrow(new BadCredentialsException("Bad credentials"))
            .when(authenticationManager)
            .authenticate(Mockito.any(Authentication.class));

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.authenticate(request));
    }

    @Test
    void authenticate_WhenUserNotFound_ThenThrowNotFoundException() {
        // Arrange
        AuthenticationRequest request = new AuthenticationRequest("nonExistentUser", "password");

        Mockito.when(userRepository.findByUsername(request.getUsername())).thenReturn(null);

        // Act & Assert
        assertThrows(NotFoundException.class, () -> authService.authenticate(request));
    }

    @Test
    void validateOTP_WhenOTPNotFound_ThenThrowBadRequestException() {
        // Arrange
        String email = "test@example.com";
        String code = "123456";

        Mockito.when(otpRepository.getByEmail(email)).thenReturn(null);

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.validateOTP(email, code));
    }

    @Test
    void validateOTP_WhenCodeMismatch_ThenThrowBadRequestException() {
        // Arrange
        String email = "test@example.com";
        String code = "123456";

        OTP otp = new OTP();
        otp.setCode("654321");
        Mockito.when(otpRepository.getByEmail(email)).thenReturn(otp);

        // Act & Assert
        assertThrows(BadRequestException.class, () -> authService.validateOTP(email, code));
    }

    @Test
    void validateOTP_WhenValidOTP_ThenReturnTrue() {
        // Arrange
        String email = "test@example.com";
        String code = "123456";

        OTP otp = new OTP();
        otp.setCode(code);
        otp.setCreatedDate(LocalDateTime.now());
        Mockito.when(otpRepository.getByEmail(email)).thenReturn(otp);

        // Act
        boolean result = authService.validateOTP(email, code);

        // Assert
        assertTrue(result);
        Mockito.verify(otpRepository, Mockito.times(1)).delete(Mockito.any(OTP.class));
    }

}
