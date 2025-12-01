package api.reminder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository repository;

    public Reminder salvar(Reminder reminder) {
        if (reminder.getDataVencimento() == null) reminder.setDataVencimento(LocalDate.now().plusDays(1));
        return repository.save(reminder);
    }

    public List<Reminder> buscarPorUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public Reminder atualizar(Long id, Reminder novo) {
        return repository.findById(id).map(r -> {
            if (novo.getDescricao() != null) r.setDescricao(novo.getDescricao());
            if (novo.getValor() != null) r.setValor(novo.getValor());
            if (novo.getDataVencimento() != null) r.setDataVencimento(novo.getDataVencimento());
            return repository.save(r);
        }).orElse(null);
    }

    public boolean remover(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}