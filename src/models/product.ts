import client from "../database";

export type Product = {
  id?: string
  name: string
  price: string
  category: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [product.name, product.price, product.category])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async edit(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'UPDATE products SET name=($1), price= ($2), category= ($3) WHERE id=($4) RETURNING *'
      const result = await conn.query(sql, [product.name, product.price, product.category, product.id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'DELETE FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }

  }
}