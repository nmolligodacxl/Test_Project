
export class FlightSearchPOM {
    
    protected cbRoundTrip(): WebdriverIO.Element {
        return $('li[data-cy=roundTrip]') ;
    }
    
    protected loginPopUp(): WebdriverIO.Element {
        return $('.autopop__wrap.makeFlex') ;
    }

    protected loginMenu(): WebdriverIO.Element {
        return $('li[data-cy=account]') ;
    }

    public isLoginPopUpVisible(): boolean {
        return this.loginPopUp().isDisplayed();
    }

    protected txtDeparture(): WebdriverIO.Element {
        return $('input[data-cy=fromCity]') ;
    }

    protected txtAutoSuggestDeparture(): WebdriverIO.Element {
        return $('input[placeholder=From]') ;
    }

    protected autoSuggest(): WebdriverIO.ElementArray {
        return $$('li[role=option]') ;
    }

    protected txtAutoSuggestDestination(): WebdriverIO.Element {
        return $('input[placeholder=To]') ;
    }

    protected dayPicker(dayValue: string): WebdriverIO.Element {
        return $('.DayPicker-Day[aria-label=\''+dayValue+'\']') ;
    }

    protected txtTraveler(): WebdriverIO.Element {
        return $('span[data-cy=travellerText]') ;
    }

    protected adultCount(adultCount:string): WebdriverIO.Element {
        return $('li[data-cy=adults-'+adultCount+']') ;
    }

    protected applyTravler(): WebdriverIO.Element {
        return $('button[data-cy=travellerApplyBtn]') ;
    }

    protected btnSubmitSearch(): WebdriverIO.Element {
        return $('p[data-cy=submit]') ;
    }

    clickloginMenu() {
        this.loginMenu().click();
    }

    clickRoundTrip() {
        this.cbRoundTrip().click();
    }

    waitUntilPageLoad() {
        this.cbRoundTrip().waitForDisplayed();
    }

    protected typeDeparture(departureValue: string) {
        this.txtDeparture().click();// .clearValue();
        browser.pause(1000);
        this.txtAutoSuggestDeparture().setValue(departureValue);
        browser.pause(1000);
        browser.keys('Space'); 
        // waiting for 1 secs to load results from autosuggest
        browser.pause(1000);
    }

    enterDepartureValue (departureValue: string) {
        this.typeDeparture(departureValue);
        this.autoSuggest()[0].click();
    }

    protected typeDestination(destinationValue: string) {
        this.txtAutoSuggestDestination().click();// .clearValue();
        browser.pause(1000);
        this.txtAutoSuggestDestination().setValue(destinationValue);
        browser.pause(1000);
        browser.keys('Space'); 
        // waiting for 1 secs to load results from autosuggest
        browser.pause(1000);
    }

    enterDestinationValue (destinationValue: string) {
        this.typeDestination(destinationValue);
        this.autoSuggest()[0].click();
    }

    clickDate(dayValue: string) {
        this.dayPicker(dayValue).click();
    }

    clickTraveler() {
        this.txtTraveler().click();
    }

    pickAdults(adultCount: string) {
        this.adultCount(adultCount).click();
    }

    clickApplyTraveler() {
        this.applyTravler().click();
    }
  
    clickSubmitSearch() {
        this.btnSubmitSearch().click();
    }
  }