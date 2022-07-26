const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const productRouter = require('./routes/product.js');
const customersRouter = require('./routes/customers.js');
const user_as_productsRouter = require('./routes/user_as_products');
const ordersRouter = require('./routes/orders.js');
const orders_adressesRouter = require('./routes/orders_adresses.js');
const cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/products", productRouter);
app.use("/customers", customersRouter);
app.use("/user_as_products", user_as_productsRouter);
app.use("/orders", ordersRouter);
app.use("/orders_adresses", orders_adressesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});