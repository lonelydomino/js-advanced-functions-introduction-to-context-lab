// Your code here
function createEmployeeRecord(array){
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arrays){
    let objArray = [];
    arrays.forEach(x => objArray.push(createEmployeeRecord(x)));
    return objArray;
}

function createTimeInEvent(employee, dateStamp){
    let obj = {
        type: "TimeIn",
        date: dateStamp.slice(0,10),
        hour: parseInt(dateStamp.slice(11,15), 10)
    }
    employee.timeInEvents.push(obj)
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let obj = {
        type: "TimeOut",
        date: dateStamp.slice(0,10),
        hour: parseInt(dateStamp.slice(11,15), 10)
    }
    employee.timeOutEvents.push(obj)
    return employee
}

function hoursWorkedOnDate(employee, date){
    let inTime = employee.timeInEvents.find(x => x.date === date)
    let outTime = employee.timeOutEvents.find(x => x.date === date)
    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(employee,date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}   

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(x => x.date)
    let pay = dates.reduce(function(i, d){
        return i + wagesEarnedOnDate(employee, d)
    }, 0)
    return pay
}

function findEmployeeByFirstName(array, name){
    return array.find(x => x.firstName === name)
}

function calculatePayroll(array){
    return array.reduce(function(i, employee){
        return i + allWagesFor(employee)
    }, 0)
}