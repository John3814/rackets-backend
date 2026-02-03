import { Request, Response, NextFunction } from "express"
import * as cartService from "../services/cart.service"
import { addToCartSchema } from "../validations/cart.validation"
import { ApiError } from "../utils/ApiError"

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = addToCartSchema.safeParse(req.body)

    if (!validation.success) {
      throw new ApiError("Datos inválidos", 400)
    }

    const item = await cartService.addToCart(validation.data)
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
}

export const getCart = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.getCart()
    res.json(cart)
  } catch (error) {
    next(error)
  }
}

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const racketId = Number(req.params.racketId)

    if (!racketId) {
      throw new ApiError("ID inválido", 400)
    }

    await cartService.removeFromCart(racketId)
    res.json({ message: "Producto eliminado del carrito" })
  } catch (error) {
    next(error)
  }
}

export const clearCart = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.clearCart()
    res.json(cart)
  } catch (error) {
    next(error)
  }
}
