import DataTablePage from "../pageobjects/data-table.page"

  describe('Tables Test', async () => {
    beforeEach("open page", async () => {
        await DataTablePage.open();
    })

    it('[Positive] Assert table column title', async () => {
        await DataTablePage.assertColumnTitle();
    });

    it('[Positive] Assert row data by user email', async () => {
        await DataTablePage.assertRowsByEmail('jsmith@gmail.com');
    });

    it('[Positive] Select edit button for a user and assert url', async () => {
        await DataTablePage.selectActionBtn('jsmith@gmail.com', 'edit')
        await expect(browser).toHaveUrlContaining('edit');
    })

    it('[Positive] Select edit button for a user and assert url', async () => {
        await DataTablePage.selectActionBtn('jsmith@gmail.com', 'delete')
        await expect(browser).toHaveUrlContaining('delete');
    })
    
    it('[Negative] Assert row data for invalid email', async () => {
        await DataTablePage.assertRowsByEmail('foo@gmail.com');
    });
});
