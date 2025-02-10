import express from 'express'
import { dbConnection } from './db/dbConnection.js';
import { user_routes } from './Modules/UserModule/UserRoutes.js';
import cookieParser from 'cookie-parser';
import category_routes from './Modules/CategoryModule/CategoryRoutes.js';
import { product_routes } from './Modules/ProductModule/ProductRoutes.js';

dbConnection
const app = express();
app.use(cookieParser()); 
app.use(express.json())
app.use(user_routes)
app.use(category_routes)
app.use(product_routes)




app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Something went wrong!" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
