package the.framemy.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import the.framemy.model.Product;
import the.framemy.repository.ProductRepository;
import the.framemy.service.IProductService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

	private final ProductRepository productRepository;

	@Override
	public ResponseEntity<List<Product>> getAllProducts() {
		return ResponseEntity.ok(
				productRepository.findAll()
		);
	}
}
