import express from 'express'
import { index, show, create, update, destroy } from '../handlers/orderHandler'
import { verifyAuthToken } from '../middleware/authentication'

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', verifyAuthToken, create)
  app.put('/orders/:id', update)
  app.delete('/orders/:id', destroy)
}

export default orderRoutes