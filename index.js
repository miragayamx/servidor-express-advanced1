const express = require("express");
const Productos = require("./productos");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const muestra = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3
  },
];

const productos = new Productos(muestra);

//GET
app.get("/api/productos/listar", (req, res) => {
  const lista = productos.getList();
  if (!lista.length)
    return res.status(404).json({ error: "no hay productos cargados" });
  res.status(200).json(lista);
});
app.get("/api/productos/listar/:id", (req, res) => {
  const producto = productos.getProduct(req.params.id);
  if (!producto.length)
    return res.status(404).json({ error: "producto no encontrado" });
  res.status(200).json(producto[0]);
});
//POST
app.post("/api/productos/guardar/", (req, res) => {
  const dataKeys = ['title', 'price', 'thumbnail'];
  const shapeMatches = dataKeys.every((el) => Object.keys(req.body).includes(el)); 
  if (!shapeMatches)
    return res
      .status(400)
      .json({ error: "los datos proporcionados son insuficientes" });
  const newProducto = productos.addProduct({
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  });
  res.status(200).json(newProducto);
});

const server = app.listen(PORT, () =>
  console.log(
    `El servidor esta corriendo en el puerto: ${server.address().port}`
  )
);

server.on("error", (err) => console.log(`Error de servidor: ${err}`));