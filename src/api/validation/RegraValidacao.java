package api.validation;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "regras_validacao")
public class RegraValidacao implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String campo;
    private String regra;
    private boolean ativa;

    public RegraValidacao() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCampo() { return campo; }
    public void setCampo(String campo) { this.campo = campo; }
    public String getRegra() { return regra; }
    public void setRegra(String regra) { this.regra = regra; }
    public boolean isAtiva() { return ativa; }
    public void setAtiva(boolean ativa) { this.ativa = ativa; }
}