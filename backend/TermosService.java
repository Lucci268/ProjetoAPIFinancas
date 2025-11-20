package com.cashplus.service;

import org.springframework.stereotype.Service;

@Service
public class TermosService {

    public String getTermosDeUso() {
        return """
            TERMOS DE USO DO CASH+
            
            1. Aceitação dos Termos
            Ao acessar ou usar o serviço Cash+, você concorda em cumprir estes Termos de Uso.
            
            2. Uso do Serviço
            O Cash+ é destinado ao controle de finanças pessoais. Você é responsável pela precisão e legalidade dos dados que insere.
            
            3. Privacidade
            Sua privacidade é importante. Os dados pessoais e financeiros serão tratados conforme nossa Política de Privacidade.
            
            4. Limitação de Responsabilidade
            O Cash+ não se responsabiliza por quaisquer perdas financeiras decorrentes do uso do aplicativo.
            
            5. Modificações
            Reservamo-nos o direito de modificar estes termos a qualquer momento.
            """;
    }
}