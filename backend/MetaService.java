package com.cashplus.service;

import com.cashplus.model.Meta;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class MetaService {

    private final List<Meta> metas = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public Meta salvar(Meta meta) {
        meta.setId(nextId.getAndIncrement());
        if (meta.getValorAtual() == null) meta.setValorAtual(BigDecimal.ZERO);
        if (meta.getDataAlvo() == null) meta.setDataAlvo(LocalDate.now().plusMonths(6)); 
        metas.add(meta);
        return meta;
    }

    public List<Meta> buscarPorUserId(Long userId) {
        return metas.stream()
            .filter(m -> m.getUserId().equals(userId))
            .collect(Collectors.toList());
    }

    public Meta atualizarProgresso(Long id, BigDecimal novoValor) {
        Meta meta = metas.stream().filter(m -> m.getId().equals(id)).findFirst().orElse(null);
        if (meta != null) {
            meta.setValorAtual(novoValor);
        }
        return meta;
    }
}