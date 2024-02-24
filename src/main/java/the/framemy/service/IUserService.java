package the.framemy.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import the.framemy.model.dto.request.ForgotPasswordObject;
import the.framemy.model.dto.request.ResetPasswordObject;
import the.framemy.model.dto.response.LoginObject;
import the.framemy.model.dto.response.RegisterObject;

public interface IUserService {
	ResponseEntity<LoginObject> login(the.framemy.model.dto.request.LoginObject loginObject) throws UsernameNotFoundException;

	ResponseEntity<RegisterObject> register(the.framemy.model.dto.request.RegisterObject registerObject);

	ResponseEntity<?> forgotPassword(ForgotPasswordObject forgotPasswordObject);

	ResponseEntity<?> resetPassword(ResetPasswordObject resetPasswordObject);
}
