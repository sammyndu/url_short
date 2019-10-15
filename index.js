const express = require("express");
const connectdb = require("./config/db")
const app = express();
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
const router = express.Router();

connectdb();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(express.json({extended: false}));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runnng on port ${PORT}`))
