import { test } from '@playwright/test';
import {PlanetSchema, Planet, PlanetApiResponse} from '../../common/models/planet.model';
import { ApiValidation } from '../../pages/api/apiValidations';
import { setSessionVariable } from '../../common/utils/sessionUtils';
import {config} from '../../config';

const PLANET_INFO: Planet = { name: 'Bespin',  population: '6000000', gravity: '1.5 (surface), 1 standard (Cloud City)', climate: 'temperate'};

test.describe('Verify Planet API', () => {
    let apiValidation = new ApiValidation();
    

    test('should be able to retrieve exact details', async ({ request }) => {
        const apiEndpoint = `/planets/?search=${PLANET_INFO.name}`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;

        const planetResponse = await request.get(apiUrl);
        const planetResponseBody : PlanetApiResponse = await planetResponse.json();
        setSessionVariable('expectedValueObject',PLANET_INFO);

        apiValidation.validateStatusCode(planetResponse,200);
        apiValidation.validateResponseAgainstSchema(PlanetSchema,planetResponseBody);
        apiValidation.validateCount(planetResponseBody,1);
        apiValidation.validateExactValues(planetResponseBody)   
    });

    test('should not return any results if no planet found', async ({ request }) => {
        const apiEndpoint = `/planets/?search=MUSK`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;

        const planetResponse = await request.get(apiUrl);
        const planetResponseBody : PlanetApiResponse = await planetResponse.json();

        apiValidation.validateStatusCode(planetResponse,200);
        apiValidation.validateCount(planetResponseBody,0);
    });

    test('should return multiple results if matched the query', async ({ request }) => {
        const apiEndpoint = `/planets/?search=er`;
        const apiUrl = `${config.API_BASE_URI}${apiEndpoint}`;

        const planetResponse = await request.get(apiUrl);
        const planetResponseBody : PlanetApiResponse = await planetResponse.json();

        apiValidation.validateStatusCode(planetResponse,200);
        apiValidation.validateCountIsgreaterThan(planetResponseBody,1);
    });
});