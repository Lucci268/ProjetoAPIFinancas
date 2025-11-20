package com.cashplus.controller;

import com.cashplus.model.Meta;
import com.cashplus.service.MetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class MetaController {

    @Autowired
    private MetaService metaService;

    @PostMapping("/goals")
    public ResponseEntity<Meta> criarMeta(@RequestBody Meta meta) {
        Meta novaMeta = metaService.salvar(meta);
        return ResponseEntity.status(201).body(novaMeta);
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Meta>> buscarMetas(@RequestParam Long userId) {
        if (userId == null) return ResponseEntity.status(401).build();

        List<Meta> metas = metaService.buscarPorUserId(userId);
        return ResponseEntity.ok(metas);
    }
}