package the.framemy.service;


import org.springframework.http.ResponseEntity;
import the.framemy.model.Product;

import java.util.List;

public interface IProductService {
	ResponseEntity<List<Product>> getAllProducts();
}
