import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-object/LoginPage'
import { InventoryPage } from '../page-object/InventoryPage'
import { URLs } from '../helpers/URLs'
import { TestData } from '../helpers/TestData'
import { Header } from '../page-object/Header'
import { CartPage } from '../page-object/CartPage'
import { CheckoutStepOnePage } from '../page-object/CheckoutStepOnePage'
import { CheckoutStepTwoPage } from '../page-object/CheckoutStepTwoPage'
import { CheckoutCompletePage } from '../page-object/CheckoutCompletePage'

let loginPage: LoginPage
let inventoryPage: InventoryPage
let header: Header
let cartPage: CartPage
let checkoutStepOnePage: CheckoutStepOnePage
let checkoutStepTwoPage: CheckoutStepTwoPage
let checkoutCompletePage: CheckoutCompletePage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    header = new Header(page)
    cartPage = new CartPage(page)
    checkoutStepOnePage = new CheckoutStepOnePage(page)
    checkoutStepTwoPage = new CheckoutStepTwoPage(page)
    checkoutCompletePage = new CheckoutCompletePage(page)

    await page.goto(URLs.loginURL)
    await loginPage.login()
    await inventoryPage.addToCart(TestData.productAdd.sauceLabsBackpack)
    await inventoryPage.addToCart(TestData.productAdd.sauceLabsFleeceJacket)
    await header.clickOnCartIcon()
})

test.describe('Positive purchase tests', () => {
    test('User can purchases the product', async ({ page }) => {
        const prices = await cartPage.sumPrices()
        await cartPage.clickOnCheckoutButton()
        await expect(page).toHaveURL(URLs.checkoutStepOneURL)
        await checkoutStepOnePage.inputFirstName(TestData.validCheckoutInformation.firstName)
        await checkoutStepOnePage.inputLastName(TestData.validCheckoutInformation.lastName)
        await checkoutStepOnePage.inputPostalCode(TestData.validCheckoutInformation.postalCode)
        await checkoutStepOnePage.clickOnContinueButton()

        await checkoutStepTwoPage.assertCheckooutOverview(TestData.productName.SauceLabsBackpack)
        await checkoutStepTwoPage.assertCheckooutOverview(TestData.productName.SauceLabsFleeceJacket)
        await checkoutStepTwoPage.assertSubtotalAmount(prices)
        const totalPrices = await checkoutStepTwoPage.totalPrice()
        await checkoutStepTwoPage.assertTotalAmount(totalPrices)

        await checkoutStepTwoPage.clickOnFinishButton()
        await checkoutCompletePage.assertCompletePurches()

        await checkoutCompletePage.clickOnBackHomeButton()
        await expect(page).toHaveURL(URLs.inventoryURL)
    })
})

test.describe('Negative purchase tests', () => {
    test('User cannot purchase with empty first name field', async ({ page }) => {
        await cartPage.clickOnCheckoutButton()
        await checkoutStepOnePage.inputLastName(TestData.validCheckoutInformation.lastName)
        await checkoutStepOnePage.inputPostalCode(TestData.validCheckoutInformation.postalCode)
        await checkoutStepOnePage.clickOnContinueButton()

        await checkoutStepOnePage.errorMessageDisplayed(TestData.purchaseErrorMessage.requierdFirstName)
    })

    test('User cannot purchase with empty last name field', async ({ page }) => {
        await cartPage.clickOnCheckoutButton()
        await checkoutStepOnePage.inputFirstName(TestData.validCheckoutInformation.firstName)
        await checkoutStepOnePage.inputPostalCode(TestData.validCheckoutInformation.postalCode)
        await checkoutStepOnePage.clickOnContinueButton()

        await checkoutStepOnePage.errorMessageDisplayed(TestData.purchaseErrorMessage.requierdLastName)
    })

    test('User cannot purchase with empty postal code field', async ({ page }) => {
        await cartPage.clickOnCheckoutButton()
        await checkoutStepOnePage.inputFirstName(TestData.validCheckoutInformation.firstName)
        await checkoutStepOnePage.inputLastName(TestData.validCheckoutInformation.lastName)
        await checkoutStepOnePage.clickOnContinueButton()

        await checkoutStepOnePage.errorMessageDisplayed(TestData.purchaseErrorMessage.requierdPostalCode)
    })

    test('User cannot purchase with empty all fields', async ({ page }) => {
        await cartPage.clickOnCheckoutButton()
        await checkoutStepOnePage.clickOnContinueButton()

        await checkoutStepOnePage.errorMessageDisplayed(TestData.purchaseErrorMessage.requierdFirstName)
    })
})