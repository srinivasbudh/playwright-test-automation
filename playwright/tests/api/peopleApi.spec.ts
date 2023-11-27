import { test } from '@playwright/test';
import { peopleSchema, Person, PeopleAPIResponse } from '../../common/models/people.model';
import { ApiValidation } from '../../pages/api/apiValidations';
import { setSessionVariable } from '../../common/utils/sessionUtils';
import { config } from '../../config';

const PEOPLE_INFO: Person = { name: 'Leia Organa', gender: 'female', birth_year: '19BBY', eye_color: 'brown', skin_color: 'light' };

test.describe('Verify Peoples API', () => {
    let apiValidation = new ApiValidation();

    test('should be able to retrieve exact details', async ({ request }) => {
        const apiEndpoint = `/people/?search=${PEOPLE_INFO.name}`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;
        const peopleResponse = await request.get(apiUrl);
        const peopleResponseBody: PeopleAPIResponse = await peopleResponse.json();
        //sessionVariable is set to retrive at later stage
        setSessionVariable('expectedValueObject', PEOPLE_INFO);
        //All api validations are done below
        apiValidation.validateStatusCode(peopleResponse, 200);
        apiValidation.validateResponseAgainstSchema(peopleSchema, peopleResponseBody);
        apiValidation.validateCount(peopleResponseBody, 1);
        apiValidation.validateExactValues(peopleResponseBody)
    });

    test('should not return any results if no person found', async ({ request }) => {
        const apiEndpoint = `/people/?search=MUSK`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;
        const peopleResponse = await request.get(apiUrl);
        const peopleResponseBody: PeopleAPIResponse = await peopleResponse.json();

        apiValidation.validateStatusCode(peopleResponse, 200);
        apiValidation.validateCount(peopleResponseBody, 0);
    });

    test('should return multiple results if matched the query', async ({ request }) => {
        const apiEndpoint = `/people/?search=er`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;
        const peopleResponse = await request.get(apiUrl);
        const peopleResponseBody: PeopleAPIResponse = await peopleResponse.json();

        apiValidation.validateStatusCode(peopleResponse, 200);
        apiValidation.validateCountIsgreaterThan(peopleResponseBody, 1);
    });
});