import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-object/LoginPage'
import { TestData } from '../helpers/TestData'
import { URLs } from '../helpers/URLs'
import { InventoryPage } from '../page-object/InventoryPage'
import { MenuSidebar } from '../page-object/MenuSidebar'
import { Header } from '../page-object/Header'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let menuSidebar: MenuSidebar
let header: Header

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    menuSidebar = new MenuSidebar(page)
    header = new Header(page)

    await page.goto(URLs.loginURL)
})

test.describe('Positive login tests', () => {
    test('@smoke - User can login with valid credentials', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await header.assertLogin()
    })

    test('@smoke - User can logout', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await header.clickOnHamburgerMenu()
        await menuSidebar.clickOnLogoutButton()
        await loginPage.loginButtonIsVisible()
    })
})

test.describe('Negative login tests', () => {
    test('User cannot login with empty field after logout', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()
        await header.clickOnHamburgerMenu()
        await menuSidebar.clickOnLogoutButton()

        await loginPage.clickOnLoginButton()
        await loginPage.errorMessageDisplayed(TestData.errorMessage.requiredUsername)
    })

    test('User cannot login with invalid credentials', async ({ page }) => {
        await loginPage.inputUsername(TestData.invalidUser.username)
        await loginPage.inputPassword(TestData.invalidUser.password)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)
    })

    test('User cannot login with empty username field', async ({ page }) => {
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.requiredUsername)
    })

    test('User cannot login with empty password field', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.requiredPassword)
    })

    test('User cannot login with uppercase letter in username', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!.toLocaleUpperCase())
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)
    })

    test('User cannot login with uppercase letter in password', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.inputPassword(process.env.APP_PASSWORD!.toLocaleUpperCase())
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)
    })

    test('User cannot login with blank space before and after username', async ({ page }) => {
        await loginPage.inputUsername(" " + process.env.APP_USERNAME!)
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)

        await page.reload()

        await loginPage.inputUsername(process.env.APP_USERNAME! + " ")
        await loginPage.inputPassword(process.env.APP_PASSWORD!)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)
    })

    test('User cannot login with invalid password', async ({ page }) => {
        await loginPage.inputUsername(process.env.APP_USERNAME!)
        await loginPage.inputPassword(TestData.invalidUser.password)
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.wrongUsernameAndPassword)
    })

    test('User cannot login with empty field', async ({ page }) => {
        await loginPage.clickOnLoginButton()

        await loginPage.errorMessageDisplayed(TestData.errorMessage.requiredUsername)
    })
})