import { Cart, CartItem } from "../../domain/cart"

export function addItemToCart(cart: Cart, item: CartItem): Cart {
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (cartItem) => cartItem.id === item.id && cartItem.size === item.size
  )

  if (existingItemIndex !== -1) {
    // If item exists, update quantity
    const updatedItems = [...cart.items]
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      quantity: updatedItems[existingItemIndex].quantity + item.quantity,
    }

    return {
      ...cart,
      items: updatedItems,
    }
  }

  // If item doesn't exist, add it to cart
  return {
    ...cart,
    items: [...cart.items, item],
  }
}
