package com.cashplus.model;

import java.io.Serializable;

public class RegraValidacao implements Serializable {
    private Long id;
    private String campo;
    private String regra; // Ex: "não nulo", "positivo", "máximo 1000"
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
