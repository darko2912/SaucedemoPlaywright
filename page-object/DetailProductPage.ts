import { expect, Locator, Page } from "@playwright/test";

export class DetailProductPage {
    readonly page: Page
    readonly backToProductsPage: Locator
    readonly titleProduct: Locator
    readonly addToCartButton: Locator

    constructor(page: Page) {
        this.page = page
        this.backToProductsPage = page.locator('#back-to-products')
        this.titleProduct = page.locator('[data-test="inventory-item-name"]')
        this.addToCartButton = page.locator('#add-to-cart')
    }

    //-----------------------------------

    async detailPageIsVisible(productName: string) {
        await expect(this.backToProductsPage).toBeVisible()
        await expect(this.titleProduct).toHaveText(productName)
    }

    async clickOnAddToCart() {
        await this.addToCartButton.click()
    }
}