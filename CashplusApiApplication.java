import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

// A anotação mais importante: informa ao Spring Boot para inicializar
@SpringBootApplication
public class CashplusApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CashplusApiApplication.class, args);
	}

    // Configuração do CORS: Permite a comunicação do React (porta 5173) com o Java (porta 8080)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) { // <--- CORREÇÃO AQUI
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
