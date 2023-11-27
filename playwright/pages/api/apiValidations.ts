import { APIResponse, expect } from "playwright/test";
import { getSessionVariable } from "../../common/utils/sessionUtils";
const ajv = require('ajv');

export class ApiValidation {

    async validateStatusCode(response: APIResponse, statusCode: number) {
        expect(response.status()).toBe(statusCode);
    }

    async validateCount(response: any, count: number) {
        expect(response.count).toBe(count);
    }

    async validateCountIsgreaterThan(response: any, count: number) {
        expect(response.count).toBeGreaterThan(count);
    }
    async validateExactValues(responseBody: any) {
        const expectedValue = getSessionVariable('expectedValueObject');
        expect(responseBody.results[0].name).toBe(expectedValue.name);
        expect(responseBody.results[0].population).toBe(expectedValue.population);
        expect(responseBody.results[0].climate).toBe(expectedValue.climate);
        expect(responseBody.results[0].gravity).toBe(expectedValue.gravity);
    }

    async validateResponseAgainstSchema(schema: any, body: any) {
        const validator = new ajv({ allErrors: true }); // Enable allErrors to get detailed error messages
        const validate = validator.compile(schema);

        // Validate the response against the schema
        const isValid = validate(body);

        if (!isValid) {
            // Log detailed validation errors
            console.error('Validation Errors:', validate.errors);
        }
        // Assert that the response is valid according to the schema
        expect(isValid, 'API response does not match the expected schema').toBeTruthy();
    }

}