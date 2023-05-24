export interface IRobotsStatistics {
  all: number;
  "Healthcare facility assigned Robot": number;
  "Home assigned Robot": number;
}

export interface IFacilityTypes {
  [key: string]: number;
}

export interface IFacilitiesStatistics extends IFacilityTypes {
  all: number;
}
export interface IFacilitiesAndRobotsStatistics
  extends IRobotsStatistics,
    IFacilitiesStatistics {}

export interface IDevicesStatistics {
  [key: string]: number;
  all: number;
  // "Specialized Medical Device": number;
  // "Blood Pressure": number;
  // "Pulse Oximeter": number;
  // "Weight Scale": number;
  // Thermometer: number;
  // "Exam Camera": number;
  // Glucometer: number;
  // Cart: number;
}

export interface IUserStatistics {
  all_count: number;
  gender_statistic: { gender: "male" | "female"; count: number }[];
  country_statistic: { country: "string"; count: number }[];
}
