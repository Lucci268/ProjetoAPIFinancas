package com.cashplus.controller;

import com.cashplus.model.Reminder;
import com.cashplus.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @PostMapping("/reminders")
    public ResponseEntity<Reminder> criarReminder(@RequestBody Reminder reminder) {
        Reminder novo = reminderService.salvar(reminder);
        return ResponseEntity.status(201).body(novo);
    }

    @GetMapping("/reminders")
    public ResponseEntity<List<Reminder>> listarReminders(@RequestParam Long userId) {
        return ResponseEntity.ok(reminderService.buscarPorUserId(userId));
    }

    @DeleteMapping("/reminders/{id}")
    public ResponseEntity<?> deletarReminder(@PathVariable Long id) {
        boolean removido = reminderService.remover(id);
        if (!removido) return ResponseEntity.status(404).body("Reminder não encontrado");
        return ResponseEntity.ok().build();
    }
}
