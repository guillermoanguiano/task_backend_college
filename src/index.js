import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config.js'
import chalk from './utils/colors.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.listen(config.PORT, () => {
    chalk.info(`Server running on port ${config.PORT}`)
})


export default app