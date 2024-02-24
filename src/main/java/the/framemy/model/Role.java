package the.framemy.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
	ROLE_CUSTOMER;

	@Override
	public String getAuthority() {
		return name();
	}
}

