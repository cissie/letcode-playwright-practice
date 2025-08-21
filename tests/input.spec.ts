import { test, expect } from '@playwright/test';
import { InputPage } from '../pages/input-page';
import { before, beforeEach } from 'node:test';

test.describe('Input Tests', () => {
    let inputPage: InputPage;

    test.beforeEach(async ({ page }) => {
        inputPage = new InputPage(page);
        await inputPage.goto();
    });

    test('should enter a full name', async () => {
        await inputPage.addFullName()
        await expect(inputPage.fullNameInput).toHaveValue(inputPage.fullName);

    });

    test('should append text to existing text', async () => {
        const addedText = ' foo';
        const updatedText = addedText + inputPage.originalText
        await inputPage.appendTextInInput.pressSequentially(addedText);
        await expect(inputPage.appendTextInInput).toHaveValue(updatedText);
    });

    test('should confirm text in input', async () => {
        const exitingText = await inputPage.getTextFromInput();
        await expect(inputPage.confirmTextInInput).toHaveValue(exitingText);
    });

    test('should clear text in input', async () => {
        await inputPage.clearTextInInput();
        await expect(inputPage.clearedInput).toHaveValue('');
    });

    test('should confirm input is disabled', async () => {
        await expect(inputPage.disabledInput).toBeDisabled();
    });

    test('should confirm input is readonly', async () => {
        await expect(inputPage.readonlyInput).toHaveAttribute('readonly', '');
    });
});
