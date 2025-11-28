package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class MetaService {

    @Autowired
    private MetaRepository repository;

    public Meta salvar(Meta meta) {
        if (meta.getValorAtual() == null) meta.setValorAtual(BigDecimal.ZERO);
        if (meta.getDataAlvo() == null) meta.setDataAlvo(LocalDate.now().plusMonths(6));
        return repository.save(meta);
    }

    public List<Meta> buscarPorUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public Meta atualizarMeta(Long id, Meta novaMeta) {
        return repository.findById(id).map(meta -> {
            if (novaMeta.getDescricao() != null) meta.setDescricao(novaMeta.getDescricao());
            if (novaMeta.getValorMeta() != null) meta.setValorMeta(novaMeta.getValorMeta());
            if (novaMeta.getDataAlvo() != null) meta.setDataAlvo(novaMeta.getDataAlvo());
            if (novaMeta.getValorAtual() != null) meta.setValorAtual(novaMeta.getValorAtual());
            return repository.save(meta);
        }).orElse(null);
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}