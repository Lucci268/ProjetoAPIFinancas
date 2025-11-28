package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/validation-rules")
@CrossOrigin(origins = "http://localhost:5173")
public class RegraValidacaoController {

    @Autowired
    private RegraValidacaoService service;

    @PostMapping
    public ResponseEntity<RegraValidacao> criar(@RequestBody RegraValidacao regra) {
        return ResponseEntity.status(201).body(service.criar(regra));
    }

    @GetMapping
    public ResponseEntity<List<RegraValidacao>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegraValidacao> atualizar(@PathVariable Long id, @RequestBody RegraValidacao regra) {
        RegraValidacao atualizada = service.atualizar(id, regra);
        if (atualizada == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (service.remover(id)) return ResponseEntity.noContent().build();
        return ResponseEntity.notFound().build();
    }
}