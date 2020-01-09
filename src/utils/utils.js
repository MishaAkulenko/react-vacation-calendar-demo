
export const getDateLocale = (number, type = 'days') => { //Для вычисления окончания локализации дат. Месяц, месяца, месяцев и тд...
    const locales = {
        days: ['день', 'дня', 'дней'],
        months: ['месяц', 'месяца', 'месяцев'],
    };

    const b = number % 10,
        a = (number % 100 - b) / 10;

    if (a === 0 || a >= 2) {
        if (b === 0 || (b > 4 && b <= 9)) {
            return locales[type][2];
        }
        if (b !== 1) {
            return locales[type][1];
        }
        return locales[type][0];
    }
    return locales[type][2];
};
