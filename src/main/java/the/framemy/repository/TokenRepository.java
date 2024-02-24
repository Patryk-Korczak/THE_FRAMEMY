package the.framemy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import the.framemy.model.PasswordReset;

import java.util.Optional;


@Repository
public interface TokenRepository extends JpaRepository<PasswordReset, Long> {

	@Modifying
	@Query("delete from tokens t where t.isExpired is true")
	void deleteAllExpired();

	Optional<PasswordReset> findByToken(String token);
}
