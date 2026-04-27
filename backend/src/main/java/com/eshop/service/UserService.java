package com.eshop.service;

import com.eshop.dto.UserDTO;
import com.eshop.entity.User;
import com.eshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Get all users
     */
    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get user by ID
     */
    public Optional<UserDTO> getById(Long id) {
        return userRepository.findById(id)
                .map(this::entityToDTO);
    }

    /**
     * Get user by username
     */
    public Optional<UserDTO> getByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::entityToDTO);
    }

    /**
     * Get user by email
     */
    public Optional<UserDTO> getByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::entityToDTO);
    }

    /**
     * Check if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Check if username exists
     */
    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * Create a new user
     */
    public UserDTO create(UserDTO userDTO) {
        User user = dtoToEntity(userDTO);
        User saved = userRepository.save(user);
        return entityToDTO(saved);
    }

    /**
     * Update an existing user
     */
    public Optional<UserDTO> update(Long id, UserDTO userDTO) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(userDTO.getFirstName());
                    user.setLastName(userDTO.getLastName());
                    user.setPhoneNumber(userDTO.getPhoneNumber());
                    user.setEmail(userDTO.getEmail());
                    user.setActive(userDTO.getActive());
                    User updated = userRepository.save(user);
                    return entityToDTO(updated);
                });
    }

    /**
     * Delete a user by ID
     */
    public boolean delete(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Convert Entity to DTO
     */
    private UserDTO entityToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getActive(),
                user.getRole() != null ? user.getRole().name() : null
        );
    }

    /**
     * Convert DTO to Entity
     */
    private User dtoToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setActive(userDTO.getActive() != null ? userDTO.getActive() : true);
        if (userDTO.getRole() != null) {
            user.setRole(User.UserRole.valueOf(userDTO.getRole()));
        } else {
            user.setRole(User.UserRole.CUSTOMER);
        }
        return user;
    }

}