package com.cashplus.controller;

import com.cashplus.model.User;
import com.cashplus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registrar(@RequestBody User user) {
        User existente = userService.buscarPorEmail(user.getEmail());
        if (existente != null) return ResponseEntity.status(409).build();
        User novo = userService.registrar(user);
        return ResponseEntity.status(201).body(novo);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User logado = userService.login(user.getEmail(), user.getSenha());
        if (logado == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(logado);
    }
}
