/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn, th) {
    if (!array || !fn || typeof fn != 'function') {
        return;
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === undefined || array[i] === null) {
            continue;
        }
        fn.apply(th, [array[i], i, array]);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn, th) {
    if (!array || !fn || typeof fn != 'function') {
        return;
    }

    var result = [];

    for (var i = 0; i < array.length; i++) {
        result.push(
            fn.apply(th, [array[i], i, array]));
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, prevValue) {
    if (!array || !fn || typeof fn != 'function') {
        return;
    }

    var result = prevValue !== undefined ? prevValue : array[0];
    var i = prevValue !== undefined ? 0 : 1;

    for (; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var res = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            res.push(key.toUpperCase());
        }
    }

    return res;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, start, end) {
    if (!array) {
        return [];
    }

    var startPos, stopPos;

    if (start === undefined) {
        startPos = 0;
    } else {
        startPos = start >= 0 ? start : array.length + start;
    }

    if (startPos < 0) {
        startPos = 0;
    }

    if (end === undefined) {
        stopPos = array.length;
    } else {
        stopPos = end >= 0 ? end : array.length + end;
    }

    if (stopPos > array.length) {
        stopPos = array.length;
    }

    var result = [];

    while (startPos < stopPos) {
        result.push(array[startPos++]);
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var proxy = new Proxy(obj, {
        set(target, prop, value) {

            if (typeof value !== 'number') {
                return false;
            }
            target[prop] = value * value;

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};