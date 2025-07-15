import { Product } from "./ProductTypes";
import { User } from "./userTypes";

export interface CartItem {
    id: number;
    cart?:Cart;
    product:Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
    }

export interface Cart {
    id: number;
    user: User;
    cartItems: CartItem[];
    totalSellingPrice: number;
    totalItem: number;
    totalMrpPrice: number;
    discount: number;
    couponCode: string;
}