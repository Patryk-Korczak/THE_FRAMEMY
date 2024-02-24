package the.framemy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import the.framemy.annotation.IsCustomer;
import the.framemy.model.Product;
import the.framemy.model.dto.OrderDTO;
import the.framemy.service.ICartService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/cart/")
public class CartController {
	private final ICartService cartService;

	@IsCustomer
	@GetMapping("/product")
	public ResponseEntity<List<OrderDTO>> getCart() {
		return cartService.getCartProducts();
	}

	@IsCustomer
	@PutMapping("/product")
	public ResponseEntity<?> putOrder(@RequestBody OrderDTO orderDTO) {
		return cartService.putOrder(orderDTO);
	}

	@IsCustomer
	@PostMapping("/product")
	public ResponseEntity<?> newOrder(@RequestBody Product product) {
		return cartService.addItemToCart(product);
	}

	@IsCustomer
	@GetMapping("/pay")
	public ResponseEntity<?> payCart() {
		return cartService.payCart();
	}
}
