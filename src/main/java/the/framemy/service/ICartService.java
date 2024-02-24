package the.framemy.service;

import org.springframework.http.ResponseEntity;
import the.framemy.model.Product;
import the.framemy.model.dto.OrderDTO;

import java.util.List;

public interface ICartService {
	ResponseEntity<List<OrderDTO>> getCartProducts();
	ResponseEntity<?> putOrder(OrderDTO orderDTO);
	ResponseEntity<?> addItemToCart(Product product);
	ResponseEntity<?> payCart();
}
