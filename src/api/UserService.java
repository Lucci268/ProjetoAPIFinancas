package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registrar(User user) {
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        user.setRole("USER");
        return userRepository.save(user);
    }

    public User buscarPorEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User login(String email, String senha) {
        User user = buscarPorEmail(email);
        if (user == null) return null;
        if (!passwordEncoder.matches(senha, user.getSenha())) return null;
        return user;
    }

    public List<User> buscarTodos() {
        return userRepository.findAll();
    }

    public User atualizar(Long id, User dadosNovos) {
        return userRepository.findById(id).map(user -> {
            if (dadosNovos.getName() != null) user.setName(dadosNovos.getName());
            if (dadosNovos.getEmail() != null) user.setEmail(dadosNovos.getEmail());
            if (dadosNovos.getTelefone() != null) user.setTelefone(dadosNovos.getTelefone());
            if (dadosNovos.getAvatar() != null) user.setAvatar(dadosNovos.getAvatar());
            return userRepository.save(user);
        }).orElse(null);
    }
}