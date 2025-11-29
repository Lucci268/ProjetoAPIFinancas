package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository repository;

    public Categoria criar(Categoria categoria) {
        return repository.save(categoria);
    }

    public List<Categoria> buscarPorUsuario(Long userId) {
        return repository.findByUserId(userId);
    }

    public Categoria buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public void deletar(Long id) {
        repository.deleteById(id);
    }
}  