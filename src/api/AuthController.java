package api;

import jakarta.validation.Valid;
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
    public ResponseEntity<?> registrar(@Valid @RequestBody User user) {
        User existente = userService.buscarPorEmail(user.getEmail());
        if (existente != null) {
            return ResponseEntity.status(409).body("Email já cadastrado");
        }
        return ResponseEntity.status(201).body(userService.registrar(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User logado = userService.login(user.getEmail(), user.getSenha());
        if (logado == null) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
        return ResponseEntity.ok(logado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> atualizarUsuario(@PathVariable Long id, @RequestBody User user) {
        User atualizado = userService.atualizar(id, user);
        if (atualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizado);
    }
}