package api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByUserId(Long userId);

    @Query("SELECT t FROM Transacao t WHERE " +
           "(:userId IS NULL OR t.userId = :userId) AND " +
           "(:tipo IS NULL OR t.tipo = :tipo) AND " +
           "(:categoriaId IS NULL OR t.categoriaId = :categoriaId) AND " +
           "(cast(:dataInicio as date) IS NULL OR t.data >= :dataInicio) AND " +
           "(cast(:dataFim as date) IS NULL OR t.data <= :dataFim) AND " +
           "(:valorMin IS NULL OR t.valor >= :valorMin) AND " +
           "(:valorMax IS NULL OR t.valor <= :valorMax)")
    List<Transacao> buscarComFiltros(
            @Param("userId") Long userId, @Param("tipo") String tipo,
            @Param("categoriaId") Long categoriaId, @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim, @Param("valorMin") BigDecimal valorMin,
            @Param("valorMax") BigDecimal valorMax);
            
    @Query("SELECT t FROM Transacao t WHERE t.userId = :userId AND LOWER(t.descricao) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Transacao> pesquisar(@Param("userId") Long userId, @Param("termo") String termo);
}