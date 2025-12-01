package api.goal;

import jakarta.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "metas")
public class Meta implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String descricao;
    private BigDecimal valorMeta;
    private BigDecimal valorAtual;
    private LocalDate dataAlvo;

    public Meta() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public BigDecimal getValorMeta() { return valorMeta; }
    public void setValorMeta(BigDecimal valorMeta) { this.valorMeta = valorMeta; }
    public BigDecimal getValorAtual() { return valorAtual; }
    public void setValorAtual(BigDecimal valorAtual) { this.valorAtual = valorAtual; }
    public LocalDate getDataAlvo() { return dataAlvo; }
    public void setDataAlvo(LocalDate dataAlvo) { this.dataAlvo = dataAlvo; }
}