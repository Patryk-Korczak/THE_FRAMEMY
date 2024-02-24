package the.framemy.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import the.framemy.model.CartEntry;
import the.framemy.model.Product;
import the.framemy.repository.OrderRepository;
import the.framemy.repository.ProductRepository;
import the.framemy.repository.UserRepository;
import the.framemy.model.dto.OrderDTO;
import the.framemy.service.ICartService;
import the.framemy.util.Literals;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final JavaMailSender emailSender;

    @Override
    public ResponseEntity<List<OrderDTO>> getCartProducts() {
        var contextUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        the.framemy.model.User user = userRepository.findByEmail(
                contextUser.getUsername()
        ).orElseThrow(() -> {
            throw new NullPointerException();
        });

        List<CartEntry> allByUser = orderRepository.findAllByUser(user);

        return ResponseEntity.ok(
                allByUser.stream().map(
                        cartEntry -> OrderDTO
                                .builder()
                                .id(cartEntry.getId())
                                .product(cartEntry.getProduct())
                                .quantity(cartEntry.getQuantity()).build()
                ).collect(Collectors.toList())
        );
    }

    @Override
    public ResponseEntity<?> putOrder(OrderDTO orderDTO) {
        CartEntry byId = orderRepository.getById(orderDTO.getId());
        the.framemy.model.User user = byId.getUser();
        if (orderDTO.getQuantity() == 0) {
            orderRepository.delete(byId);
        } else {
            byId.setQuantity(orderDTO.getQuantity());
        }

        List<CartEntry> allByUser = orderRepository.findAllByUser(user);

        return ResponseEntity.ok(
                allByUser.stream().map(
                        cartEntry -> OrderDTO
                                .builder()
                                .id(cartEntry.getId())
                                .product(cartEntry.getProduct())
                                .quantity(cartEntry.getQuantity()).build()
                ).collect(Collectors.toList())
        );
    }

    @Override
    public ResponseEntity<?> addItemToCart(Product product) {
        var contextUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<the.framemy.model.User> userOptional = userRepository.findByEmail(
                contextUser.getUsername()
        );

        the.framemy.model.User user = userOptional.get();

        Optional<Product> byId = productRepository.findById(product.getId());


        Product dbProduct = byId.orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT));

        boolean contains = user.getCart().stream().anyMatch(cartEntry -> cartEntry.getProduct() == dbProduct);

        if (!contains) {
            user.addOrder(CartEntry.builder().product(dbProduct).user(user).quantity(1L).build());
            userRepository.save(user);
        }

        return ResponseEntity.ok(
                user.getCart().stream().map(
                        cartEntry -> OrderDTO
                                .builder()
                                .id(cartEntry.getId())
                                .product(cartEntry.getProduct())
                                .quantity(cartEntry.getQuantity()).build()
                ).collect(Collectors.toList())
        );
    }

    @Override
    public ResponseEntity<?> payCart() {
        System.out.println("help");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("FrameMyMemories");
        message.setTo("roman.tester@gmail.com");
        message.setSubject("Dziękujemy za zakupy!");
        message.setText(Literals.afterPurchase);
        emailSender.send(message);
        return null;
    }



}
