export interface Product {
    title: string;
    description: string;
    id: number;
    imageUrl: string;
    inStock: number;
    price: number;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}