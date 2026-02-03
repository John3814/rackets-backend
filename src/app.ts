import express from 'express'
import cors from 'cors'
import racketRoutes from './routes/racket.routes'
import { errorHandler } from './middlewares/error.middleware'
import cartRoutes from './routes/cart.routes'

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api/rackets', racketRoutes)
app.use(errorHandler)
app.use('/api/cart', cartRoutes)


// ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: "API funcionando!"})
})

// servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
