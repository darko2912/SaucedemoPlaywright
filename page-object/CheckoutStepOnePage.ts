import { expect, Locator, Page } from "@playwright/test";

export class CheckoutStepOnePage {
    readonly page: Page
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCodeField: Locator
    readonly continueButton: Locator
    readonly cancelButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameField = page.locator('#first-name')
        this.lastNameField = page.locator('#last-name')
        this.postalCodeField = page.locator('#postal-code')
        this.continueButton = page.locator('#continue')
        this.cancelButton = page.locator('#cancel')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    //------------------------------

    async inputFirstName(name: string) {
        await this.firstNameField.fill(name)
    }

    async inputLastName(name: string) {
        await this.lastNameField.fill(name)
    }

    async inputPostalCode(code: string) {
        await this.postalCodeField.fill(code)
    }

    async clickOnContinueButton() {
        await this.continueButton.click()
    }

    async clickOnCancelButton() {
        await this.cancelButton.click()
    }

    async errorMessageDisplayed(message: string) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toContainText(message)
    }
}