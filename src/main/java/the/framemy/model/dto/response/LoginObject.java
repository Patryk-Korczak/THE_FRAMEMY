package the.framemy.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import the.framemy.model.Role;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginObject {
	private String jwtToken;
	private String email;
	private List<Role> roles;
}
