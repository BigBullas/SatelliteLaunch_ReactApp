export const dateConversion = (date: Date): string => {
    if (date) {
        date = new Date(date);
    } else {
        date = new Date();
    }

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    let seconds = date.getSeconds().toString();
    
    // Добавляем ноль перед числами меньше 10 для корректного форматирования времени
    if (parseInt(hours) < 10) {
        hours = '0' + hours;
    }
    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes;
    }
    if (parseInt(seconds) < 10) {
        seconds = '0' + seconds;
    }


    return hours + ':' + minutes + ':' + seconds + ' ' + date.toLocaleDateString('en-GB')
}