
//function to convert date to "yyyy-mm-dd" format
export const convertToYYYYMMDD = (date) => {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
  
 //function to convert date to "date day" [ex: 3rd Sat, 5th Mon] format
  export const convertToDDDAY = (val) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let date = val.getDate().toString();
    if(date === "1" || date === "21" || date === "31") {
      date = date + "st";
    } else if (date === "2" || date === "22") {
      date = date + "nd";
    } else if (date === "3" || date === "23") {
      date = date + "rd";
    } else {
      date = date + "th";
    }
    let day = days[val.getDay()];
  
    return [date, day].join(" ");
  }
  