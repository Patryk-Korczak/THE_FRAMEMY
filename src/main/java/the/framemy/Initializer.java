package the.framemy;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import the.framemy.model.Product;
import the.framemy.model.Role;
import the.framemy.model.User;
import the.framemy.repository.ProductRepository;
import the.framemy.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class Initializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        addTestUser();
        fillProducts();
    }

    private Product createProduct(String title, String desc, String img, double price, int stock) {
        return Product.builder()
                .title(title)
                .description(desc)
                .imageUrl(img)
                .price(BigDecimal.valueOf(price))
                .inStock(stock).build();
    }

    private void fillProducts() {
        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

        createProductEntry(
                "Wschód Słońca",
                "Wschód słońca: symfonia światła i obietnica nowego dnia",
                "https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg",
                37.99,
                109
        );

        createProductEntry(
                "Golden Retriever",
                "Złoty towarzysz: wierność i radość w jednym spojrzeniu",
                "https://img.freepik.com/free-photo/full-shot-man-traveling-with-dog_23-2149013764.jpg",
                42.45,
                123
        );

        createProductEntry(
                "Lake",
                "Spokojne ukojenie: refleksja w odzwierciedleniu jeziora",
                "https://img.freepik.com/free-photo/pier-lake-hallstatt-austria_181624-44201.jpg",
                24.45,
                4123
        );

    }

    private void createProductEntry(String title, String desc, String img, double price, int stock) {
        productRepository.save(createProduct(title, desc, img, price, stock));
    }

    private void addTestUser() {
        var firstName = "Roman";
        var secondName = "Tester";

        var user = User.builder()
                .email(firstName.toLowerCase() + "." + secondName.toLowerCase() + "@gmail.com")
                .password(passwordEncoder.encode("12345678"))
                .roles(Collections.singletonList(Role.ROLE_CUSTOMER))
                .firstName(firstName)
                .secondName(secondName)
                .phoneNumber("666 666 666")
                .isActive(true)
                .build();

        userRepository.save(user);
    }

}
