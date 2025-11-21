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

    public Meta buscarPorId(Long id) {
        return metas.stream()
            .filter(m -> m.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    public Meta atualizarMeta(Long id, Meta novaMeta) {
    Meta meta = metas.stream().filter(m -> m.getId().equals(id)).findFirst().orElse(null);
    if (meta != null) {
        if (novaMeta.getDescricao() != null) meta.setDescricao(novaMeta.getDescricao());
        if (novaMeta.getValorMeta() != null) meta.setValorMeta(novaMeta.getValorMeta());
        if (novaMeta.getDataAlvo() != null) meta.setDataAlvo(novaMeta.getDataAlvo());
    }
    return meta;
}

    public boolean deletar(Long id) {
        return metas.removeIf(m -> m.getId().equals(id));
    }
}

