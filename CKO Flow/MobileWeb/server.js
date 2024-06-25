const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Insert your secret key here
const SECRET_KEY = "sk_sbox_2wbc5v6l62ygbntp5gni6k5ypqz";

app.post("/create-payment-sessions", async (_req, res) => {
  // Create a PaymentSession
  const request = await fetch(
    "https://api.sandbox.checkout.com/payment-sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50,
        currency: "EUR",
        reference: "ORD-test0001",
        description: "Payment for Women Tshirt",
        billing_descriptor: {
          name: "Dyan Yuan",
          city: "Berlin",
        },
        customer: {
          email: "dyan.yuan@example.com",
          name: "Dyan Yuan",
        },
        items: [
          {
            name: "Pocket Striped T Shirt/M/White",
            quantity: 1,
            unit_price: 50,
          },
        ],
        shipping: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "Berlin",
            zip: "10115",
            country: "DE",
          },
          phone: {
            number: "1234567890",
            country_code: "+49",
          },
        },
        processing_channel_id: "pc_56oh7ociwgkebnldq7t2kxpc4i",
        billing: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "Berlin",
            zip: "10115",
            country: "DE",
          },
          phone: {
            number: "1234567890",
            country_code: "+49",
          },
        },
        risk: {
          enabled: true,
        },
        "3ds":{
          enabled: true,
        },
        payment_method_configuration:{
          card:{
            store_payment_details:"enabled",
          },
        },
        success_url: "http://localhost:3000/?status=succeeded",
        failure_url: "http://localhost:3000/?status=failed",
        metadata: {},
        enabled_payment_methods:[
           "card",
          "applepay",
          "googlepay",
          "sofort",
        ],
      }),
    }
  );

  const parsedPayload = await request.json();

  res.status(request.status).send(parsedPayload);
});

app.listen(3000, () =>
  console.log("Node server listening on port 3000: http://localhost:3000/")
);
