import { Cart } from "./cartTypes";

export interface Coupon {
    id: number;
    code: string;
    discountPercentage: number;
    validityStartDate: string;
    validityEndDate: string;
    minmumOrderValue: number;
    active: boolean;
}

export interface CouponState {
    coupons: Coupon[] | null;
    cart: Cart | null;
    loading: boolean;
    error: string | null;
    couponCreated: boolean;
    couponApplied: boolean;
}