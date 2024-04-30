// components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Product } from '../types/types';
import fetchProducts from '../api/products';
import ProductCard from './ProductCard';

interface ProductListProps {

}

const ProductList: React.FC<ProductListProps> = ({ }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = await fetchProducts(1, 10, 'id', 'DESC');
                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();

        return () => {

        };
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
