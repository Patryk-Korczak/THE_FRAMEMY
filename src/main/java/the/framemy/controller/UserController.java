package the.framemy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import the.framemy.model.dto.request.ForgotPasswordObject;
import the.framemy.model.dto.request.RegisterObject;
import the.framemy.model.dto.request.ResetPasswordObject;
import the.framemy.model.dto.response.LoginObject;
import the.framemy.service.IUserService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth/")
public class UserController {
	private final IUserService userService;

	@PostMapping("/login")
	public ResponseEntity<LoginObject> login(@RequestBody the.framemy.model.dto.request.LoginObject loginObject) {
		return userService.login(loginObject);
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterObject registerObject) {
		return userService.register(registerObject);
	}

	@PostMapping("/forgotpassword")
	public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordObject forgotPasswordObject) {
		return userService.forgotPassword(forgotPasswordObject);
	}

	@PostMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordObject resetPasswordObject) {
		return userService.resetPassword(resetPasswordObject);
	}

}
