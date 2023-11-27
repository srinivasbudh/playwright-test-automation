import { Page, expect } from '@playwright/test';
import colors from 'colors';

export class BasePage {

    constructor(protected page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
    }

    async clickAfterVisible(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: 'visible'
        });
        await element.click();
    }

    async enterText(locator: string, text: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: 'visible'
        });
        await element.fill(text);
    }

    async getText(elementValue: string) {
        const element = this.page.locator(elementValue).first();
        const textToReturn = await element.innerText();
        return textToReturn;
    }

    async verifyElementHasText(expectedValue: string, locator: string) {
        const elements = await this.page.locator(locator).all();
        const logMessage =
            colors.blue('Get text from locator ') +
            colors.green(locator) +
            colors.blue(' does not have the value ') +
            colors.green(expectedValue);

        if (elements.length === 1) {
            const actualText = await this.getText(locator);
            expect(actualText, logMessage).toMatch(expectedValue);
        } else {
            expect(await this.checkElementContainsText(locator, expectedValue), logMessage).toBe(true);
        }
    }

    async verifyElementFound(locator: string) {
        await expect(this.page.locator(locator), 'element with locator value ' + locator + ' is not visible').toBeVisible();
    }

    async verifyElementNotFound(locator: string) {
        expect(await expect(this.page.locator(locator), 'element with locator value ' + locator + ' is still visible').toBeVisible()).toBe(false);
    }

    async checkElementContainsText(locator: string, value: string): Promise<Boolean> {
        // Locate the elements matching the selector
        const elements = await this.page.locator(locator).all();
        let containsText = false;

        // Assert that at least one element contains the expected text
        for (const element of elements) {
            const textValue = await element.textContent();
            if (textValue && textValue.includes(value)) {
                containsText = true;
                break;
            }
        }
        return containsText;
    }

    async waitForLoadState() {
        await this.page.waitForLoadState('networkidle');
    }

    async pressKeyboardEnter() {
        await this.page.keyboard.press('Enter');
    }
}
