package the.framemy.util;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import the.framemy.repository.TokenRepository;


@Service
@Transactional
@RequiredArgsConstructor
public class ClearTokensCron {

    private final TokenRepository tokenRepository;

    @Scheduled(cron = "${user.password.token.purge.cron.expression}")
    public void purgeExpired() {
        tokenRepository.deleteAllExpired();
    }
}
