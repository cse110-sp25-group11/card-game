describe("Loading Browse Page", () => {
    beforeAll(async () => {
        await page.goto('https://cse110-sp25-group11.github.io/card-game');
    });

    // Show events button toggles
    it('Show Events Button Toggles', async () => {
        await page.goto('https://cse110-sp25-group11.github.io/card-game/browse.html');
        
        console.log('Checking show events button toggle...');

        await page.waitForSelector('#togglePastEvents');
        const initialState = await page.$eval('.toggle-text', (el) => el.textContent);
        
        expect(initialState).toBe('Show Events');
        
        await page.click('#togglePastEvents');
        const toggledState = await page.$eval('.toggle-text', (el) => el.textContent);
        
        expect(toggledState).toBe('Hide Events');
    });
});