export interface FlightTravelDate {
  departureDate: Date;
  arrivalDate?: Date;
}

export interface FlightDate {
  departureDate: string;
  arrivalDate?: string;
}

export interface FlightLocation {
  arrival: string;
  departure: string;
}

export interface FlightTotalTravelers{
  totalTravelers: string;
}

export interface FlightTraveler {
  adultCount: number;
  childrenCount: number;
  infantInSeat: number;
  infantInLap: number;
  childrenAge?: number[];
}

export interface FlightSearchData{
  depDesLocation: FlightLocation[],
  depDesDate: FlightDate[],
  travelers: FlightTotalTravelers
}

export interface FlightDeparture {
  location: string;
  index: number;
}
export interface FlightDestination {
  location: string;
  index: number;
}
export enum flightPreferredClass {
  ECONOMY = 'ECONOMY',
  PREMIUMECONOMY = 'PREMIUMECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST',
}
export enum flightTripType {
  ONEWAY = 'ONEWAY',
  ROUNDTRIP = 'ROUNDTRIP',
  MULTICITY = 'MULTICITY',
}
export interface FlightInputInfo { 
  flight:{
    flightDeparture :FlightDeparture
    flightDestination:FlightDestination
  }[]
  flightTraveller?: FlightTraveler
  flightPreferredClass?:flightPreferredClass
}