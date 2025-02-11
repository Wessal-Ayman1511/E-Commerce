import express from 'express'
import { dbConnection } from './db/dbConnection.js';
import { user_routes } from './Modules/UserModule/UserRoutes.js';
import { cart_routes } from './Modules/CartModule/CartRoutes.js';
import cookieParser from 'cookie-parser';
import category_routes from './Modules/CategoryModule/CategoryRoutes.js';
import { product_routes } from './Modules/ProductModule/ProductRoutes.js';
import uploads_router from './Modules/uploadRoutes/uploadRoutes.js';
import path from "path";
<<<<<<< HEAD
import { order_routes } from './Modules/OrderModule/OrderRoutes.js';

=======
>>>>>>> d9b261b7731048aa2dd78f619c4f1612aede7831

dbConnection
const app = express();
app.use(cookieParser()); 
app.use(express.json())
app.use(user_routes)
app.use(category_routes)
app.use(product_routes)
app.use(cart_routes)
<<<<<<< HEAD
app.use(order_routes)

=======
>>>>>>> d9b261b7731048aa2dd78f619c4f1612aede7831

const __dirname = path.resolve();
app.use(uploads_router, express.static(path.join(__dirname + "/uploads")));




app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Something went wrong!" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
