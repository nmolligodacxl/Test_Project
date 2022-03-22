import { default as Logger } from './logger';
// import { CultureKey ,date_es_ES } from '../index';

/*
    Date and Time Patterns

    yy = 2-digit year; yyyy = full year

    M = digit month; MM = 2-digit month; MMM = short month name; MMMM = full month name

    EEEE = full weekday name; EEE/ddd = short weekday name

    d = digit day; dd = 2-digit day; ddd = short day name;

    h = hours am/pm; hh = 2-digit hours am/pm; H = hours; HH = 2-digit hours

    m = minutes; mm = 2-digit minutes; aaa = AM/PM

    s = seconds; ss = 2-digit seconds

    S = miliseconds

    Sample usages are at the end of class.
*/

interface IDateHelperOptions {
    monthNames?: Array<string>;
    dayOfWeekNames?: Array<string>;
    shortDayOfWeekNames?: Array<string>;
}
/**
 * Utility class for date functionality
 */
export class DateHelper {
    private monthNames: Array<string> = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    private dayOfWeekNames: Array<string> = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    private shortDayOfWeekNames: Array<string> = [
        "Sun", "Mon", "Tue",
        "Wed", "Thu", "Fri", "Sat"
    ];  
    

    /**
     * Culture based months and days name can be passed to constructor.
     * @param options 
     */
    constructor(options?: IDateHelperOptions, locale? : string) {

        switch(locale) { 
            /* case CultureKey.esES: { 
                this.monthNames =  date_es_ES.monthNames;
                this.dayOfWeekNames = date_es_ES.dayOfWeekNames;
                this.shortDayOfWeekNames = date_es_ES.shortDayOfWeekNames;
               break; 
            }  */
            default: {  
                // It will provide a way to handle culture based text
                this.monthNames =  this.monthNames;
                this.dayOfWeekNames = this.dayOfWeekNames;
                this.shortDayOfWeekNames = this.shortDayOfWeekNames;
              
               break; 
            } 
         } 
       
       
    }

