import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import {
    Given, When, Then, And, 
    Logger,
    searchTwoAdults, flightSearchRoundTrip, flightTravelDate, flightTripType,
    FlightSearch, FlightSearchResults
} from '../../../index';
import { myContainer } from '../../../inversify.config';
import { FlightSearchData, FlightTravelDate, FlightTraveler, FlightInputInfo } from '../dsl/model/flightSearch';
import logger from '../util/logger';

let travelDate: FlightTravelDate;
let travelerInfo: FlightTraveler;  
let travelData: FlightInputInfo;
let tripType: flightTripType;
//let flightSearch: FlightSearch;
let flightSearch = myContainer.get<FlightSearch>(FlightSearch.CONTAINER_ID);


let flightSearchResults: FlightSearchResults;
before( () => {
    try {
      Given("I am on www.makemytrip.com search page");
      //browser.url(`http:/www.makemytrip.com`);
      browser.url('');
      //flightSearch = new FlightSearch();
      flightSearchResults = new FlightSearchResults();
      flightSearch.waitUntilPageLoad(); 

      
    } catch (error) {
        Logger.error(`Test failed due to error : ${error.message}`);
    }
});


describe('Flight: Search feature', () => {
    it('Verify User should be able to search flight', () => {
        When('I enter flight search criteria');
        travelDate = flightTravelDate;
        travelerInfo = searchTwoAdults;
        travelData = flightSearchRoundTrip;
        tripType = flightTripType.ROUNDTRIP;
        
        flightSearch.initiateFlightSearch(tripType, travelDate, travelData, travelerInfo );
        And('When I perform flight search');
        flightSearchResults.waitUntilPageLoad();
        Then('I should be able to see some results');
        expect(flightSearchResults.flightSearchResults()).toBeGreaterThan(0);

        browser.pause(2000);
    

        
       
    });
});

