export interface Products {
    data: Array<Product>;
    links: Links;
    meta: Meta;
}

export interface Product {
    commodity_type: "physical" | "digital";
    description: string;
    id: string;
    manage_stock: boolean;
    meta: ProductMeta;
    name: string;
    price: Array<Price>;
    relationships: ProductRelationships;
    sku: string;
    slug: string;
    status: string;
    type: string;
}

interface Price {
    amount: number;
    currency: string; 
    includes_tax: boolean;
}

interface ProductMeta {
    display_price: {
        with_tax: DisplayPrice;
        without_tax: DisplayPrice;
    };
    stock: {
        level: number;
        availability: "in-stock" | "out-stock"
    };
    variations: any;
    timestamps: Timestamps;
}

interface DisplayPrice {
    amount: number;
    currency: string;
    formatted: string;
}

interface Timestamps {
    created_at: string;
    updated_at: string;
}

interface ProductRelationships {
    main_image: {
        data: Array<{
            type: string; 
            id: string;
        }>
    };
    files: {
        data: Array<{
            type: string; 
            id: string;
        }>
    };
    variations: any;
}

interface Links {
    current: string;
    first: string;
    last: string;
}

interface Meta {
    page: {
        current: number;
        limit: number;
        offset: number;
        total: number;
    };
    results: {
        total: number; 
        all: number;
    }
}