import { cloneTemplate } from "../cloneTemplate"
import "./menu-bar.css"

interface MenuItemAction {
  label: string
  action: () => void
}

interface MenuItemLink {
  label: string
  link: string
}

type MenuItem = MenuItemAction | MenuItemLink

const MENU_BAR: HTMLElement = document.getElementById("menu-bar")!

export default class MenuBar {
  async addMenu(title: string, items: Array<MenuItem>) {
    const newMenu = cloneTemplate("messy-menu")!
    newMenu.querySelector(".menu__title")!.textContent = title
    const menuItems = newMenu.querySelector<HTMLDivElement>(".menu__items")!

    const menu = menuItems.closest(".menu")!
        
    menuItems.addEventListener("click", () => {
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur()
      }
      menuItems.style.display = "none"
      
      const tryRemoveStyle = () => {
        requestAnimationFrame(() => {
          if (menu.matches(":hover")) {
            tryRemoveStyle()
          } else {
            menuItems.style.display = ""
          }
        })
      }
      tryRemoveStyle()
    })

    items.forEach(item => {
      if ("link" in item) {
        const menuLink = document.createElement("a")
        menuLink.className = "menu__item"
        menuLink.textContent = item.label
        menuLink.href = item.link
        menuLink.target = "_blank"
        menuItems.appendChild(menuLink)
      } else {
        const menuItem = cloneTemplate("messy-menu-item")!
        menuItem.textContent = item.label
        menuItem.addEventListener("click", item.action)
        menuItems.appendChild(menuItem)
      }
    })

    MENU_BAR.appendChild(newMenu)

  }
}
