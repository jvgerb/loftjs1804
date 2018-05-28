/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import CookieRepo from './CookieRepo';
import CookieRenderer from './CookieRenderer';

const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

var cookieRepo = new CookieRepo();
var cookieRenderer = new CookieRenderer(listTable, cookieRepo);

filterNameInput.addEventListener('keyup', function() {

    // так должно быть для прохождения тестов
    // loadCookies(); // вместо debounce(loadCookies, 800);

    // поиск и загрузка найденных куки не чаще, чем один раз в 1 сек
    debounce(loadCookies, 800)();
});

addButton.addEventListener('click', () => {
    cookieRepo.insertCookie(addNameInput.value, addValueInput.value);
    loadCookies();
});

// загрузка куки при старте страницы
document.addEventListener('load', loadCookies());

/**
 * Загрузка таблицы кук согласно фильтрации
 */
function loadCookies() {
    cookieRenderer.loadCookies(filterNameInput.value);
}

/**
 * Обеспечивает вызов функции f не чаще, чем 1 раз в ms миллисекунд
 * @param {function} f - функция
 * @param {int} ms - интервал задержки
 */
function debounce(f, ms) {

    let timer = null;

    // возвращаем обертку с возможностью указать ей аргументы при вызове
    return function(...args) {
        const runFunc = () => {
            // выполняем функцию с контекстом, в котором была бы вызвана f, и с аргументами f
            f.apply(this, args);
            // обнуляем таймер
            timer = null;
        }

        // обнуляем предыдущий заданный таймер
        if (timer) {
            clearTimeout(timer);
        }

        // заводим новый таймер
        timer = setTimeout(runFunc, ms);
    }
}