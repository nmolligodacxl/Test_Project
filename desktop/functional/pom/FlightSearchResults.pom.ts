
export class FlightSearchResultsPOM {
    
    protected listingCards(): WebdriverIO.ElementArray {
        return $$('.listingCard') ;
    }

    protected smartValue(): WebdriverIO.Element {
        return $('.smartValueFares') ;
    }
    
    waitUntilPageLoad() {
        this.smartValue().waitForExist();//
    }

    flightResultsCount(): Number {
        return this.listingCards().length ; 
    }

    
    
  }