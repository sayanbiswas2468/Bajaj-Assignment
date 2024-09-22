import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/user.routes.js'
import cors from 'cors'
const app = express()

app.use(bodyParser.json({ limit: '50mb' }))

const PORT = 5000
app.use(cors());
app.use(routes)
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})