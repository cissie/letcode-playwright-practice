import { type Locator, type Page} from '@playwright/test';


export class InputPage {
    readonly page: Page;
    readonly fullNameInput: Locator;
    readonly appendTextInInput: Locator;
    readonly confirmTextInInput: Locator;
    readonly clearedInput: Locator;
    readonly disabledInput: Locator;
    readonly readonlyInput: Locator;
    readonly fullName: string;
    readonly originalText: string;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = page.locator('#fullName');
        this.appendTextInInput = page.locator('#join');
        this.confirmTextInInput = page.locator('#getMe');
        this.clearedInput = page.locator('#clearMe');
        this.disabledInput = page.locator('#noEdit');
        this.readonlyInput = page.locator('#dontwrite');
        this.fullName = "Just Testing"
        this.originalText = "I am good"
    }

    async goto() {
        await this.page.goto('/edit');
    }

    async addFullName() {
        await this.fullNameInput.fill(this.fullName);
    }

    async getTextFromInput() {
        return await this.confirmTextInInput.inputValue();
    }

    async clearTextInInput () {
        await this.clearedInput.clear();
    }

    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }   

}