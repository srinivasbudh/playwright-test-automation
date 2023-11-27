import { test } from '@playwright/test';
import { SearchPage } from '../../pages/searchPage';
import { PlanetInfoFrame } from '../../pages/planetInfoFrame';
import { Planet } from '../../common/models/planet.model';


let searchPage: SearchPage;
let planetInfo: PlanetInfoFrame;

const parameters: Planet[] = [
    { name: 'Cerea', climate: 'temperate', gravity: '1', population: '450000000' },
    { name: 'Alderaan', population: '2000000000', gravity: '1 standard', climate: 'temperate' },
    { name: 'Bespin', population: '6000000', gravity: '1.5 (surface), 1 standard (Cloud City)', climate: 'temperate' }
];

test.describe('Validate possibility of searching for the Star Wars people', () => {

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        planetInfo = new PlanetInfoFrame(page);
        await searchPage.open();
    });

    parameters.forEach((parameter) => {
        test(`should be able to find ${parameter.name}`, async () => {
            await searchPage.searchForPlanet(parameter.name);
            await planetInfo.verifyExactPlanetDataIsDisplayed(parameter);
        });

        test(`should be able to find ${parameter.name} when searched with keyBoard`, async () => {
            await searchPage.searchForPlanetWithKeyBoard(parameter.name);
            await planetInfo.verifyExactPlanetDataIsDisplayed(parameter);
        });
    });

    test(`should be able to find a planet with Partial Search `, async () => {
        await searchPage.searchForPlanet('er');
        const fullPlanetName = 'Alderaan';
        const fullPlanetDetails: Planet = parameters.find((person) => person.name == fullPlanetName);
        await planetInfo.verifyExactPlanetDataIsDisplayed(fullPlanetDetails);
    });

    test(`should not be able to find any person with name that is not known to system`, async () => {
        await searchPage.searchForPeople('Earth');
        await searchPage.verifyNotFound();
    });

    test.skip(`should be able clear results for empty search`, async () => {
        await searchPage.searchForPlanet('Cerea');
        const personDetails: Planet = parameters.find((planet) => planet.name == 'Cerea');
        await planetInfo.verifyExactPlanetDataIsDisplayed(personDetails);
        await searchPage.searchForPlanet('');
        await planetInfo.verifyDataIsCleared();
    });

});
