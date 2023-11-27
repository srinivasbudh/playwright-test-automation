export const PlanetSchema = {
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
          "rotation_period": { "type": "string" },
          "orbital_period": { "type": "string" },
          "diameter": { "type": ["string", "null"] },
          "climate": { "type": "string" },
          "gravity": { "type": "string" },
          "terrain": { "type": "string" },
          "surface_water": { "type": "string" },
          "population": { "type": "string" },
          "residents": { "type": "array", "items": { "type": "string" } },
          "films": { "type": "array" },
          "created": { "type": "string" },
          "edited": { "type": "string" },
          "url": { "type": "string" }
        },
        "required": ["name", "climate", "gravity", "population"]
      }
    }
  },
  "required": ["count", "next", "previous", "results"]
};

// Define the model and API request function
export interface Planet {
  name: string;
  climate: string;
  gravity: string;
  population: string;
}

export interface PlanetApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}