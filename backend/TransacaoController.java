package com.cashplus.controller;

import com.cashplus.model.Transacao;
import com.cashplus.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping("/transactions")
    public ResponseEntity<Transacao> registrarTransacao(@RequestBody Transacao transacao) {
        Transacao novaTransacao = transacaoService.salvar(transacao);
        return ResponseEntity.status(201).body(novaTransacao);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transacao>> getTransacoesComFiltros(
        @RequestParam Long userId,
        @RequestParam(required = false) String tipo,
        @RequestParam(required = false) Long categoriaId,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim,
        @RequestParam(required = false) BigDecimal valorMin,
        @RequestParam(required = false) BigDecimal valorMax) {

        if (userId == null) {
            return ResponseEntity.status(401).build();
        }

        List<Transacao> transacoes = transacaoService.buscarComFiltros(
            userId, tipo, categoriaId, dataInicio, dataFim, valorMin, valorMax
        );
        return ResponseEntity.ok(transacoes);
    }
}