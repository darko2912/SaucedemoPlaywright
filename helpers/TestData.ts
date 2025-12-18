export const TestData = {
    validUser: {
        username: process.env.APP_USERNAME!,
        password: process.env.APP_PASSWORD!
    },
    invalidUser: {
        username: "testUser",
        password: "testPassword"
    },
    errorMessage: {
        wrongUsernameAndPassword: "Epic sadface: Username and password do not match any user in this service",
        requiredUsername: "Epic sadface: Username is required",
        requiredPassword: "Epic sadface: Password is required",

    },
    sortOption: {
        nameAtoZ: "az",
        nameZtoA: "za",
        priceLowToHigh: "lohi",
        priceHighToLow: "hilo"
    },
    productAdd: {
        sauceLabsFleeceJacket: "sauce-labs-fleece-jacket",
        sauceLabsBackpack: "sauce-labs-backpack",
        sauceLabsBikeLight: "sauce-labs-bike-light",
        sauceLabsBoltTShirt: "sauce-labs-bolt-t-shirt",
        sauceLabsOnesie: "sauce-labs-onesie",
        testAllthethingsTShirtRed: "test.allthethings()-t-shirt-(red)"
    },
    productName: {
        SauceLabsFleeceJacket: "Sauce Labs Fleece Jacket",
        SauceLabsBackpack: "Sauce Labs Backpack",
        SauceLabsBikeLight: "Sauce Labs Bike Light",
        SauceLabsBoltTShirt: "Sauce Labs Bolt T-Shirt",
        SauceLabsOnesie: "Sauce Labs Onesie",
        TestAllTheThingsTShirtRed: "Test.allTheThings() T-Shirt (Red)"
    },
    validCheckoutInformation: {
        firstName: "Test Ime",
        lastName: "Test Prezime",
        postalCode: "11000"
    },
    purchaseErrorMessage: {
        requierdFirstName: "Error: First Name is required",
        requierdLastName: "Error: Last Name is required",
        requierdPostalCode: "Error: Postal Code is required"
    }
}