    /**
     * Method to add number of days in given date object or in today date
     * @param days 
     * @param dateObj 
     */
    public addDays(days: number, dateObj?: Date): Date {
        dateObj = dateObj || new Date();
        let date = new Date(dateObj.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    /**
     * Get formatted date by adding days to today's date
     * @param daysFromToday 
     * @param formatter 
     */
    public getFormattedDateByDays(daysFromToday: number, formatter: string = 'ddd, MMM d'): string {
        const date: Date = this.addDays(daysFromToday);
        const formattedDate = this.formatDate(date, formatter);
        Logger.debug(`Date after using formatter ${formatter} is ${formattedDate}`);
        return formattedDate;
    }

    /**
     * Format the date object as per given format
     * @param date 
     * @param formatter 
     */
    public formatDate(date: Date, formatter: string = 'ddd, MMM d'): string {
        return this.formatDateByPattern(date, formatter);
    }

    /**
     * Method to parse the date string in Date object
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
     * @param date string A string representing a simplification of the ISO 8601 calendar date extended format.
     * 
     * Supported formats: 
     * '01 Jan 1970 00:00:00 GMT', 
     * '10-21-2021'
     * 'Wed, Aug 18' // it wil add current or future year to string eg 'Wed,Aug 18 2021' and returns the date object
     * 'Wed, Jun 18 2022'
     * 'Wed, Jun 18 20'
     * '01 Jan 1970 00:00:01 GMT'
     * '04 Dec 1995 00:12:00 GMT'
     * '2011-09-24'
     * '2011/09/24'
     * etc.
     */
    public parseDate(dateString: string): Date {
        let dateInMilliSeconds;
        if (this.checkIfFourDigitYearPresentInDateString(dateString)) {
            dateString = dateString.includes(":") ? dateString : dateString + " 00:00:00.000Z";
            dateInMilliSeconds = Date.parse(dateString);
        } else {
            const currentOrFutureYear: string = this.getCurrentOrFutureYear(dateString);
            const updatedDatewithYear: string = dateString + " " + currentOrFutureYear + " 00:00:00.000Z";
            dateInMilliSeconds = Date.parse(updatedDatewithYear);
        }
        return new Date(dateInMilliSeconds);
    }

    /**
     * Method to check if date string has four digit year in it.
     * @param date string A string representing a simplification of the ISO 8601 calendar date extended format.
     * 
     * Example: 
     * '01 Jan 1970 00:00:00 GMT', returns true
     * '10-21-2021', returns true
     * '2021-12-12', returns true
     * 'Thu, Aug 18' returns false
     * etc.
     */
    public checkIfFourDigitYearPresentInDateString(dateString: string): boolean {
        let isYearPresentInString = false;
        const splitedDateString = dateString.split(/[ \- /]+/);
        for (let index = 0; index < splitedDateString.length; index++) {
            const isNumber = Number(splitedDateString[index]);
            if (!isNaN(isNumber)) {
                isYearPresentInString = isNumber.toString().length === 4 ? true : false;
                if (isYearPresentInString)
                    break;
            }
        }
        return isYearPresentInString;
    }


    /**
     * Method to get current or future year based on date and month in the dateString.
     * @param date string A string representing a simplification of the ISO 8601 calendar date extended format.
     * 
     * Example: 
     * 'Thu, Aug 18' returns next year if date is passed in the current year 
     * otherwise returns current year 
     * etc.
     */
    private getCurrentOrFutureYear(dateString: string): string {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const recievedDay = date.getDate();
        const currentDate = new Date();
        const currentmonthName = this.monthNames.indexOf(this.monthNames[currentDate.getMonth()]) + 1;
        const recievedMonthName = this.monthNames.indexOf(month) + 1;
        const currentDay = currentDate.getDate();
        let currentYear;

        if (recievedMonthName < currentmonthName) {
            currentYear = currentDate.getFullYear() + 1;
        } else if (recievedMonthName == currentmonthName && currentDay > recievedDay) {
            currentYear = currentDate.getFullYear() + 1;
        } else {
            currentYear = currentDate.getFullYear();
        }
        return currentYear;
    }

    /**
     * Method to format the date and as per the given format.
     * @param date 
     * @param patternStr 
     */
    private formatDateByPattern(date, patternStr): string {
        if (!patternStr) {
            patternStr = 'mm-dd-yyyy';
        }

        let day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            miliseconds = date.getMilliseconds(),
            h = hour % 12,
            hh = this.twoDigitPad(h),
            HH = this.twoDigitPad(hour),
            mm = this.twoDigitPad(minute),
            ss = this.twoDigitPad(second),
            aaa = hour < 12 ? 'AM' : 'PM',
            EEEE = this.dayOfWeekNames[date.getDay()],
            EEE = this.shortDayOfWeekNames[date.getDay()],
            dd = this.twoDigitPad(day),
            ddd = this.shortDayOfWeekNames[date.getDay()],
            M = month + 1,
            MM = this.twoDigitPad(M),
            MMMM = this.monthNames[month],
            MMM = MMMM.substr(0, 3),
            yyyy = year + "",
            yy = yyyy.substr(2, 2);

        // checks to see if month name will be used

        patternStr = patternStr
            .replace('hh', hh).replace('h', h)
            .replace('HH', HH).replace('H', hour)
            .replace('mm', mm).replace('m', minute)
            .replace('ss', ss).replace('s', second)
            .replace('S', miliseconds)
            // Try to convert the formats in other formats to avoid collision
            .replace('ddd', 'kkk')
            .replace('dd', 'jj')
            .replace('d', day)
            .replace('jj', dd)
            .replace('kkk', ddd)

            .replace('EEEE', EEEE).replace('EEE', EEE)
            .replace('yyyy', yyyy)
            .replace('yy', yy)
            .replace('aaa', aaa);

        if (patternStr.indexOf('MMM') > -1) {
            patternStr = patternStr
                .replace('MMMM', MMMM)
                .replace('MMM', MMM);
        }
        else {
            patternStr = patternStr
                .replace('MM', MM)
                .replace('M', M);
        }

        return patternStr;
    }

    /**
     * Method to add padding for double digit number
     * @param num 
     */
    private twoDigitPad(num: number): number | string {
        return num < 10 ? "0" + num : num;
    }
}

// Sample examples
// const dateHelper = new DateHelper();

// console.log(dateHelper.formatDate(new Date()));
// console.log(dateHelper.formatDate(new Date(), 'dd-MMM-yyyy'));
// console.log(dateHelper.formatDate(new Date(), 'EEEE, MMMM d, yyyy HH:mm:ss.S aaa'));
// console.log(dateHelper.formatDate(new Date(), 'EEE, MMM d, yyyy HH:mm'));
// console.log(dateHelper.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss.S'));
// console.log(dateHelper.formatDate(new Date(), 'M/dd/yyyy h:mmaaa'));
// console.log(dateHelper.formatDate(new Date(), 'ddd, MMM d'));
// Thu, Jan 21 = ddd, MMM d
