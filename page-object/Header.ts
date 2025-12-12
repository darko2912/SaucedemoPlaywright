import { expect, Locator, Page } from "@playwright/test";
import { URLs } from "../helpers/URLs";

export class Header {
    readonly page: Page
    readonly hamburgerMenu: Locator
    readonly pageTitle: Locator
    readonly cartIcon: Locator
    readonly shoppingCartBadge: Locator

    constructor(page: Page) {
        this.page = page
        this.hamburgerMenu = page.locator('#react-burger-menu-btn')
        this.pageTitle = page.locator('.app_logo')
        this.cartIcon = page.locator('.shopping_cart_link')
        this.shoppingCartBadge = page.locator('.shopping_cart_badge')
    }

    //--------------------------

    async assertLogin() {
        await expect(this.page).toHaveURL(URLs.inventoryURL)
        await expect(this.hamburgerMenu).toBeVisible()
        await expect(this.cartIcon).toBeVisible()
        await expect(this.pageTitle).toHaveText('Swag Labs')
    }

    async clickOnHamburgerMenu() {
        await this.hamburgerMenu.click()
    }

    async assertCartBadge(numProducts: string) {
        await this.cartIcon.scrollIntoViewIfNeeded()
        await expect(this.shoppingCartBadge).toBeVisible()
        await expect(this.shoppingCartBadge).toHaveText(numProducts)
    }

    async clickOnCartIcon() {
        await this.cartIcon.click()
    }
}