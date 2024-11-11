export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
    level: number;
    parent: string | null;
    children: Category[];
    colors: Colors;
}

type Colors = {
    start: string;
    end: string;
};

export interface User {
    _id: string
    name: string
    email: string
    role: string
    avatar: string
    created_at: string
    updated_at: string
    mobile: string
    root: boolean
    address: UserAddress
}

export interface UserAddress {
    city: string
    area: string
    country: string
    street: string
    postalCode: string
}


// TODO: Define the Product type CORRECTLY. THIS WAS COPILOT CREATED CODE
export interface Product {
    _id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    info: string;
    specification: string;
    category: string[];
    category_levels: Category[];
    sizes: string[];
    price: number;
    discount: number;
    inStock: number;
    rating: number;
    numReviews: number;
    created_at: string;
    updated_at: string;
}