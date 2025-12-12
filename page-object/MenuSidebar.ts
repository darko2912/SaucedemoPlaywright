import { Locator, Page } from "@playwright/test";

export class MenuSidebar {
    readonly page: Page
    readonly logout: Locator

    constructor(page: Page) {
        this.page = page
        this.logout = page.locator('#logout_sidebar_link')
    }

    //------------------------

    async clickOnLogoutButton() {
        await this.logout.click()
    }
}