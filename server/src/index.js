import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import sequelize from './config/dbConn.js'
import { errorHandler } from './middleware/errorHandler.js'
import './models/Associations.js'
import addressRoutes from './routes/addressRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productroutes from './routes/productRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use('/uploads', express.static("uploads"))

app.get('/test', (req, res) => { res.send("Server Running", port) })

app.use('/auth', authRoutes)
app.use('/products', productroutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminRouter)
app.use('/seller', sellerRoutes)
app.use('/address', addressRoutes)

app.use(errorHandler)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connected to Database")
        await sequelize.sync()

        app.listen(port, () => { console.log(`Server listening on port:${port}`) })
    } catch (err) {
        console.error("Failed to start server:", err)
    }
}

startServer()
