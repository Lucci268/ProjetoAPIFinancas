package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegraValidacaoService {

    @Autowired
    private RegraValidacaoRepository repository;

    public RegraValidacao criar(RegraValidacao regra) {
        regra.setAtiva(true);
        return repository.save(regra);
    }

    public List<RegraValidacao> listar() {
        return repository.findAll();
    }

    public RegraValidacao atualizar(Long id, RegraValidacao novaRegra) {
        return repository.findById(id).map(r -> {
            r.setCampo(novaRegra.getCampo());
            r.setRegra(novaRegra.getRegra());
            r.setAtiva(novaRegra.isAtiva());
            return repository.save(r);
        }).orElse(null);
    }

    public boolean remover(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}