const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const productRouter = require('./routes/product.js');
const customersRouter = require('./routes/customers.js');
const cors = require('cors');
const { contentType } = require('express/lib/response');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/products", productRouter);
app.use("/customers", customersRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" }).send(console.log('ok'));
});

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