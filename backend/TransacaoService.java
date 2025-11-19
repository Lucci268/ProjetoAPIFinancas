package com.cashplus.service;

import com.cashplus.model.Categoria;
import com.cashplus.model.Transacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class TransacaoService {

    @Autowired
    private CategoriaService categoriaService;
    
    private final List<Transacao> transacoes = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public Transacao salvar(Transacao transacao) {
        transacao.setId(nextId.getAndIncrement());
        if (transacao.getData() == null) transacao.setData(LocalDate.now());
        transacoes.add(transacao);
        return transacao;
    }

    public List<Transacao> buscarComFiltros(
            Long userId, 
            String tipo, 
            Long categoriaId, 
            LocalDate dataInicio, 
            LocalDate dataFim, 
            BigDecimal valorMin, 
            BigDecimal valorMax) {

        List<Transacao> transacoesFiltradas = transacoes.stream()
            .filter(t -> t.getUserId().equals(userId))
            .filter(t -> tipo == null || t.getTipo().equalsIgnoreCase(tipo))
            .filter(t -> categoriaId == null || t.getCategoriaId().equals(categoriaId))
            .filter(t -> dataInicio == null || !t.getData().isBefore(dataInicio))
            .filter(t -> dataFim == null || !t.getData().isAfter(dataFim))
            .filter(t -> valorMin == null || t.getValor().compareTo(valorMin) >= 0)
            .filter(t -> valorMax == null || t.getValor().compareTo(valorMax) <= 0)
            .collect(Collectors.toList());

        return transacoesFiltradas.stream().map(t -> {
            Transacao tCopy = new Transacao();
            tCopy.setId(t.getId());
            tCopy.setUserId(t.getUserId());
            tCopy.setTipo(t.getTipo());
            tCopy.setValor(t.getValor());
            tCopy.setData(t.getData());
            tCopy.setDescricao(t.getDescricao());
            tCopy.setCategoriaId(t.getCategoriaId());
            
            Categoria categoria = categoriaService.buscarPorId(t.getCategoriaId());
            tCopy.setNomeCategoria(categoria != null ? categoria.getNome() : "Sem Categoria");
            return tCopy;
        }).collect(Collectors.toList());
    }
}