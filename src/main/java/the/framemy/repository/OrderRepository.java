package the.framemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import the.framemy.model.CartEntry;
import the.framemy.model.User;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<CartEntry, Long> {
	List<CartEntry> findAllByUser(User user);

	CartEntry getById(Long id);
}
