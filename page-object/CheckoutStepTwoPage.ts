import { expect, Locator, Page } from "@playwright/test";
import { URLs } from "../helpers/URLs";

export class CheckoutStepTwoPage {
    readonly page: Page
    readonly summereySubtotal: Locator
    readonly total: Locator
    readonly finishButton: Locator
    readonly cancelButton: Locator

    constructor(page: Page) {
        this.page = page
        this.summereySubtotal = page.locator('[data-test="subtotal-label"]')
        this.total = page.locator('[data-test="total-label"]')
        this.finishButton = page.locator('#finish')
        this.cancelButton = page.locator('#cancel')
    }

    //------------------------

    async assertCheckooutOverview(productName: string) {
        await expect(this.page).toHaveURL(URLs.checkoutStepTwoURL)
        await expect(this.page.getByText(productName)).toBeVisible()
    }

    async assertSubtotalAmount(amount: string) {
        await expect(this.summereySubtotal).toContainText(amount)
    }

    async totalPrice(): Promise<string> {
        const subtotalText = await this.page.locator('[data-test="subtotal-label"]').innerText()
        const subtotal = parseFloat(subtotalText.replace('Item total: $', ''))

        const taxText = await this.page.locator('[data-test="tax-label"]').innerText()
        const tax = parseFloat(taxText.replace('Tax: $', ''))

        const total = (subtotal + tax).toFixed(2)

        return total.toString()
    }

    async assertTotalAmount(amount: string) {
        await this.total.scrollIntoViewIfNeeded()
        await expect(this.total).toContainText(amount)
    }

    async clickOnFinishButton() {
        await this.finishButton.click()
    }

    async clickOnCancelButton() {
        await this.cancelButton.click()
    }
}