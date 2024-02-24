package the.framemy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import the.framemy.model.Product;

@Data
@Builder
@AllArgsConstructor
public class OrderDTO {
	private long id;
	private Product product;
	private Long quantity;
}
