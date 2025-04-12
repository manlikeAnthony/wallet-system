
# 💰 Wallet System

A secure Node.js wallet funding system powered by Stripe. Users can fund their wallet with real-time updates via webhooks.

---

## 🚀 Features

- Stripe Checkout Integration  
- Wallet funding with metadata tracking  
- Webhook listener for payment verification  
- User balance updates after successful payment  
- Token-based authentication (JWT)  
- Modular and scalable code structure  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose)  
- **Payments:** Stripe  
- **Auth:** JWT  
- **Others:** dotenv, http-status-codes  

---

## 📦 Installation

```bash
git clone https://github.com/manlikeAnthony/WALLET_SYSTEM.git
cd WALLET_SYSTEM
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## 🧪 Test Funding (Dev Mode)

1. Start your app:

```bash
npm run dev
```

2. Start Stripe webhook forwarding:

```bash
stripe listen --forward-to localhost:5000/api/v1/wallet/webhook
```

3. Hit the funding route (POST `/api/v1/wallet/fund-wallet`) with JSON body:

```json
{
  "amount": 500
}
```

Use [Stripe test cards](https://stripe.com/docs/testing) when checking out.

---

## 📂 Endpoints

- `POST /api/v1/wallet/fund-wallet` – Initiates Stripe Checkout  
- `POST /api/v1/wallet/webhook` – Stripe webhook listener  
- `GET /api/v1/wallet/check-balance` – View current user balance  

---

## 🧠 Developer Notes

- The webhook logic handles balance updates based on metadata sent during session creation.  
- Webhook security is enforced via Stripe signature verification.

---

## 👨‍💻 Author

**Anthony**  
_Student | Backend Dev_  
[GitHub](https://github.com/manlikeAnthony)

---

## 🧾 License

MIT License
```

---

Paste that into your `README.md` and you're good to go. Let me know if you want a logo or badges later — we can make it look extra spicy 🌶️.
