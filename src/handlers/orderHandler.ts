import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index()
    res.json(orders)
    console.log('this is the INDEX route')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id)
    res.json(order)
    console.log('this is the SHOW route')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  } as Order

  try {
    const newOrder = await store.create(order)
    res.json({ message: 'Order created successfully', newOrder })
    console.log('this is the CREATE route')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const update = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  } as Order

  try {
    const editOrder = await store.edit(order)
    res.json({ message: 'Order updated successfully', editOrder })
    console.log('this is the EDIT route')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id)
    res.json({ message: `Order ${req.params.id} deleted`, deleted })
    console.log('this is the DELETE route')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}