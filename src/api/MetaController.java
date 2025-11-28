package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @PostMapping("/goals")
    public ResponseEntity<Meta> criarMeta(@RequestBody Meta meta) {
        Meta novaMeta = metaService.salvar(meta);
        return ResponseEntity.status(201).body(novaMeta);
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Meta>> buscarMetas(@RequestParam Long userId) {
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(metaService.buscarPorUserId(userId));
    }

    @PutMapping("/goals/{id}")
    public ResponseEntity<Meta> atualizarMeta(@PathVariable Long id, @RequestBody Meta dados) {
        Meta atualizada = metaService.atualizarMeta(id, dados);
        if (atualizada == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/goals/{id}")
    public ResponseEntity<Void> deletarMeta(@PathVariable Long id) {
        boolean removida = metaService.deletar(id);
        if (!removida) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }
}