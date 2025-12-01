package api.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository repository;

    public Transacao salvar(Transacao transacao) {
        if (transacao.getData() == null) transacao.setData(LocalDate.now());
        return repository.save(transacao);
    }

    public List<Transacao> buscarComFiltros(Long userId, String tipo, Long categoriaId,
                                            LocalDate dataInicio, LocalDate dataFim,
                                            BigDecimal valorMin, BigDecimal valorMax) {
        return repository.buscarComFiltros(userId, tipo, categoriaId, dataInicio, dataFim, valorMin, valorMax);
    }

    public List<Transacao> pesquisarTransacoes(Long userId, String termo, String ordenarPor) {
        List<Transacao> lista;
        if (termo != null && !termo.isEmpty()) {
            lista = repository.pesquisar(userId, termo);
        } else {
            lista = repository.findByUserId(userId);
        }
        
        // Ordenação
        if ("data".equalsIgnoreCase(ordenarPor)) {
            lista.sort((a, b) -> a.getData().compareTo(b.getData()));
        } else if ("valor".equalsIgnoreCase(ordenarPor)) {
            lista.sort((a, b) -> a.getValor().compareTo(b.getValor()));
        }
        return lista;
    }

    public boolean deletar(Long id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public Transacao buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public List<Transacao> buscarTodas() {
        return repository.findAll();
    }
}