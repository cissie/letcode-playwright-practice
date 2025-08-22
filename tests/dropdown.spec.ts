import { test, expect, selectors } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown-page';

test.describe('Dropdown Tests', () => {
    let dropdownPage: DropdownPage;
    
    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goto();
    });

    test('should select Apple', async () => {
        await dropdownPage.selectApple();
        const selectedFruit = await dropdownPage.selectFruit.inputValue();
        // confirm that the Apple has been selected
        await expect(dropdownPage.selectFruit).toHaveValue(selectedFruit);
        await expect(dropdownPage.fruitConfirmation).toBeVisible();
    });

    test('should randomly select 3 superheros', async ({ page }) => {
        const selectedSuperheros = await dropdownPage.selectRandomSuperheros(3);
        // confirm that 3 random superheros are selected
        await dropdownPage.confirmSelectedSuperheros(selectedSuperheros);
    });

    test('should pick the last language', async () => {
        await dropdownPage.selectLastLanguage();
        const languageSelected = await dropdownPage.selectLanguage.inputValue();
        // confirm that the last language in the list is selected
        await expect(dropdownPage.selectLanguage).toHaveValue(languageSelected);
    });

    test('should select India value', async () => {
        await dropdownPage.selectCountryByValue();
        const selectedCountry = await dropdownPage.selectCountry.inputValue();
        // confirm that the value India has been selected
        await expect(dropdownPage.selectCountry).toHaveValue(selectedCountry);
    });
});