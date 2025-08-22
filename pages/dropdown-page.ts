import { type Locator, type Page, expect } from '@playwright/test';

export class DropdownPage {
   readonly page: Page;
   readonly selectFruit: Locator;
   readonly fruitConfirmation: Locator;
   readonly superheroMultiSelect: Locator;
   readonly selectLanguage: Locator;
   readonly selectCountry: Locator;

    constructor (page: Page) {
        this.page = page;
        this.selectFruit = page.locator('#fruits');
        this.fruitConfirmation = page.getByText('You have selected Apple');
        this.superheroMultiSelect = page.locator('#superheros');
        this.selectLanguage = page.locator('#lang');
        this.selectCountry = page.locator('#country')
    }

    async goto() {
        await this.page.goto('/dropdowns');
    }

    async selectApple() {
        await this.selectFruit.selectOption('Apple');
    }

    async selectSuperheros(): Promise<string[]> {
        return this.superheroMultiSelect.locator('option').evaluateAll(options =>
        options.map(o => (o as HTMLOptionElement).value)
        );
    }

    async selectRandomSuperheros(count: number): Promise<string[]> {
        const allValues = await this.selectSuperheros();

        // Shuffle and slice `count` values
        const shuffle = allValues.sort(() => 0.5 - Math.random());
        const selected = shuffle.slice(0, count);

        await this.superheroMultiSelect.selectOption(selected);
        return selected;
    }

    async getSelectedSuperheroValues(): Promise<string[]> {
        return this.superheroMultiSelect.evaluate(el =>
            Array.from((el as HTMLSelectElement).selectedOptions).map(opt => opt.value)
        );
    }

    async confirmSelectedSuperheros(expected: string[]) {
        const selected = await this.getSelectedSuperheroValues();
        expect(selected.sort()).toEqual(expected.sort());
    }

    async selectLastLanguage() {
        // assigning the value to the last item in the list
        const lastLanguage = await this.selectLanguage.locator('option').last().getAttribute('value');
        await this.selectLanguage.selectOption(lastLanguage);
    }
    
    async selectCountryByValue() {
        await this.selectCountry.selectOption('India');
    }
}