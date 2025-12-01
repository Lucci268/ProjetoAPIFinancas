package api.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> listarCategorias(@RequestParam Long userId) {
        return ResponseEntity.ok(categoriaService.buscarPorUsuario(userId));
    }

    @PostMapping("/categorias")
    public ResponseEntity<Categoria> criarCategoria(@RequestBody Categoria categoria) {
        Categoria novaCat = categoriaService.criar(categoria);
        return ResponseEntity.status(201).body(novaCat);
    }
    
    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id) {
        categoriaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}