import { expect, Locator, Page } from "@playwright/test";
import { URLs } from "../helpers/URLs";

export class CheckoutCompletePage {
    readonly page: Page
    readonly completeTitle: Locator
    readonly backHomeButton: Locator

    constructor(page: Page) {
        this.page = page
        this.completeTitle = page.locator('[data-test="complete-header"]')
        this.backHomeButton = page.locator('#back-to-products')
    }

    //--------------------------

    async assertCompletePurches() {
        await expect(this.page).toHaveURL(URLs.checkoutCompleteURL)
        await expect(this.completeTitle).toBeVisible()
        await expect(this.completeTitle).toContainText('Thank you for your order!')
    }

    async clickOnBackHomeButton() {
        await this.backHomeButton.click()
    }
}