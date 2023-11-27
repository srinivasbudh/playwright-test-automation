import { Page } from '@playwright/test';
import { BasePage } from '../common/pages/BasePage';
import { Planet } from '../common/models/planet.model';

export class PlanetInfoFrame extends BasePage {

    private nameValueText = '#name';
    private populationValueText = '#population';
    private climateValueText = '#climate';
    private gravityValueText = '#gravity';

    constructor(page: Page) {
        super(page);
    }

    async verifyNameValue(nameValue: string) {
        this.verifyElementHasText(nameValue, this.nameValueText);
    }
    async verifyPopulationValue(populationExpectedValue: string) {
        this.verifyElementHasText(populationExpectedValue, this.populationValueText)
    }

    async verifyClimateValue(cliamteExpectedValue: string) {
        this.verifyElementHasText(cliamteExpectedValue, this.climateValueText);
    }

    async verifyGravityValue(gravityExpectedValue: string) {
        this.verifyElementHasText(gravityExpectedValue, this.gravityValueText);
    }

    async verifyExactPlanetDataIsDisplayed(parameter: Planet) {
        await this.verifyNameValue(parameter.name);
        await this.verifyClimateValue(parameter.climate);
        await this.verifyGravityValue(parameter.gravity);
        await this.verifyPopulationValue(parameter.population);
    }

    async verifyDataIsCleared() {
        this.verifyElementNotFound(this.nameValueText);
    }
}