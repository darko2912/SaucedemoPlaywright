import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page
    readonly productSort: Locator

    constructor(page: Page) {
        this.page = page
        this.productSort = page.locator('.product_sort_container')
    }

    //--------------------------------

    async sortProducts(sortBy: string) {
        await this.productSort.selectOption(sortBy)
    }

    async addToCart(product: string) {
        await this.page.locator('#add-to-cart-' + product).click()
    }

    async removeFromCart(product: string) {
        await this.page.locator('#remove-' + product).click()
    }

    async clickOnProductName(productName: string) {
        await this.page.getByText(productName).click()
    }
}