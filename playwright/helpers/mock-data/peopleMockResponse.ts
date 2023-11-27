import { PeopleAPIResponse } from "../../common/models/people.model";

const peopleMockResponse: Record<string, PeopleAPIResponse> = {
    'Luke Skywalker': require('./json/people/LukeSkywalker.json'),
    'Leia Organa': require('./json/people/LeiaOrgana.json'),
    'Shmi Skywalker': require('./json/people/ShmiSkywalker.json'),
    'Skywalker': require('./json/people/Skywalker.json'),
    'default': require('./json/people/Default.json'),
};

export function mockPeopleData(peopleName: string): PeopleAPIResponse {
    return peopleMockResponse[peopleName];
}
