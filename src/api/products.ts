import axios from 'axios';
import { Product } from '../types/types';

const API_URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1';

const fetchProducts = async (page: number, rows: number, sortBy: string, orderBy: string): Promise<Product[]> => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            params: {
                page,
                rows,
                sortBy,
                orderBy
            }
        });

        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

export default fetchProducts;
