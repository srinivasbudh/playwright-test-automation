export const peopleSchema = {
  "type": "object",
  "properties": {
    "count": { "type": "integer" },
    "next": { "type": ["string", "null"] },
    "previous": { "type": ["string", "null"] },
    "results": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "height": { "type": "string" },
          "mass": { "type": "string" },
          "hair_color": { "type": "string" },
          "skin_color": { "type": "string" },
          "eye_color": { "type": "string" },
          "birth_year": { "type": "string" },
          "gender": { "type": "string" },
          "homeworld": { "type": "string" },
          "films": { "type": "array", "items": { "type": "string" } },
          "species": { "type": "array", "items": { "type": "string" } },
          "vehicles": { "type": "array", "items": { "type": "string" } },
          "starships": { "type": "array", "items": { "type": "string" } },
          "created": { "type": "string" },
          "edited": { "type": "string" },
          "url": { "type": "string" }
        },
        "required": ["name", "skin_color", "eye_color", "birth_year", "gender"]
      }
    }
  },
  "required": ["count", "next", "previous", "results"]
}

export interface Person {
  name: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface PeopleAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}