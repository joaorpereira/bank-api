import express, { Express } from 'express'
import { AddressInfo } from 'net'
import dotenv from 'dotenv'
import cors from 'cors'
import usersRoutes from './routes/usersRoutes'
import accountsRoutes from './routes/accountsRoutes'
import transactionsRoutes from './routes/transactionsRoutes'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/transactions', transactionsRoutes)
app.use('/accounts', accountsRoutes)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Serving running in http://localhost: ${address.port}`)
  } else {
    console.error(`Failure starting server`)
  }
})
