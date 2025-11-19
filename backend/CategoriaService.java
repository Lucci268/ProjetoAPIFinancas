package src.main.java.com.cashplus.service;

import com.cashplus.model.Categoria;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class CategoriaService {
    private final List<Categoria> categorias = new ArrayList<>(Arrays.asList(
        new Categoria() {{ setId(1L); setNome("Salário"); setTipo("receita"); }},
        new Categoria() {{ setId(2L); setNome("Aluguel"); setTipo("despesa"); }},
        new Categoria() {{ setId(3L); setNome("Supermercado"); setTipo("despesa"); }}
    ));
    private final AtomicLong nextId = new AtomicLong(4);

    public Categoria criar(Categoria categoria) {
        categoria.setId(nextId.getAndIncrement());
        categorias.add(categoria);
        return categoria;
    }

    public List<Categoria> buscarTodas() {
        return categorias;
    }
    
    public Categoria buscarPorId(Long id) {
        return categorias.stream().filter(c -> c.getId().equals(id)).findFirst().orElse(null);
    }
}