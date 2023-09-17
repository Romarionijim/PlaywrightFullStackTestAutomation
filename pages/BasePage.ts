import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    constructor(public page: Page) {
        this.page = page;
    }

    public async goTo(url: string) {
        await this.page.goto(url);
    }

    private async performActionOnElement(element: (string | Locator), action: (...args: Locator[]) => Promise<void>, ...args: Locator[]) {
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

    public async fillText(element: (string | Locator), text: string) {
        await this.performActionOnElement(element, async (element) => {
            await element.fill(text);
        })
    }

    public async alertAccept() {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        })
    }

    public async alertDismiss() {
        this.page.on('dialog', async (dialog) => {
            await dialog.dismiss();
        })
    }

    public async alertGetText() {
        this.page.on('dialog', async (dialog) => {
            const message = dialog.message();
            return message;
        })
    }

    public async changeCheckBoxState(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            const isChecked = await element.isChecked();
            if (!isChecked) {
                await element.check();
            } else {
                await element.uncheck();
            }
        })
    }

    public async selectOption(element: (string | Locator), options?: { value?: string, label?: string }) {
        await this.performActionOnElement(element, async (element) => {
            try {
                if (options?.value !== undefined) {
                    await element.selectOption({ value: options.value });
                } else if (options?.label !== undefined) {
                    await element.selectOption({ label: options.label });
                }
            } catch (error) {
                throw new Error(error);
            }
        })
    }

    public async hover(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.hover();
        })
    }

    public async pressEnter() {
        await this.page.keyboard.press('Enter');
    }

    public async rightClick(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.click({ button: 'right' });
        })
    }

    public async doublClick(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.dblclick();
        })
    }

    public async clearText(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.clear();
        })
    }

    public async scrollIntoViewIfNeeded(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.scrollIntoViewIfNeeded();
        })
    }

    public async waitForVisibilityOfElement(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.waitFor({ state: "visible" });
        })
    }

    public async waitForInvisibilityOfElement(element: (string | Locator)) {
        await this.performActionOnElement(element, async (element) => {
            await element.waitFor({ state: "hidden" });
        })
    }

    public async dragAndDrop(dragElement: (string | Locator), dropElement: (string | Locator)) {
        try {
            const dragLocator = (typeof dragElement === 'string') ? this.page.locator(dragElement) : dragElement;
            const dropLocator = (typeof dropElement === 'string') ? this.page.locator(dropElement) : dropElement;
            if (dragLocator && dropLocator) {
                await dragLocator.dragTo(dropLocator);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}