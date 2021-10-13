function reverseStr(str) {
  // var listOfChars = str.split("");
  // var reverseListOfChars = listOfChars.reverse();
  // var reversedStr = reverseListOfChars.join("");

  // return reversedStr;

  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  var reverse = reverseStr(str);

  return str === reverse;
}

// var date = {
//   day: 5,
//   month: 9,
//   year: 2021
// };

function convertDateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

// console.log(convertDateToStr(date));

//Get all date formats
function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//Check palindrome for all date formats
function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var checkPalindrome = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      checkPalindrome = true;
      break;
    }
  }
  return checkPalindrome;
}

//Check for leap year
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

//Get next date i.e. "what will be the date tomorrow?"
function getNextDate(date) {
  var day = date.day + 1; //increment the day by 1
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //Array of no. of days in every month

  //Check if month is February
  if (month === 2) {
    //Then checking for leap year
    if (isLeapYear(year)) {
      //If yes, go to march after 29 days
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      //If no, go to march after 28 days
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //Checking if the date exceeds the max. days in the month
    if (day > daysInMonth[month - 1]) {
      //If yes, reset the day to 1 and increment month
      day = 1;
      month++;
    }
  }
  //Checking if no. of months exceeds 12
  if (month > 12) {
    //If yes, increment year by 1 and reset month to 1
    month = 1;
    year++;
  }

  //Finally return object with the day, month, year
  return {
    day: day,
    month: month,
    year: year
  };
}

//Get next palindrome date
function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPrevDate(date) {
  var day = date.day - 1; //decrement the day by 1
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //Array of no. of days in every month

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      day = daysInMonth[month - 1];
    }
  }
  //Checking if month is less than 1
  if (month < 1) {
    month = 12;
    year--;
    day = daysInMonth[month - 1];
  }

  //Finally return object with the day, month, year
  return {
    day: day,
    month: month,
    year: year
  };
}

function getPrevPalindromeDate(date) {
  var ctr = 0;
  var prevDate = getPrevDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
    if (isPalindrome) {
      break;
    }
    prevDate = getPrevDate(prevDate);
  }
  return [ctr, prevDate];
}

var date = {
  day: 13,
  month: 3,
  year: 2021
};

// console.log(getNextPalindromeDate(date));
// console.log(getPrevDate(date));
// console.log(getPrevPalindromeDate(date));

var bdayInput = document.querySelector("#bday-input");
var showButton = document.querySelector("#show-btn");
var result = document.querySelector("#result");

function clickHandler() {
  var bdayStr = bdayInput.value;

  if (bdayStr !== "") {
    var listOfDates = bdayStr.split("-");

    var date = {
      day: Number(listOfDates[2]),
      month: Number(listOfDates[1]),
      year: Number(listOfDates[0])
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      result.innerText = "Yay! Your b'day is a palindrome!";
    } else {
      var [prevCtr, prevDate] = getPrevPalindromeDate(date);
      var [nextCtr, nextDate] = getNextPalindromeDate(date);

      result.innerText = `Oh no! Your b'day is not a palindrome!\nPrevious palindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}. It was ${prevCtr} day(s) ago.\nNext palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. It is ${nextCtr} day(s) ahead.`;
    }
  }
}

showButton.addEventListener("click", clickHandler);
