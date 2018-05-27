/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    var p = new Promise((resolve) =>
        setTimeout(() => resolve(), 1000 * seconds));

    return p;
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return fetch(url, { responseType: 'json' })
        .then((response) => response.status >= 400 ? [] : response.json())
        .then((objTowns) => objTowns.sort((el1, el2) => el1.name >= el2.name ? 1 : -1))
        .catch(() => []);
}

export {
    delayPromise,
    loadAndSortTowns
};