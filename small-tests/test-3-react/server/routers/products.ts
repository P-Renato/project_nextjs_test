import express from 'express';
import { getProducts, likeProduct } from '../controllers/products';

const router = express.Router();

router.get('/products', getProducts);
router.post('/products/like/:productId', likeProduct);

export default router;
