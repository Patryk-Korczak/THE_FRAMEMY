package the.framemy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "cart_entry")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "product_id")
    private Product product;

    private Long quantity;

    @Override
    public String toString() {
        return "id=" + id + " user=" + user.getId() + " product=" + product.getId() + ";";
    }
}
