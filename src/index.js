const path = require('path')
const express = require ('express')
require('./db/mongoose')
var http = require('http')
const cors= require('cors')
const Order= require('./models/order')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const app = express()
const multer = require('multer')

const passport = require("passport");
   
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const orderRouter = require('./routers/order')

const port =process.env.PORT 

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)

app.use(cors());


app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  
// DB Config
const db = require("../config/keys").mongoURI;


// Passport middleware
app.use(passport.initialize());

// Passport config
require("../config/passport")(passport);

app.post('/orders', (req,res) =>{
    const order = new Order(req.body)
    order.save().then(() => {
        res.send(order)
    }).catch(()=>{
    })
});

  

 const server = http.createServer(app);
app.listen(port, () =>{
    console.log('server is up on the port '+ port)
})



// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()