'use strict';
const express = require('express')
const Product = require('../models/product')
const router = new express.Router()
const multer=require('multer')

const upload = multer({
    dest:'avatars',
    filesize:1000000
}
)

router.post('/products', async (req,res) =>{
   
    const product = new Product(req.body)
    try{
        await product.save()
        res.send(product)
       
    }catch(e){
        res.status(400).send(e)
    }
    
 })


 router.get('/products',async(req,res) =>{
try{
    const products= await Product.find({})
    res.send(products)
   
}catch (e){
    res.status(500).send(e)
}
 })

 router.post('/cart', async(req, res) => {
     try{
        const products= await Product.find({}),id = null;
        let cart = JSON.parse(req.body.cart);
        if (!cart) return res.json(products)
        
    for (var i = 0; i < data.products.length; i++) {
        id = data.products[i].id.toString();
        if (cart.hasOwnProperty(id)) {
          data.products[i].qty = cart[id]
          products.push(data.products[i]);
        }
      }
      return res.json(products);
     } catch(e){
        res.status(500).send(e)
     }

    })
  


 
 router.get('/products/bread',async(req,res) =>{
    try{
        const products= await Product.find({"product_category":"bread"})
        res.send(products)
    }catch (e){
        res.status(500).send(e)
    }
     })

     
 router.get('/products/dairy',async(req,res) =>{
    try{
        const products= await Product.find({"product_category":"dairy"})
        res.send(products)
    }catch (e){
        res.status(500).send(e)
    }
     })


     
 router.get('/products/fruits',async(req,res) =>{
    try{
        const products= await Product.find({"product_category":"fruit"})
        res.send(products)
    }catch (e){
        res.status(500).send(e)
    }
     })


     
 router.get('/products/spices',async(req,res) =>{
    try{
        const products= await Product.find({"product_category":"spices"})
        res.send(products)
    }catch (e){
        res.status(500).send(e)
    }
     })


     router.get('/products/vegetables',async(req,res) =>{
    try{
        const products= await Product.find({"product_category":"vegetable"})
        res.send(products)
    }catch (e){
        res.status(500).send(e)
    }
     })
     

     

 module.exports = router