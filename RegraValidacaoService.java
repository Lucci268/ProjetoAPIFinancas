package com.cashplus.service;

import com.cashplus.model.RegraValidacao;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class RegraValidacaoService {

    private final List<RegraValidacao> regras = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public RegraValidacao criar(RegraValidacao regra) {
        regra.setId(nextId.getAndIncrement());
        regra.setAtiva(true);
        regras.add(regra);
        return regra;
    }

    public List<RegraValidacao> listar() {
        return regras;
    }

    public RegraValidacao atualizar(Long id, RegraValidacao novaRegra) {
        for (RegraValidacao r : regras) {
            if (r.getId().equals(id)) {
                r.setCampo(novaRegra.getCampo());
                r.setRegra(novaRegra.getRegra());
                r.setAtiva(novaRegra.isAtiva());
                return r;
            }
        }
        return null;
    }

    public boolean remover(Long id) {
        return regras.removeIf(r -> r.getId().equals(id));
    }
}
