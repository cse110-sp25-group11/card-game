/**
 * Test loading the home page
 * and checking if the event cards are rendered correctly.
 */
import puppeteer from 'puppeteer';

describe("Loading Home Page", () => {
    beforeAll(async () => {
        await page.goto('https://cse110-sp25-group11.github.io/card-game');
    });

    // Check num products in local storage is 15
    it('Initial Home Page - Check for 15 events', async() => {
        console.log('Checking for 15 events...');

        const numEvents = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('events'));
            return events ? events.length : 0;
        });
        
        console.log(`Found ${numEvents} events.`);
        expect(numEvents).toBe(15);
    })
    
    // Check if only 1 event card is rendered
    it('Initial Home Page - Check for 1 event card', async() => {
        console.log('Checking for 1 event card...');

        const numEventCards = await page.$$eval('.event-card', (cards) => {
            return cards.length;
        });
        expect(numEventCards).toBe(1);
    });

    // Check if 'events remaining' tag is correctly displayed
    it ('Initial Home Page - Check counter value', async() => {
        console.log('Checking counter value...');

        const counterValue = await page.$eval('#counterText', (el) => el.textContent);
        expect(counterValue).toBe('15 events left');
    });

    // Check if like work properly
    it('Initial Home Page - Like Button Functionality', async() => {
        console.log('Checking Like Button Functionality...'); 
        
        await page.waitForSelector('#acceptBtn');

        const initialCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('likedEvents'));
            return events ? events.length : 0;
        });

        const initialTitle = await page.$eval('.event-header h2', (el) => el.textContent);
        console.log(`Initial Title: ${initialTitle}`);

        await page.click('#acceptBtn');
        await page.waitForFunction(
            (oldTitle) => {
                const el = document.querySelector('.event-header h2');
                return el && el.textContent !== oldTitle;
            },
            {},
            initialTitle
        );

        const updatedCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('likedEvents'));
            return events ? events.length : 0;
        });
        
        const updatedTitle = await page.$eval('.event-header h2', (el) => el.textContent);
        console.log(`Updated Title: ${updatedTitle}`);


        console.log(`Liked Events: before = ${initialCount}, after = ${updatedCount}`);

        expect(updatedCount).toBe(initialCount+1);
        expect(updatedTitle).not.toBe(initialTitle);
    });

    // Check if 'events remaining' tag is correctly updated
    it ('Initial Home Page - Check counter value', async() => {
        console.log('Checking counter value...');

        const counterValue = await page.$eval('#counterText', (el) => el.textContent);
        expect(counterValue).toBe('14 events left');
    });

    // Check if dislike work properly
    it('Initial Home Page - Disike Button Functionality', async() => {
        console.log('Checking Dislike Button Functionality...'); 
        
        await page.waitForSelector('#rejectBtn');

        const initialCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('dislikedEvents'));
            return events ? events.length : 0;
        });
        const initialTitle = await page.$eval('.event-header h2', (el) => el.textContent);

        
        await page.click('#rejectBtn');
        await page.waitForFunction(
            (oldTitle) => {
                const el = document.querySelector('.event-header h2');
                return el && el.textContent !== oldTitle;
            },
            {},
            initialTitle
        );

        const updatedCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('dislikedEvents'));
            return events ? events.length : 0;
        });
        const updatedTitle = await page.$eval('.event-header h2', (el) => el.textContent);
        console.log(`Updated Title: ${updatedTitle}`);

        console.log(`DisLiked Events: before = ${initialCount}, after = ${updatedCount}`);

        expect(updatedCount).toBe(initialCount+1);
        expect(updatedTitle).not.toBe(initialTitle);
    });

    // Check if 'events remaining' tag is correctly updated
    it ('Initial Home Page - Check counter value', async() => {
        console.log('Checking counter value...');

        const counterValue = await page.$eval('#counterText', (el) => el.textContent);
        expect(counterValue).toBe('13 events left');
    });

    // Check if undo button works
    it ('Initial Home Page - Checking Undo Button', async() => {
        console.log('Checking undo button...');

        await page.waitForSelector('#undoBtn');

        await page.click('#undoBtn');

        const newCounterVal = await page.$eval('#counterText', (el) => el.textContent);
        
        expect(newCounterVal).toBe("14 events left");
    });

    // Check if liked events page is correctly updated
    it ('Check liked events page', async() => {
        console.log('Checking liked events page...');

        await page.goto('https://cse110-sp25-group11.github.io/card-game/liked.html');

        const likedEventsCount = await page.$$eval('.event-card', (cards) => {
            return cards.length;
        });

        expect(likedEventsCount).toBe(1);
    });

    // Unlike the event
    it ('Unlike the event', async() => {
        console.log('Unliking the event...');

        const initialCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('likedEvents'));
            return events ? events.length : 0;
        });

        await page.click('.event-card .event-info button');
        await page.waitForFunction(
            () => {
                const events = document.querySelectorAll('.event-card');
                return events.length == 0;
            },
        );

        const updatedCount = await page.evaluate(() => {
            const events = JSON.parse(localStorage.getItem('likedEvents'));
            return events ? events.length : 0;
        });

        expect(updatedCount).toBe(initialCount - 1);
        await page.goBack();
    }, 15000);
});