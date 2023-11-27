import { Page } from 'playwright';
import { BasePage } from '../common/pages/BasePage';

export class SearchPage extends BasePage {

    private searchInput = '#query';
    private searchButton = '[type=submit]';
    private planetRadioButton = '#planets';
    private peoplesRadioButton = '#people';
    private notFoundFrame = '#notFound';

    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.goto('/');
    }

    async searchForPlanet(planetName: string) {
        await this.clickAfterVisible(this.planetRadioButton);
        await this.enterText(this.searchInput, planetName);
        await this.clickAfterVisible(this.searchButton);
        await this.waitForLoadState();
    }

    async searchForPeople(peopleName: string) {
        await this.clickAfterVisible(this.peoplesRadioButton);
        await this.enterText(this.searchInput, peopleName);
        await this.clickAfterVisible(this.searchButton);
        await this.waitForLoadState();
    }

    async searchForPlanetWithKeyBoard(planetName: string) {
        await this.clickAfterVisible(this.planetRadioButton);
        await this.enterText(this.searchInput, planetName);
        await this.pressKeyboardEnter();
        await this.waitForLoadState();
    }

    async searchForPeopleWithKeyBoard(peopleName: string) {
        await this.clickAfterVisible(this.peoplesRadioButton);
        await this.enterText(this.searchInput, peopleName);
        await this.pressKeyboardEnter();
        await this.waitForLoadState();
    }

    async verifyNotFound() {
        await this.verifyElementFound(this.notFoundFrame);
    }

}