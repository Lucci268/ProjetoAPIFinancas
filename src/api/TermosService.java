package api;

import org.springframework.stereotype.Service;

@Service
public class TermosService {

    public String getTermosDeUso() {
        return """
            TERMOS DE USO DO CASH+
            
            1. Aceitação dos Termos
            Ao acessar ou usar o serviço Cash+, você concorda em cumprir estes Termos de Uso.
            
            2. Utilização
            O Cash+ é uma ferramenta para organização financeira pessoal. 
            O usuário é responsável pelas informações que registrar na plataforma, garantindo que sejam corretas e utilizadas de forma adequada.
            
            3. Privacidade
            Sua privacidade é importante. Os dados pessoais e financeiros serão tratados conforme nossa Política de Privacidade para melhorias em nossa aplicação.
            """;
    }
}