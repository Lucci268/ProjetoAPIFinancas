package com.cashplus.service;

import com.cashplus.model.Reminder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class ReminderService {

    private final List<Reminder> reminders = new ArrayList<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public Reminder salvar(Reminder reminder) {
        reminder.setId(nextId.getAndIncrement());
        if (reminder.getDataVencimento() == null) reminder.setDataVencimento(LocalDate.now().plusDays(1));
        reminders.add(reminder);
        return reminder;
    }

    public List<Reminder> buscarPorUserId(Long userId) {
        return reminders.stream()
            .filter(r -> r.getUserId().equals(userId))
            .collect(Collectors.toList());
    }

    public boolean remover(Long id) {
        return reminders.removeIf(r -> r.getId().equals(id));
    }
}
