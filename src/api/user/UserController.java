package api.user;

import api.transaction.Transacao;
import api.transaction.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

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
        return ResponseEntity.ok(transacaoService.buscarTodas());
    }
}