import moment from "moment"

function getDateWithMonthName(value){
 const dateValue = moment(value).format('lll')
 return dateValue;
}

export {
    getDateWithMonthName
}