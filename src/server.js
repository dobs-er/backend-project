import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000


// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

//Get the directory name from the file path
const __dirname = path.dirname(__filename)

// Middleware
app.use(express.json())

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is Running on Port ${PORT}`)
})