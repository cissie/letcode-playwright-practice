import { test, expect, selectors } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown-page';

test.describe('Dropdown Tests', () => {
    let dropdownPage: DropdownPage;
    
    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.goto();
    });

    test('should select Apple label', async () => {
        await dropdownPage.selectApple();
        // confirm that the Apple has been selected
        await expect(dropdownPage.selectFruit).toHaveValue('0');
        await expect(dropdownPage.fruitConfirmation).toBeVisible();
    });

    test('should randomly select 3 superheros', async ({ page }) => {
        const selected = await dropdownPage.selectRandomSuperheros(3);
        // confirm that 3 random superheros are selected
        await dropdownPage.assertSelectedSuperheros(selected);
    });

    test('should pick the last language', async () => {
        await dropdownPage.selectLastLanguage();
        const languageSelected = await dropdownPage.selectLanguage.inputValue();
        // confirm that the last language in the list is selected
        await expect(dropdownPage.selectLanguage).toHaveValue(languageSelected);
    });

    test('should select India value', async () => {
        const selectedCountry = await dropdownPage.selectCountryByValue();
        await dropdownPage.selectCountryByValue();
        // confirm that the value India has been selected
        await expect(dropdownPage.selectCountry).toHaveValue('India');
    });
});