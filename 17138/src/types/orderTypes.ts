import { Product } from "./ProductTypes";
import { User } from "./userTypes";

export interface OrderState {
    orders: Order[] | null;
    orderItem: OrderItem | null;
    curentOrder: Order | null;
    loading: boolean;
    error: string | null;
    orderCancelled: boolean;
}

export interface Order {
    id: number;
    orderId: number;
    user:User;
    sellerId: number;
    orderItems: OrderItem[];
    orderDate: string;
    shippingAddress: string;
    paymentDetails: any;
    totalMrpPrice: number;
    totalSellingPrice: number;
    discount: number;
    orderStatus: OrderStatus;
    totalItem: number;
    deliveryDate: string;
}

export enum OrderStatus {
    PENDING = "PENDING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export interface OrderItem {
    id: number;
    order: Order;
    product: Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}