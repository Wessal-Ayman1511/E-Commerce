import express from 'express'
import { dbConnection } from './db/dbConnection.js';
import { user_routes } from './Modules/UserModule/UserRoutes.js';


const app = express();
dbConnection
app.use(express.json())
app.use(user_routes)




app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Something went wrong!" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
