import express from 'express'
import { dbConnection } from './db/dbConnection.js';


const app = express();
dbConnection
app.use(express.json())




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
