import { Locator, Page } from "@playwright/test";

export class BasePage {

    constructor(public page: Page) {
        this.page = page;
    }

    // public async clickElement(element: (string | Locator)) {
    //     const locatorElement = element as Locator;
    //     if (typeof element === 'string') {
    //         await this.page.locator(element).click({ force: true });
    //     }
    //     else if (element === locatorElement) {
    //         await element.click({ force: true });
    //     }
    // }

    // public async fillText(element: (string | Locator), text: string) {
    //     const locatorElement = element as Locator;

    //     if (typeof element === 'string') {
    //         await this.page.locator(element).click();
    //         await this.page.locator(element).fill(text);
    //     }
    //     else if (element === locatorElement) {
    //         await element.click();
    //         await element.fill(text);
    //     }
    // }


    public async performActionOnElement<T>(element: (string | Locator), action: (...args: Locator[]) => Promise<void>, ...args: Locator[]) {
        const locatorElement = element as Locator;

        if (typeof element === 'string') {
            const locator = this.page.locator(element);
            await action(locator, ...args);
        } else if (element === locatorElement) {
            await action(element, ...args);
        }
    }

    public async clickElement(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.click({ force: true });
        });
    }

}