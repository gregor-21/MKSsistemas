import React, { useState } from 'react';
import { useCart, CartItem } from './CartContext';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '../types/types';


const CartDrawer: React.FC = () => {
    const { items, subtotal, removeFromCart, addToCart, isCartOpen, toggleCart } = useCart(); // Use o estado do contexto

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    const handleRemoveItem = (productId: number) => {
        removeFromCart(productId);
    };

    const handleRemoveAllItems = (productId: number) => {
        const removedItem = items.find((cartItem: CartItem) => cartItem.product.id === productId);
        if (removedItem) {
            const removedQuantity = removedItem.quantity;
            for (let i = 0; i < removedQuantity; i++) {
                removeFromCart(productId);
            }
        }
    };



    return (
        <Drawer
            anchor="right"
            open={isCartOpen}
            onClose={toggleCart}
            sx={{ '& .MuiDrawer-paper': { backgroundColor: 'primary.main' } }}
        >
            <div style={{ width: '300px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ padding: '10px', color: "white" }}>Carrinho de Compras</h2>
                <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                    <List>
                        {items.map((cartItem: CartItem) => (
                            <React.Fragment key={cartItem.product.id}>
                                <ListItem>
                                    <div style={{
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        marginBottom: '4px',
                                        width: '46vh'
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundImage: `url(${cartItem.product.photo})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            marginRight: '10px'
                                        }}>
                                        </div>
                                        <ListItemText
                                            primary={`${cartItem.product.brand} ${cartItem.product.name}`}
                                            secondary={`R$${cartItem.product.price}`}
                                        />
                                        <IconButton
                                            aria-label="remove"
                                            onClick={() => handleRemoveItem(cartItem.product.id)}
                                            disabled={cartItem.quantity === 1}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        {cartItem.quantity}
                                        <IconButton
                                            aria-label="add"
                                            onClick={() => handleAddToCart(cartItem.product)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleRemoveAllItems(cartItem.product.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </div>
                <div style={{ position: 'sticky', bottom: 0, backgroundColor: 'primary.main', padding: '10px' }}>
                    <p style={{ color: "white" }}>Total: ${subtotal}</p>
                    <button style={{ backgroundColor: 'black', color: 'white', width: '100%', padding: '10px', border: 'none' }}>Finalizar Compra</button>
                </div>
            </div>
        </Drawer>
    );

};

export default CartDrawer;
