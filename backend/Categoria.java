package com.cashplus.model;

import java.io.Serializable;

public class Categoria implements Serializable {
    private Long id;
    private String nome;
    private String tipo;

    public Categoria() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
}