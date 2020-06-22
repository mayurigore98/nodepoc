const router = require('express').Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.get('/order', auth, async (req, res) => {
  try {
    let order = await Order.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(order);
  } catch (error) {
    console.log('error', error.message);
    res.status(500).send('server error');
  }
});

router.post('/order', auth, async (req, res) => {
  try {
    let { cartItems, paymentStatus } = req.body;
    let order = await Order.findOne({ paymentID });
    if (!order) {
      order = new Order({
        userId: req.user.id,
        cartItems,
        paymentStatus,
      });
      await order.save();
      return res.json(order);
    }
    res.send({ msg: 'Order already exists!' });
  } catch (error) {
    console.log('error', error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
