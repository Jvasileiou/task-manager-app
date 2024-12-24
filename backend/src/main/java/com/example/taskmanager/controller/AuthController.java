package com.example.taskmanager.controller;

import com.example.taskmanager.controller.security.JwtUtil;
import com.example.taskmanager.dto.UserDTO;
import com.example.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        UserDTO existingUserDTO = userService.findByUsername(userDTO.getUsername());
        if (existingUserDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user with that username");
        }

        // Compare raw password with the encoded password in the database
        if (!passwordEncoder.matches(userDTO.getPassword(), existingUserDTO.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // Send JWT token
        String token = jwtUtil.generateToken(existingUserDTO.getUsername());
        return ResponseEntity.ok(token);
    }
}