import { expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';
import { userCredentials, invalidUserCredentials } from '../utils/config';

describe('My Login application', () => {
    beforeEach("open page and assert title", async () => {
        await LoginPage.open();
        await LoginPage.assertTitleAndSubheader();
    })

    it('[Positive] should login with valid credentials', async () => {
        await LoginPage.login(userCredentials.username, userCredentials.password);
        await expect(browser).toHaveUrlContaining("/secure");

        await SecurePage.assertFlashAlert();
        await SecurePage.assertTitleAndSubheader();
        await SecurePage.selectLogoutBtn();
        await expect(browser).toHaveUrlContaining("/login");
    });

    it('[Negative] should not login with empty username', async () => {
        await LoginPage.login(invalidUserCredentials.empty, userCredentials.password);
        await LoginPage.assertFlashError(true /* invalidUsername */);
    })

    it('[Negative] should not login with invalid username', async () => {
        await LoginPage.login(invalidUserCredentials.invalidString, userCredentials.password);
        await LoginPage.assertFlashError(true /* invalidUsername */);
    })

    it('[Negative] should not login with empty password', async () => {
        await LoginPage.login(userCredentials.username, invalidUserCredentials.empty);
        await LoginPage.assertFlashError(false /* invalidUsername */);
    })

    it('[Negative] should not login with invalid username', async () => {
        await LoginPage.login(userCredentials.username, invalidUserCredentials.invalidString);
        await LoginPage.assertFlashError(false /* invalidUsername */);
    })
})

