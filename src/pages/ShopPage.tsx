import React from 'react';
import RootLayout from '../app/layout';
import ProductList from '../components/productList';
import CartDrawer from '../components/CartDrawer';
import { CartProvider, useCart } from '../components/CartContext';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShopPage: React.FC = () => {
    return (
        <CartProvider>
            <RootLayout>
                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="white" sx={{ flexGrow: 1 }}>
                            MKS Sistemas
                        </Typography>
                        <CartButton />
                    </Toolbar>
                </AppBar>
                <div style={{ paddingTop: '64px' }}>
                    <ProductList />
                    <CartDrawer />
                </div>
            </RootLayout>
        </CartProvider>
    );
};

const CartButton: React.FC = () => {
    const { isCartOpen, toggleCart, items } = useCart();

    return (
        <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={items.reduce((acc, item) => acc + item.quantity, 0)} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    );
};

export default ShopPage;