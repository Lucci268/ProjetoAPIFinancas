package com.cashplus.controller;

import com.cashplus.model.Transacao;
import com.cashplus.model.User;
import com.cashplus.service.TransacaoService;
import com.cashplus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private TransacaoService transacaoService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> listarTodosUsuarios() {
        return ResponseEntity.ok(userService.buscarTodos());
    }

    @GetMapping("/global-transactions")
    public ResponseEntity<List<Transacao>> listarTodasTransacoes() {
        return ResponseEntity.ok(transacaoService.buscarComFiltros(null, null, null, null, null, null, null));
    }
}