import { expect, Locator, Page } from "@playwright/test";
import { TestData } from "../helpers/TestData";

export class LoginPage {
    readonly page: Page
    readonly loginButton: Locator
    readonly usernameField: Locator
    readonly passwordField: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.loginButton = page.locator('#login-button')
        this.usernameField = page.locator('#user-name')
        this.passwordField = page.locator('#password')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    //-------------------------------------

    async clickOnLoginButton() {
        await this.loginButton.click()
    }

    async inputUsername(username: string) {
        await this.usernameField.fill(username)
    }

    async inputPassword(password: string) {
        await this.passwordField.fill(password)
    }

    async errorMessageDisplayed(message: string) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toContainText(message)
    }

    async loginButtonIsVisible() {
        await expect(this.loginButton).toBeVisible()
    }

    async login() {
        await this.usernameField.fill(TestData.validUser.username)
        await this.passwordField.fill(TestData.validUser.password)
        await this.clickOnLoginButton()
    }
}