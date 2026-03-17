# MyStore

A full-stack e-commerce application built to explore real-world patterns such as authentication, product management, cart flows, checkout, and seller functionality using React and Node.js.

---

<!--## Purpose

This project was built to practice designing and implementing a complete application across the frontend and backend.
The focus was on understanding how different parts of an e-commerce system interact, including authentication, API design, state management, and database relationships.

---
-->
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

## System Architecture

The application follows a typical client–server architecture.

```
React (Frontend)
       ↓
Axios API Requests
       ↓
Express REST API
       ↓
Sequelize ORM
       ↓
MySQL Database
```

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

---

-->

## Features

Authentication

* User registration and login
* JWT authentication with access and refresh tokens
* Forgot and reset password flow

Profile & Addresses

* Update profile information
* Change password
* Manage multiple addresses
* Set default address for checkout

Product Browsing

* Browse products
* View product details
* Filter products by category

Cart

* Add products to cart
* Update cart item quantities
* Remove items from cart

Checkout & Orders

* Select address during checkout
* Create orders from cart items
* View order history and order details

Seller Tools

* Create products
* Update product details
* Delete products
* View seller orders

UI

* Responsive layout
* Category carousel
* Password visibility toggle

---

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

<!--Built by **Rohan Kohalli**-->
