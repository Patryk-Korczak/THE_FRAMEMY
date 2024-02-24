package the.framemy.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import the.framemy.model.PasswordReset;
import the.framemy.model.Role;
import the.framemy.model.User;
import the.framemy.repository.TokenRepository;
import the.framemy.repository.UserRepository;
import the.framemy.util.JwtUtil;
import the.framemy.model.dto.request.ForgotPasswordObject;
import the.framemy.model.dto.request.ResetPasswordObject;
import the.framemy.model.dto.response.LoginObject;
import the.framemy.model.dto.response.RegisterObject;
import the.framemy.service.IUserService;
import the.framemy.util.Literals;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;
    private final JavaMailSender emailSender;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public ResponseEntity<LoginObject> login(the.framemy.model.dto.request.LoginObject loginObject) throws UsernameNotFoundException {
        ResponseEntity<LoginObject> response = null;
        try {
            final Optional<User> userOptional = userRepository.findByEmail(loginObject.getEmail());
            userOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            User user = userOptional.get();
            final String token = jwtUtil.generateToken(user);
            response = ResponseEntity.ok(new LoginObject(token, user.getEmail(), user.getRoles()));
        } catch (BadCredentialsException badCredentialsException) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new LoginObject(null, null, null));
        } catch (RuntimeException e) {
            e.printStackTrace();
        }

        if (response == null) {
            response = ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginObject(null, null, null));}
        return response;
    }

    @Override
    public ResponseEntity<RegisterObject> register(the.framemy.model.dto.request.RegisterObject registerObject) {
        if (userRepository.existsByEmail(registerObject.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new RegisterObject(null, null, null));
        }

        final User user = User.builder()
                .email(registerObject.getEmail())
                .password(passwordEncoder.encode(registerObject.getPassword()))
                .roles(Collections.singletonList(Role.ROLE_CUSTOMER))
                .isActive(false)
                .build();
        userRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("FrameMyMemories");
        message.setTo(registerObject.getEmail());
        message.setSubject("Resetowanie hasła - FrameMyMemories");
        message.setText(Literals.afterRegistration);
        this.emailSender.send(message);


        return ResponseEntity.ok(new RegisterObject(jwtUtil.generateToken(user), user.getEmail(), user.getRoles()));
    }

    @Override
    public ResponseEntity<?> forgotPassword(ForgotPasswordObject forgotPasswordObject) {
        final PasswordReset resetToken = PasswordReset
                .builder().user(userRepository.findByEmail(forgotPasswordObject.getAddressEmail())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusMinutes(15L))
                .build();

        tokenRepository.save(resetToken);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("FrameMyMemories");
        message.setTo(forgotPasswordObject.getAddressEmail());
        message.setSubject("Resetowanie hasła - FrameMyMemories");
        message.setText(Literals.resetPassword + "\nPassword reset: http://localhost:3000/reset-password/" + resetToken.getToken());
        this.emailSender.send(message);
        return ResponseEntity.ok("OK");
    }
    @Override
    public ResponseEntity<?> resetPassword(ResetPasswordObject resetPasswordObject) {
        PasswordReset passwordReset = tokenRepository.findByToken(resetPasswordObject.getToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = passwordReset.getUser();
        user.setPassword(passwordEncoder.encode(resetPasswordObject.getPassword()));
        userRepository.save(user);
        tokenRepository.delete(passwordReset);
        return ResponseEntity.ok("OK");
    }

}
