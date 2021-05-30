const {STRIPE_SECRET_KEY} = require('../config/config')
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const stripeRouter = require('express').Router()

// prod_JIXG5UquuQkAfz price_1IfwBvCxlsK8q03cgGixs6My
// prod_JIXHRNcbtxYuW0 price_1IfwExCxlsK8q03chdBGFhvY
// prod_JIXJa7Lwnb0xtU price_1IfwDLCxlsK8q03c3GGKCEwP

// ROUTES
// /create-customer
// /create-subscription

stripeRouter.post('/create-customer', async (req, res) => {
  // Save the customer.id in your database alongside your user.
  // We're simulating authentication with a cookie.
  // res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });

  try {
    const customer = await stripe.customers.create({
    email: req.body.email,
  });
    res.send(customer.id);
  }
  catch (err){
    res.status(500).send(err);
  }
});

stripeRouter.post('/create-subscription', async (req, res) => {
  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceKey }],
    expand: ['latest_invoice.payment_intent'],
  });

  res.send(subscription);
});

module.exports = stripeRouter
