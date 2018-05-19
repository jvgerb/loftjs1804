/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return fetch(url, { responseType: 'json' })
        .then((response) => response.status >= 400 ? [] : response.json())
        .then((objTowns) => objTowns.sort((el1, el2) => el1.name >= el2.name ? 1 : -1));
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/**
 * Загрузка списка городов, возвращающая ошибку
 */
function loadTownsError() {
    const url = 'https://bad-host/cities.json';

    return fetch(url, { responseType: 'json' })
        .then((response) => response.status >= 400 ? [] : response.json())
        .then((objTowns) => objTowns.sort((el1, el2) => el1.name >= el2.name ? 1 : -1));
}

/**
 * Переключает видимость элемента
 * @param {*} el - html-элемент
 */
function toggleVisibility(el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

/**
 * Перекючает видимость блоков с индикацией загрузки и контролами для поиска
 */
function toggleVisibilityAll() {
    toggleVisibility(loadingBlock);
    toggleVisibility(filterBlock);
}

/**
 * Добавляет дочерний элемент с результатом поиска
 * @param {*} div - контейнер
 * @param {*} el - результат поиска
 */
function addResult(div, el) {
    var p = document.createElement('p');

    p.innerText = el;
    div.appendChild(p);
}

/**
 * Показывает/скрывает блок с ошибкой
 */
function showError(visible) {
    searchError.style.display = visible ? 'block' : 'none';
}

/**
 * Выполняет поиск города, в названии которого есть searchKey
 * Переключает видимость контролов в начале и в конце поиска
 * @param {*} searchKey - поисковое слово
 * @param {*} searchFunc - функция для поиска городов
 */
function searchTowns(searchKey, searchFunc) {
    if (searchKey === '') {
        filterResult.innerHTML = '';

        return;
    }
    if (searchKey.length < 2) {
        return;
    }

    showError(false);
    toggleVisibilityAll();
    filterResult.innerHTML = '';

    searchFunc()
        .then((arr) => {
            arr.map((el) => el.name)
                .filter((el) => isMatching(el, searchKey))
                .forEach((el) => addResult(filterResult, el));

            toggleVisibilityAll();
            filterInput.focus();
        })
        .catch(() => {
            filterResult.innerHTML = '';

            toggleVisibilityAll();
            showError(true);
        });
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с выводом ошибки */
const searchError = homeworkContainer.querySelector('#search-error');
/* Кнопка "Повторить" */
const repeatSearch = homeworkContainer.querySelector('#repeat-search');
/* Чекбокс "Эмуляция ошибки" */
const makeError = homeworkContainer.querySelector('#make-error');

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия клавиш в текстовом поле
    setTimeout(() => searchTowns(filterInput.value, makeError.checked ? loadTownsError : loadTowns), 800);
});

repeatSearch.addEventListener('click', function() {
    setTimeout(() => searchTowns(filterInput.value, loadTowns), 800);
});

export {
    loadTowns,
    isMatching
};