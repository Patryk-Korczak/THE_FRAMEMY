package the.framemy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import the.framemy.service.IProductService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/product/")
public class ProductController {

	private final IProductService productService;

	@GetMapping("/all")
	public ResponseEntity<?> getAllProducts() {
		return productService.getAllProducts();
	}
	
}
