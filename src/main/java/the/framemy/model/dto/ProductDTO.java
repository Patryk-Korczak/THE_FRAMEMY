package the.framemy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class ProductDTO {
	private String title;
	private String description;
	private String imageUrl;
	private BigDecimal price;
	private long inStock;
}
