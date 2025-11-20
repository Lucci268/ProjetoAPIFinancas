package com.cashplus.service;

import com.cashplus.model.User;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {

    private final List<User> users = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public User registrar(User user) {
        user.setId(nextId.getAndIncrement());
        users.add(user);
        return user;
    }

    public User buscarPorEmail(String email) {
        return users.stream().filter(u -> u.getEmail().equalsIgnoreCase(email)).findFirst().orElse(null);
    }

    public User login(String email, String senha) {
        User user = buscarPorEmail(email);
        if (user == null) return null;
        if (!user.getSenha().equals(senha)) return null;
        return user;
    }
}
