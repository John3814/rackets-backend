import prisma from "../config/db"
import { AddToCartDTO } from "../dtos/cart.dto"

export const getActiveCart = async () => {
  let cart = await prisma.cart.findFirst({
    where: { status: "ACTIVE" },
    include: {
      items: {
        include: {
          racket: true
        }
      }
    }
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {},
      include: {
        items: {
          include: {
            racket: true
          }
        }
      }
    })
  }

  return cart
}

export const addToCart = async (data: AddToCartDTO) => {
  const cart = await getActiveCart()

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      racketId: data.racketId
    }
  })

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + data.quantity
      }
    })
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      racketId: data.racketId,
      quantity: data.quantity
    }
  })
}

export const getCart = async () => {
  return getActiveCart()
}

export const removeFromCart = async (racketId: number) => {
  const cart = await getActiveCart()

  return prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
      racketId
    }
  })
}

export const clearCart = async () => {
  const cart = await prisma.cart.findFirst({
    where: { status: "ACTIVE" },
    include: {
      items: {
        include: {
          racket: true
        }
      }
    }
  })

  if (!cart) throw new Error("No active cart")

  return prisma.$transaction(async (tx) => {

    // Validar stock
    for (const item of cart.items) {
      if (item.racket.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${item.racket.name}`)
      }
    }

    // Descontar stock
    for (const item of cart.items) {
      await tx.racket.update({
        where: { id: item.racketId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    // Cerrar carrito
    await tx.cart.update({
      where: { id: cart.id },
      data: { status: "COMPLETED" }
    })

    // Crear nuevo carrito
    const newCart = await tx.cart.create({ data: {} })

    return newCart
  })
}
