package com.avengers.todo.services;

import com.avengers.todo.common.JwtService;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.AuthResponse;
import com.avengers.todo.payloads.RegistrationRequest;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegistrationRequest request) {
        if (usersRepository.findByUsername(request.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        Users user = usersRepository.save(Users.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .isActive(true)
                .build());
        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(user))
                .build();
    }
}
