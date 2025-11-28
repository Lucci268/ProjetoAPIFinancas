package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/statistics")
@CrossOrigin(origins = "http://localhost:5173")
public class EstatisticasController {

    @Autowired
    private EstatisticaService service;

    @GetMapping
    public ResponseEntity<Estatistica> gerar(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim
    ) {
        return ResponseEntity.ok(service.gerarEstatistica(inicio, fim));
    }
}