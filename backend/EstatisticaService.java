package com.cashplus.service;

import com.cashplus.model.Estatistica;
import com.cashplus.model.User;
import com.cashplus.model.Transacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class EstatisticaService {

    @Autowired
    private UserService userService;

    @Autowired
    private TransacaoService transacaoService;

    public Estatistica gerarEstatistica(LocalDate inicio, LocalDate fim) {
        Estatistica est = new Estatistica();
        est.setPeriodoInicio(inicio);
        est.setPeriodoFim(fim);
        est.setTotalUsuarios((long) userService.buscarTodos().size());
        est.setTotalTransacoes((long) transacaoService.buscarComFiltros(null, null, null, inicio, fim, null, null).size());
        return est;
    }
}
