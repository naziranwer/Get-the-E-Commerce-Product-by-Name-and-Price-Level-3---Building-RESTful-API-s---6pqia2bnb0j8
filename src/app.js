const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// console.log("products array",products);

// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price
products.forEach((product) => {
    console.log('Product:', product.name, 'Price:', product.price);
  });
  
app.get("/api/v1/products/:name/:price", (req,res)=>{
      let {name,price}=req.params;

    //   name=name.slice(1);
    //   price=price.slice(1);
      console.log("values from params",name," ",price);


      const user = products.find((product) => {
        return product.name.trim().toLowerCase() === name.trim().toLowerCase() && product.price === parseInt(price, 10);
      });
      
    
      console.log("user status",user);
      if(user){
        res.status(200).json(user);
      }
      else{
        res.status(404).send("Product not found");
      }
})

module.exports = app;
