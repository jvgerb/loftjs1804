/* ДЗ 3 - работа с исключениями и отладчиком */

function checkIsFunction(fn) {
    if (typeof fn !== 'function' || !fn) {
        throw new Error('fn is not a function');
    }
}

function checkIsArray(array) {
    if (typeof array !== 'object' || !array ||
        array.length === 0 || !array[Symbol.iterator]) {
        throw new Error('empty array');
    }
}

function checkIsNumber(number) {
    if (typeof number !== 'number') {
        throw new Error('number is not a number');
    }
}

function checkIsZero(number) {
    if (number === 0) {
        throw new Error('division by 0');
    }
}
/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    checkIsArray(array);
    checkIsFunction(fn);

    // порядок двух if-ов выше неважен, если поменять местами, тесты пропустят

    var result = true;

    for (var el of array) {
        result = result && fn(el);
    }

    return result;
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    checkIsArray(array);
    checkIsFunction(fn);

    // порядок двух if-ов выше важен, если поменять местами, то упадет 1 тест

    var result = false;

    for (var el of array) {
        result = result || fn(el);
    }

    return result;
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
    checkIsFunction(fn);

    var result = [];

    for (var el of args) {
        try {
            fn(el);
        } catch (e) {
            result.push(el);
        }
    }

    return result;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(n = 0) {
    checkIsNumber(n);
    var calc = {
        sum: (...args) => args.reduce((prev, el) => prev + el, n),
        dif: (...args) => args.reduce((prev, el) => prev - el, n),
        div: (...args) => args.reduce(
            function(prev, el) {
                checkIsZero(el);

                return prev / el;
            }, n),
        mul: (...args) => args.reduce((prev, el) => prev * el, n)
    };

    return calc;
}

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};