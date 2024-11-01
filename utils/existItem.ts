// TYPETODO
export default function existItem(cartItems: any[], productID: string, color?: any, size?: any) {
  let result
  if (color) {
    result = cartItems.find(item => item.productID === productID && item.color?.id === color?.id)
  } else if (size) {
    result = cartItems.find(item => item.productID === productID && item.size?.id === size?.id)
  } else {
    result = cartItems.find(item => item.productID === productID)
  }

  return result
}
