package api.statistics;

import java.io.Serializable;
import java.time.LocalDate;

public class Estatistica implements Serializable {
    private Long totalUsuarios;
    private Long totalTransacoes;
    private LocalDate periodoInicio;
    private LocalDate periodoFim;

    public Estatistica() {}

    public Long getTotalUsuarios() { return totalUsuarios; }
    public void setTotalUsuarios(Long totalUsuarios) { this.totalUsuarios = totalUsuarios; }
    public Long getTotalTransacoes() { return totalTransacoes; }
    public void setTotalTransacoes(Long totalTransacoes) { this.totalTransacoes = totalTransacoes; }
    public LocalDate getPeriodoInicio() { return periodoInicio; }
    public void setPeriodoInicio(LocalDate periodoInicio) { this.periodoInicio = periodoInicio; }
    public LocalDate getPeriodoFim() { return periodoFim; }
    public void setPeriodoFim(LocalDate periodoFim) { this.periodoFim = periodoFim; }
}