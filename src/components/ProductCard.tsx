import React from 'react';
import { Product } from '../types/types';
import { useCart } from './CartContext';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Button from '@mui/material/Button';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };
    const formattedPrice = Number(product.price).toFixed(2).replace(/\.00$/, '');
    return (
        <div style={{ display: 'inline-block', width: '200px', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: '#f0f0f0',
                marginBottom: '10px',
                backgroundImage: `url(${product.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f0f0f0'
            }}>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '5px' }}>{product.brand} {product.name}</h2>
                </div>
                <div style={{ background: 'rgb(77, 77, 77)', color: 'white', padding: '5px', borderRadius: '5px' }}>
                    R${formattedPrice}
                </div>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingBagIcon style={{ fontSize: '24px' }} />}
                    onClick={handleAddToCart}
                    style={{ width: '100%', borderRadius: 0 }}
                >
                    Comprar
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
