const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function daysCalculator(startDate, endDate) {
    const startArr = startDate.split("/"); 
    const endArr = endDate.split("/");
    const [startDays, startMonths, startYears] = startArr; // Deconstructing the split array
    const [endDays, endMonths, endYears] = endArr;
    let yearDiff = endYears - startYears; 
    let totalAmountOfDays = 0;

    if (yearDiff !== 0) {
        totalAmountOfDays += (yearDiff-1)*365; // adds 365 days for each year in between
        let monthsToBeAdded = 11-(12-startMonths)-1; // outputs the correct indices to be added of first year. **INCLUDING complete first month
        for (let i = 11; i > monthsToBeAdded; i--) {totalAmountOfDays += monthDays[i];} // adds the days for each month left in first year
        for (let i = 0; i < endMonths-1; i++) {totalAmountOfDays += monthDays[i];} // adds the days for each month of the last year
    } else {
        const includedMonths = [];
        for (let i = +startMonths; i <= endMonths; i++) {includedMonths.push(i)};
        for (let i = 0; i < includedMonths.length-1; i++) {totalAmountOfDays += monthDays[includedMonths[i]-1];} // adds the days for each month of the last year
    }
    totalAmountOfDays -= parseInt(startDays); // Corrects incorrect month calc by substracting days
    totalAmountOfDays += parseInt(endDays);

    // the leap year issue below: 
    const includedYears = []; 
    const includedLeapYears = [];

    for (let i = parseInt(startYears); i <= endYears; i++) {includedYears.push(i)}
    for (let i = 0; i < includedYears.length; i++) {if(includedYears[i] % 4 === 0) {includedLeapYears.push(includedYears[i])}}
    for (let i = 0; i < includedLeapYears.length; i++) {
        totalAmountOfDays += includedLeapYears[i] > startYears && includedLeapYears[i] < endYears ? 1 : 0; // adds days for in between years
        totalAmountOfDays += includedLeapYears[i] == startYears && startMonths < 3?  1:  0; // checks if day needs to be added for start year
        totalAmountOfDays += includedLeapYears[i] == endYears && endMonths > 2? 1: 0; // checks if day needs to be added for end year
    }
    console.log(`Amount of days between ${startDate} and ${endDate} is of ${totalAmountOfDays} days.`); 
}

// Introduce the dates here
daysCalculator("25/02/1956", "01/03/2032");

// To compare if result is correct (keep in mind different format)
const diffInMs = new Date('03/01/2032 00:00:00') - new Date('02/25/1956 00:00:00'); 
const diffInDays = diffInMs / (1000 * 60 * 60 * 24); 
console.log(diffInDays);
