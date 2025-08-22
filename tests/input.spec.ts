import { test, expect } from '@playwright/test';
import { InputPage } from '../pages/input-page';

test.describe('Input Tests', () => {
    let inputPage: InputPage;

    test.beforeEach(async ({ page }) => {
        inputPage = new InputPage(page);
        await inputPage.goto();
    });

    test('should enter a full name', async () => {
        await inputPage.addFullName()
        // confirm the full name value is in the input
        await expect(inputPage.fullNameInput).toHaveValue(inputPage.fullName);

    });

    test('should append text to existing text', async () => {
        const addedText = ' foo';
        const updatedText = addedText + inputPage.originalText
        await inputPage.appendTextInInput.pressSequentially(addedText);
        //confirm text has been appended to original text
        await expect(inputPage.appendTextInInput).toHaveValue(updatedText);
    });

    test('should confirm text in input', async () => {
        const existingText = await inputPage.getTextFromInput();
        //confirm placeholder text in input
        await expect(inputPage.confirmTextInInput).toHaveValue(existingText);
    });

    test('should clear text in input', async () => {
        await inputPage.clearTextInInput();
        //confirm input is empty after clearing text
        await expect(inputPage.clearedInput).toBeEmpty;
    });

    test('should confirm input is disabled', async () => {
        //confirm that the input is disabled
        await expect(inputPage.disabledInput).toBeDisabled();
    });

    test('should confirm input is readonly', async () => {
        //confirm that the input is readonly
        await expect(inputPage.readonlyInput).toHaveAttribute('readonly', '');
    });
});
