import { test, expect } from "@playwright/test";
import { URLs } from "../helpers/URLs";
import { LoginPage } from "../page-object/LoginPage";
import { InventoryPage } from "../page-object/InventoryPage";
import { TestData } from "../helpers/TestData";
import { CartPage } from "../page-object/CartPage";
import { DetailProductPage } from "../page-object/DetailProductPage";
import { Header } from "../page-object/Header";

let loginPage: LoginPage
let inventoryPage: InventoryPage
let cartPage: CartPage
let detailProductPage: DetailProductPage
let header: Header

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    inventoryPage = new InventoryPage(page)
    cartPage = new CartPage(page)
    detailProductPage = new DetailProductPage(page)
    header = new Header(page)

    await page.goto(URLs.loginURL)
    await loginPage.login()
})

test.describe('Sort products', () => {
    test('User can sort product by name', async ({ page }) => {
        const nameProducts = await page.locator('.inventory_item_name').allTextContents()
        await inventoryPage.sortProducts(TestData.sortOption.nameZtoA)
        const nameProductsZtoA = await page.locator('.inventory_item_name').allTextContents()
        expect(nameProductsZtoA).not.toEqual(nameProducts)

        await inventoryPage.sortProducts(TestData.sortOption.nameAtoZ)
        const nameProductsAtoZ = await page.locator('.inventory_item_name').allTextContents()
        expect(nameProductsAtoZ).not.toEqual(nameProductsZtoA)
    })

    test('User can sort products by price', async ({ page }) => {
        const priceProducts = await page.locator('.inventory_item_price').allTextContents()
        await inventoryPage.sortProducts(TestData.sortOption.priceHighToLow)
        const priceProductsHighToLow = await page.locator('.inventory_item_price').allTextContents()
        expect(priceProductsHighToLow).not.toEqual(priceProducts)

        await inventoryPage.sortProducts(TestData.sortOption.priceLowToHigh)
        const priceProductsLowToHigh = await page.locator('.inventory_item_price').allTextContents()
        expect(priceProductsLowToHigh).not.toEqual(priceProductsHighToLow)
    })
})

test.describe('Add product to cart', () => {
    test('@smoke - User can add product to the cart', async ({ page }) => {
        await inventoryPage.addToCart(TestData.productAdd.sauceLabsFleeceJacket)
        await header.assertCartBadge('1')
        await header.clickOnCartIcon()

        await cartPage.assertProductIntoCart(TestData.productName.SauceLabsFleeceJacket)
    })

    test('User can add multiple products to the cart', async ({ page }) => {
        await inventoryPage.addToCart(TestData.productAdd.sauceLabsBikeLight)
        await inventoryPage.addToCart(TestData.productAdd.sauceLabsOnesie)
        await header.assertCartBadge('2')
        await header.clickOnCartIcon()

        await cartPage.assertProductIntoCart(TestData.productName.SauceLabsBikeLight)
        await cartPage.assertProductIntoCart(TestData.productName.SauceLabsOnesie)
    })

    test('User can remove product from cart on inventory page', async ({ page }) => {
        await inventoryPage.addToCart(TestData.productAdd.sauceLabsBackpack)
        await header.assertCartBadge('1')
        await header.clickOnCartIcon()
        await cartPage.assertProductIntoCart(TestData.productName.SauceLabsBackpack)
        await cartPage.clickOnContinueShoppingButton()
        await inventoryPage.removeFromCart(TestData.productAdd.sauceLabsBackpack)

        await header.clickOnCartIcon()
        await cartPage.productRemovedFromCart(TestData.productName.SauceLabsBackpack)
    })
})

test.describe('Product detail page', () => {
    test('User can open detail product page', async ({ page }) => {
        await inventoryPage.clickOnProductName(TestData.productName.SauceLabsBikeLight)

        await detailProductPage.detailPageIsVisible(TestData.productName.SauceLabsBikeLight)
    })

    test('User can add an item to the cart over the product details page', async ({ page }) => {
        await inventoryPage.clickOnProductName(TestData.productName.SauceLabsBikeLight)
        await detailProductPage.detailPageIsVisible(TestData.productName.SauceLabsBikeLight)
        await detailProductPage.clickOnAddToCart()

        await header.assertCartBadge('1')
        await header.clickOnCartIcon()
        await cartPage.assertProductIntoCart(TestData.productName.SauceLabsBikeLight)
    })
})