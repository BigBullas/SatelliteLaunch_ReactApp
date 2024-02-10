export const dateConversion = (date?: string | Date, withTime: boolean = true): string => {
    if (date) {
        date = new Date(date);
    } else {
        date = new Date();
    }

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    
    if (parseInt(hours) < 10) {
        hours = '0' + hours;
    }
    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes;
    }
    if (parseInt(seconds) < 10) {
        seconds = '0' + seconds;
    }

    if (withTime) {
        return hours + ':' + minutes + ':' + seconds + ' ' + date.toLocaleDateString('en-GB');
    }
    return date.toLocaleDateString('en-GB');
}

export const dateComparison = (firstDate: Date | string, secondDate: Date | string): boolean => {
    firstDate = new Date(firstDate);
    if (isNaN(firstDate.getTime())) {
        return true;
    }

    secondDate = new Date(secondDate);
    if (isNaN(secondDate.getTime())) {
        return true;
    }

    return firstDate.getTime() >= secondDate.getTime();
}