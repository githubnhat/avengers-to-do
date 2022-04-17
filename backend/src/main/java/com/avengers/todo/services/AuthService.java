package com.avengers.todo.services;

import com.avengers.todo.common.JwtService;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.AuthRequest;
import com.avengers.todo.payloads.AuthResponse;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        Users user = usersRepository.findByUsernameAndIsActive(request.getUsername(), true);
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("The Username or Password is Incorrect");
        }
        return AuthResponse.builder()
                .accessToken(jwtService.generateToken(user))
                .build();
    }
}
