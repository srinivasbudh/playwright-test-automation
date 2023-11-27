import { Page, expect } from '@playwright/test';
import { BasePage } from '../common/pages/BasePage';
import { Person } from '../common/models/people.model';

export class PeopleInfoFrame extends BasePage {

    private nameValueText = '#name';
    private genderValueText = '#gender';
    private birthYearValueText = '#birthYear';
    private eyeColorValueText = '#eyeColor';
    private skinColorValueText = '#skinColor';

    constructor(page: Page) {
        super(page);
    }

    async verifyNameValue(nameValue: string) {
        await this.verifyElementHasText(nameValue, this.nameValueText);
    }
    async verifyGenderValue(genderExpectedValue: string) {
        await this.verifyElementHasText(genderExpectedValue, this.genderValueText)
    }

    async verifybirthYearValue(birthYeareExpectedValue: string) {
        await this.verifyElementHasText(birthYeareExpectedValue, this.birthYearValueText);
    }

    async verifyEyeColorValue(eyeColorExpectedValue: string) {
        await this.verifyElementHasText(eyeColorExpectedValue, this.eyeColorValueText);
    }

    async verifySkinColorValue(skinColorExpectedValue: string) {
        await this.verifyElementHasText(skinColorExpectedValue, this.skinColorValueText);
    }

    async verifyPreviousNameIsCleared(previousName: string) {
        if (previousName) {
            const isCleared = await this.checkElementContainsText(this.nameValueText, previousName);
            expect(isCleared).toBe(false);
        }
    }

    async verifyExactPeopleDataIsDisplayed(parameter: Person) {
        await this.verifyNameValue(parameter.name);
        await this.verifyGenderValue(parameter.gender);
        await this.verifybirthYearValue(parameter.birth_year);
        await this.verifyEyeColorValue(parameter.eye_color);
        await this.verifySkinColorValue(parameter.skin_color);
    }

    async verifyDataIsCleared() {
        await this.verifyElementNotFound(this.nameValueText);
    }

}