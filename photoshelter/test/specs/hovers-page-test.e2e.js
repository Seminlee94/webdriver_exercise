import HoversPage from "../pageobjects/hovers.page"

describe('Hovers', async () => {
    beforeEach("open page", async () => {
        await HoversPage.open();
    })

    it('should navigate to each user profile and verify the URL', async () => {
        await HoversPage.assertTitle();
        await HoversPage.assertAllUsers();
    });
});
