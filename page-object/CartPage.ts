import { expect, Locator, Page } from "@playwright/test";
import { URLs } from "../helpers/URLs";

export class CartPage {
    readonly page: Page
    readonly continueShoppingButton: Locator
    readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.continueShoppingButton = page.locator('#continue-shopping')
        this.checkoutButton = page.locator('#checkout')
    }

    //------------------------

    async assertProductIntoCart(productName: string) {
        await expect(this.page).toHaveURL(URLs.cartURL)
        await expect(this.page.getByText(productName)).toBeVisible()
    }

    async clickOnContinueShoppingButton() {
        await this.continueShoppingButton.click()
    }

    async productRemovedFromCart(productName: string) {
        await expect(this.page.getByText(productName)).not.toBeVisible()
    }

    async sumPrices(): Promise<string> {
        const pricesText = await this.page.locator('[data-test="inventory-item-price"]').allTextContents()
        const prices = pricesText.map(price =>
            parseFloat(price.replace('$', ''))
        );
        return prices.reduce((sum, value) => sum + value, 0).toString()
    }

    async clickOnCheckoutButton() {
        await this.checkoutButton.click()
    }
}