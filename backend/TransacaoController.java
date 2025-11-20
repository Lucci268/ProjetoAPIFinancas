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

        if (userId == null) return ResponseEntity.status(401).build();

        List<Transacao> transacoes = transacaoService.buscarComFiltros(
            userId, tipo, categoriaId, dataInicio, dataFim, valorMin, valorMax
        );
        return ResponseEntity.ok(transacoes);
    }

    @GetMapping("/transactions/search")
public ResponseEntity<List<Transacao>> buscarTransacoes(
    @RequestParam Long userId,
    @RequestParam(required = false) String termo,
    @RequestParam(required = false) String ordenarPor
) {
    List<Transacao> resultados = transacaoService.pesquisarTransacoes(userId, termo, ordenarPor);
    return ResponseEntity.ok(resultados);
}

    @DeleteMapping("/transactions/{id}")
public ResponseEntity<?> deletarTransacao(@PathVariable Long id) {
    boolean removido = transacoes.removeIf(t -> t.getId().equals(id));
    if (!removido) return ResponseEntity.status(404).body("Transação não encontrada");
    return ResponseEntity.ok().build();
}

    @GetMapping("/transactions/{id}")
public ResponseEntity<Transacao> detalhesTransacao(@PathVariable Long id) {
    Transacao t = transacoes.stream().filter(tr -> tr.getId().equals(id)).findFirst().orElse(null);
    if (t == null) return ResponseEntity.status(404).build();
    Categoria cat = categoriaService.buscarPorId(t.getCategoriaId());
    t.setNomeCategoria(cat != null ? cat.getNome() : "Sem Categoria");
    return ResponseEntity.ok(t);
}

}

