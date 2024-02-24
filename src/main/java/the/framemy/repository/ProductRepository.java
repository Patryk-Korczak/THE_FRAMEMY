package the.framemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import the.framemy.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}