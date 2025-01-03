export type Coordinate = { latitude: number; longitude: number };

export type Preferences = {
  area:
    | "sq feet"
    | "sq yards"
    | "acres"
    | "sq miles"
    | "sq meters"
    | "hectares"
    | "sq km";
  areaShort: "sqft" | "sqyd" | "a" | "sqmi" | "sqm" | "ha" | "sqkm";
  distance: "feet" | "miles" | "yards" | "meters" | "km";
  distanceShort: "ft" | "yd" | "mi" | "m" | "km";
};

export type MapTypes = "satellite" | "hybrid" | "standard";

export type ToolTypes = "AutoMeasure" | "ManualMeasure" | "TapMeasure";

export type Map = {
  id: string;
  dateCreated: Date;
  mapName: string;
  mapType: MapTypes;
  polygonCoordinates: Coordinate[];
  measurements: Preferences;
  tool: ToolTypes;
};
