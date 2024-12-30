package com.furnistyle.furniturebackend.services.impl;

import com.furnistyle.furniturebackend.dtos.bases.UserDTO;
import com.furnistyle.furniturebackend.dtos.requests.UpdateUserRequest;
import com.furnistyle.furniturebackend.enums.ERole;
import com.furnistyle.furniturebackend.enums.EUserStatus;
import com.furnistyle.furniturebackend.exceptions.BadRequestException;
import com.furnistyle.furniturebackend.exceptions.DataAccessException;
import com.furnistyle.furniturebackend.exceptions.NotFoundException;
import com.furnistyle.furniturebackend.mappers.UserMapper;
import com.furnistyle.furniturebackend.models.Token;
import com.furnistyle.furniturebackend.models.User;
import com.furnistyle.furniturebackend.repositories.TokenRepository;
import com.furnistyle.furniturebackend.repositories.UserRepository;
import com.furnistyle.furniturebackend.services.UserService;
import com.furnistyle.furniturebackend.utils.Constants;
import jakarta.validation.ValidationException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NotFoundException(Constants.Message.INCORRECT_USERNAME_OR_PASSWORD);
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new ValidationException(Constants.Message.INCORRECT_OLD_PASSWORD);
        }

        if (Objects.equals(oldPassword, newPassword)) {
            throw new BadRequestException(Constants.Message.DUPLICATE_OLD_NEW_PASSWORD);
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new DataAccessException(Constants.Message.CAN_NOT_CHANGE_PASSWORD);
        }

        return true;
    }

    @Override
    public UserDTO getUserByToken(String token) {
        Token tokens = tokenRepository.findByToken(token)
            .orElseThrow(() -> new NotFoundException(Constants.Message.NOT_FOUND_USER));
        User user = tokens.getUser();

        if (user == null) {
            throw new NotFoundException(Constants.Message.NOT_FOUND_USER);
        }
        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userMapper.toDTO(userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(Constants.Message.NOT_FOUND_USER)));
    }

    @Override
    public List<UserDTO> getAllAdmin() {
        return userMapper.toDTOs(userRepository.findAllByRole(ERole.ADMIN));
    }

    @Override
    public boolean updateUser(UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(updateUserRequest.getId())
            .orElseThrow(() -> new NotFoundException(Constants.Message.NOT_FOUND_USER));
        user.setAddress(updateUserRequest.getAddress());
        user.setFullname(user.getFullname());
        user.setPhone(updateUserRequest.getPhone());
        user.setEmail(updateUserRequest.getEmail());
        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new DataAccessException(Constants.Message.CAN_NOT_UPDATE_INFO_USER);
        }

        return true;
    }

    @Override
    public void deactivateUserWithId(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setStatus(EUserStatus.INACTIVE);
            userRepository.save(user);
        } else {
            throw new NotFoundException(Constants.Message.NOT_FOUND_USER);
        }
    }

    @Override
    public void activateUserWithId(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setStatus(EUserStatus.ACTIVE);
            userRepository.save(user);
        } else {
            throw new NotFoundException(Constants.Message.NOT_FOUND_USER);
        }
    }

    @Override
    public List<UserDTO> getAllNormalUser() {
        return userMapper.toDTOs(userRepository.findAllByRole(ERole.USER));
    }
}
