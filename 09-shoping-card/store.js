import formatPrice from "./util/formatPrice.js"
import items from "./items.json"
import { addToCart } from "./shoppingCart.js"
import addGlobalEventListener from "./util/addGlobalEventListener.js"

const itemTemplate = document.querySelector("#list-item-template")
const storeItemContainer = document.querySelector("#store-item-container")
const ITEM_URL = "https://dummyimage.com/420x260/"

export function setupItems() {
  if (storeItemContainer == null) return

  // add to cart
  addGlobalEventListener("click", "[store-item-addToCart]", (e) => {
    const id = e.target.closest("[store-item]").dataset.itemId
    addToCart(parseInt(id))
  })

  items.forEach(renderItems)
}

// render items.  from items.json to store.html
function renderItems(item) {
  const storeItemCloned = itemTemplate.content.cloneNode(true)

  const storeItem = storeItemCloned.querySelector("[store-item]")
  storeItem.dataset.itemId = item.id

  const storeItemName = storeItemCloned.querySelector("[store-item-name]")
  storeItemName.innerText = item.name

  const storeItemCategory = storeItemCloned.querySelector(
    "[store-item-category]"
  )
  storeItemCategory.innerText = item.category

  const storeItemPrice = storeItemCloned.querySelector("[store-item-price]")
  storeItemPrice.innerText = formatPrice(item.priceCents)

  const storeItemImage = storeItemCloned.querySelector("[store-item-image]")
  storeItemImage.src = `${ITEM_URL}${item.imageColor}/${item.imageColor}`

  storeItemContainer.appendChild(storeItemCloned)
}
