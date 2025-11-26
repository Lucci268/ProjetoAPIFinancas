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

        List<Transacao> filtradas = transacoes.stream()
            // Se userId for null (admin), traz tudo. Se não, filtra pelo ID.
            .filter(t -> userId == null || t.getUserId().equals(userId))
            .filter(t -> tipo == null || t.getTipo().equalsIgnoreCase(tipo))
            .filter(t ->HZcategoriaId == null || t.getCategoriaId().equals(categoriaId))
            .filter(t -> dataInicio == null || !t.getData().isBefore(dataInicio))
            .filter(t -> dataFim == null || !t.getData().isAfter(dataFim))
            .filter(t -> valorMin == null || t.getValor().compareTo(valorMin) >= 0)
            .filter(t -> valorMax == null || t.getValor().compareTo(valorMax) <= 0)
            .collect(Collectors.toList());

        return filtradas.stream().map(t -> {
            Transacao c = new Transacao();
            c.setId(t.getId());
            c.setUserId(t.getUserId());
            c.setTipo(t.getTipo());
            c.setValor(t.getValor());
            c.setData(t.getData());
            c.setDescricao(t.getDescricao());
            c.setCategoriaId(t.getCategoriaId());
            c.setNomeCategoria(t.getNomeCategoria());
            if(c.getNomeCategoria() == null && t.getCategoriaId() != null) {
                 Categoria cat = categoriaService.buscarPorId(t.getCategoriaId());
                 c.setNomeCategoria(cat != null ? cat.getNome() : "Sem Categoria");
            }
            return c;
        }).collect(Collectors.toList());
    }

    public List<Transacao> pesquisarTransacoes(Long userId, String termo, String ordenarPor) {
        return transacoes.stream()
            .filter(t -> t.getUserId().equals(userId))
            .filter(t -> termo == null || t.getDescricao().toLowerCase().contains(termo.toLowerCase()))
            .sorted((a, b) -> {
                if ("data".equalsIgnoreCase(ordenarPor)) {
                    return a.getData().compareTo(b.getData());
                } else if ("valor".equalsIgnoreCase(ordenarPor)) {
                    return a.getValor().compareTo(b.getValor());
                }
                return 0;
            })
            .collect(Collectors.toList());
    }
}