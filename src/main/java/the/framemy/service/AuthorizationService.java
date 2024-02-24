package the.framemy.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import the.framemy.model.User;
import the.framemy.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorizationService implements org.springframework.security.core.userdetails.UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		final Optional<User> userOptional = userRepository.findByEmail(email);
		userOptional.orElseThrow(() -> new UsernameNotFoundException("User identified by email: " + email + " not found"));
		User user = userOptional.get();
		return new org.springframework.security.core.userdetails.User(
				user.getEmail(),
				user.getPassword(),
				user.getRoles()
		);
	}
}
