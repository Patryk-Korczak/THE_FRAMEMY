package the.framemy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "user")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ElementCollection(fetch = FetchType.EAGER)
	private List<Role> roles;

	@Column(unique = true, nullable = false)
	private String email;

	@Column(nullable = false)
	private String password;

	private String firstName;

	private String secondName;

	private String phoneNumber;

	private String street;

	private String homeNumber;

	private String postal;

	private String city;

	@Column(nullable = false)
	private Boolean isActive = true;

	@OneToMany(cascade = {CascadeType.ALL})
	@JoinColumn(name = "cart_id")
	private List<CartEntry> cart;

	public void addOrder(CartEntry cartEntry) {
		if (cart == null) {
			cart = new ArrayList<>();
		}
		cartEntry.setUser(this);
		cart.add(cartEntry);
	}


}
