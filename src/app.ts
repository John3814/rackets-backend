import express from 'express'
import cors from 'cors'

const app = express()

// middlewares
app.use(cors())
app.use(express.json())


// ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: "API funcionando!"})
})

// servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
