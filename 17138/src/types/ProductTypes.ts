import { Seller } from "./SellerTypes";

export interface Product {
id: number;
title: string;
description: string;
mrpprice: number;
sellingprice: number;
discountPercent: number;
quantity: number;
color: string;
images: string[];
numRatings?: number;
category?:Category;
seller?: Seller;
createdAt?: Date;
sizes?: string;
}

export interface Category {
    id?: number;
    name: string;
    categoryId: string;
    parentCategoryId?: string;
    level: number;
}
    