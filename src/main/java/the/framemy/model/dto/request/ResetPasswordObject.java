package the.framemy.model.dto.request;

import lombok.Data;

@Data
public class ResetPasswordObject {
	private String token;
	private String password;
}
