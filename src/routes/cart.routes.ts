import { Router } from "express"
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller"

const router = Router()

router.get("/", getCart)
router.post("/add", addToCart)
router.delete("/:racketId", removeFromCart)
router.post("/checkout", clearCart)

export default router
