const User = require("../models/user");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const Stripe = require("stripe")(process.env.STRIPE_API_KEY);

const fundWallet = async (req, res) => {
  const { amount } = req.body;
  if(!amount || amount <= 0){
    throw new CustomError.BadRequest('you must provide an amount greater than 0')
  }
  const session = await Stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "ngn",
          product_data: { name: "Wallet funding" },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: req.user.userId,
      amount : amount
    },
    success_url: "http://localhost:5000/api/v1/wallet/success",
    cancel_url: "http://localhost:5000/api/v1/wallet/cancel",
  });
  res.status(StatusCodes.OK).json({ url: session.url });
};

//stripe listen --forward-to localhost:5000/api/v1/wallet/webhook

const walletWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = Stripe.webhooks.constructEvent(req.body,sig , process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).send('webhook verification failed')
  }


  if(event.type === 'checkout.session.completed'){
    const session = event.data.object;

    const userId = session.metadata?.userId;
    const email = session.metadata?.email;
    const amount = Number(session.metadata?.amount)

  if(userId){
    try {
      const user = await User.findOne({_id : userId});
      if (!user) {
        console.error(`No user found with email: ${email}`);
        return res.status(StatusCodes.NOT_FOUND).send("User not found");
      }
      user.balance +=amount;
      await user.save()
      console.log(`User ${user.name} with id ${user._id} funded ${amount} in his wallet`)
    } catch (error) {
      console.log("error adding amount to balance",error)
    }
  } else{
    console.log("no user found in metadata")
  }
}

res.status(200).send("Webhook received");
};

const checkBalance = async (req, res) => {
  const user = await User.findOne({_id : req.user.userId});
  res.status(StatusCodes.OK).json({name : user.name , balance : user.balance});

};

module.exports = {
  fundWallet,
  checkBalance,
  walletWebhook
};
