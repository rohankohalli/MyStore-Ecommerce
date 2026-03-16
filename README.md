# MyStore

A full-stack e-commerce application built to explore real-world patterns like authentication, product management, cart flows, and seller features using React and Node.js.

---

## Stack

Frontend

* React
* TailwindCSS
* Axios

Backend

* Node
* Express
* Sequelize
* MySQL

Auth

* JWT (access + refresh tokens)

---

## Features

### Authentication

Users can create accounts and securely log in using JWT authentication.
The system uses access and refresh tokens to maintain sessions.

### Profile & Addresses

Users can update profile information, change passwords, and manage multiple addresses.
A default address can be selected for checkout.

### Product Browsing

Users can explore products, view product details, and browse items by category.

### Cart

Users can add products to the cart, update quantities, and remove items.

### Checkout & Orders

Users can place orders using saved addresses and view their order history and order details.

### Seller Tools

Sellers can create, update, and delete products and manage incoming orders.

### UI

The interface includes responsive layouts, a category carousel, and interactive UI elements such as password visibility toggles.


---

<!--
## Screenshots

### Home
![Home](./screenshots/home.png)

### Product Listing
![Products](./screenshots/products.png)

### Checkout
![Checkout](./screenshots/checkout.png)

### Seller Dashboard
![Seller](./screenshots/seller.png)
-->

---

## Run Locally

Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```
frontend/
backend/
```

Frontend → React UI
Backend → REST API

---

Built by **Rohan Kohalli**
