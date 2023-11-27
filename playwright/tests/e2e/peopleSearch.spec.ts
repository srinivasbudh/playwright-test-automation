import { test } from '@playwright/test';
import { SearchPage } from '../../pages/searchPage';
import { PeopleInfoFrame } from '../../pages/peopleInfoFrame';
import { Person } from '../../common/models/people.model';
import { mockPeopleData } from '../../helpers/mock-data/peopleMockResponse';

let searchPage: SearchPage;
let peopleInfo: PeopleInfoFrame;

const parameters: Person[] = [
  { name: 'Luke Skywalker', gender: 'male', birth_year: '19BBY', eye_color: 'blue', skin_color: 'fair' },
  { name: 'Leia Organa', gender: 'female', birth_year: '19BBY', eye_color: 'brown', skin_color: 'light' },
  { name: 'Shmi Skywalker', gender: 'female', birth_year: '72BBY', eye_color: 'brown', skin_color: 'fair' },
];

test.describe('Validate possibility of searching for the Star Wars people', () => {

    test.beforeEach(async ({ page, context }) => {
        searchPage = new SearchPage(page);
        peopleInfo = new PeopleInfoFrame(page);

        // Replace this with the actual URL you want to check
        const apiUrl = 'https://swapi.dev/api/';

        // Make a real HTTP request to the API
        const response = await fetch(apiUrl);

        // Check the response status
        const isApiAvailable = response.ok;
    
        if (!isApiAvailable) {
            await context.route('**/api/people/**', (route, request) => {
                const searchParam = new URL(request.url()).searchParams.get('search');
    
                // Check if the search parameter is present
                if (searchParam) {
                    // You can use the searchParam to customize the response
                    route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        body: JSON.stringify(mockPeopleData(searchParam)),
                    });
                } else {
                    // Default response
                    route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        body: JSON.stringify(mockPeopleData('default')),
                    });
                }
            });
        }
    
        await searchPage.open();
    });
    

  parameters.forEach((parameter) => {
    test(`should be able to find ${parameter.name}`, async () => {
        await searchPage.searchForPeople(parameter.name);
        await peopleInfo.verifyExactPeopleDataIsDisplayed(parameter);
    });
    test(`should be able to find ${parameter.name} when searched with keyBoard`, async () => {
        await searchPage.searchForPeopleWithKeyBoard(parameter.name);
        await peopleInfo.verifyExactPeopleDataIsDisplayed(parameter);
    });
    });




});
