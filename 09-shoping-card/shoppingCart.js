import items from "./items.json"
import addGlobalEventListener from "./util/addGlobalEventListener"
import formatPrice from "./util/formatPrice.js"

const cartButton = document.querySelector("[data-cart-button]")
const cartItemWrapper = document.querySelector("[data-card-item-wrapper]")
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItamContainer = document.querySelector("[cart-item-container]")
const cartBadge = document.querySelector("[cart-badge]")
const cartTotalPrice = document.querySelector("[cart-total-price]")
const cart = document.querySelector("[data-cart]")
const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"
let shoppingCart = []
const IMAGE_URL = "https://dummyimage.com/210x130/"

export function setupShoppingCart() {
  addGlobalEventListener('click', '[data-remove-from-cart-button]', e => {
    const id = e.target.closest('[cart-item]').dataset.itemId
    removeCartItem(parseInt(id))
  })

  shoppingCart = loadCarts()
  renderCart()
}

function saveCarts() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}
function loadCarts() {
  const carts = sessionStorage.getItem(SESSION_STORAGE_KEY)
  return JSON.parse(carts) || []
}

export function removeCartItem(id) {
  const existingItem = shoppingCart.find((i) => i.id === id)
  if (existingItem === null) return
  shoppingCart = shoppingCart.filter((i) => i.id !== id)

  renderCart()
  saveCarts()
}

export function addToCart(id) {
  const existingItem = shoppingCart.find((i) => i.id === id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }

  renderCart()
  saveCarts()
}

function renderCart() {
  if (shoppingCart.length === 0) {
    cart.classList.add("invisible")
    cartItemWrapper.classList.add("invisible")
  } else {
    cart.classList.remove("invisible")
    renderCartsItems()
  }
}

function renderCartsItems() {
  cartItamContainer.innerHTML = ""

  // calculate total price
  const totalPrice = shoppingCart.reduce((total, cart) => {
    const item = items.find((i) => i.id === cart.id)
    return total + item.priceCents * cart.quantity
  }, 0)
  cartTotalPrice.innerText = formatPrice(totalPrice)

  // set up cart badge
  cartBadge.innerText = shoppingCart.reduce((total, cart) => {
    return total + parseInt(cart.quantity)
  }, 0)

  // render each cart
  shoppingCart.forEach((entery) => {
    const item = items.find((i) => i.id === entery.id)

    const cartItemCloned = cartItemTemplate.content.cloneNode(true)

    const cartItem = cartItemCloned.querySelector("[cart-item]")
    cartItem.dataset.itemId = item.id

    const cartImage = cartItemCloned.querySelector("[cart-item-image]")
    cartImage.src = `${IMAGE_URL}${item.imageColor}/${item.imageColor}/`

    const cartName = cartItemCloned.querySelector("[cart-item-name]")
    cartName.innerText = item.name

    if (entery.quantity > 1) {
      const cartQuantity = cartItemCloned.querySelector("[cart-item-quantity]")
      cartQuantity.innerText = `x${entery.quantity}`
    }

    const cartPrice = cartItemCloned.querySelector("[cart-item-price]")
    cartPrice.innerText = formatPrice(item.priceCents * entery.quantity)

    cartItamContainer.appendChild(cartItemCloned)
  })
}

// show/hide the cart when clicked
cartButton.addEventListener("click", () => {
  cartItemWrapper.classList.toggle("invisible")
})
