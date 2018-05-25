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

/**
 * Получение объекта со всеми куками документа
 */
function getDocumentCookies() {
    return new Map(document.cookie
        .split('; ')
        .map((item) => item.split('='))
        .map((arr) => [arr[0], decodeURIComponent(arr[1])]));
}

/**
 * Проверяет наличие вхождения подстроки chunk в строку full без учета регистра
 * @param {string} full - Строка для применения фильтра
 * @param {string} chunk - Искомая подстрока
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/**
 * Выбирает все куки документа, чье имя или значение содержит в себе подстроку filter
 */
function getFilteredCookies(filter) {
    let all = getDocumentCookies();

    if (!filter) {
        return all;
    }
    let filtered = new Map();

    all.forEach((value, key) => {
        if (isMatching(key, filter) || isMatching(value, filter)) {
            filtered.set(key, value);
        }
    });

    return filtered;
}

/**
 * Создает строку таблицы для куки с указанными name и value
 * @param {string} name - cookie's name
 * @param {string} value - cookie's value
 */
function renderCookie(name, value) {

    let tr = document.createElement('TR'),
        tdName = document.createElement('TD'),
        tdValue = document.createElement('TD'),
        tdDel = document.createElement('TD'),
        btnDel = document.createElement('button');

    listTable.appendChild(tr);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDel);
    tdDel.appendChild(btnDel);

    tdName.innerHTML = name;
    tdValue.innerHTML = value;
    btnDel.innerHTML = 'удалить';
    btnDel.setAttribute('cookie', name);

    // удалить куку
    btnDel.addEventListener('click', function() {
        deleteCookie.apply(btnDel);
    })
}

/**
 * Удаляет cookie с имененем name из документа и из таблицы
 * @param {string} name - Имя куки
 * @param {object} btn - Кнопка удаления в строке таблицы
 */
function deleteCookie() {
    let tr = this.closest('tr');

    listTable.removeChild(tr);
    document.cookie = `${this.getAttribute('cookie')}="";expires=${new Date(0).toUTCString()}`;
}

/**
 * Загрузка таблицы кук согласно фильтрации
 */
function loadCookies() {

    let filteredCookies = getFilteredCookies(filterNameInput.value);

    listTable.innerHTML = '';

    filteredCookies.forEach((value, key) => renderCookie(key, value));
}

/**
 * Создание куки с указанными name и value
 * @param {string} name - cookie's name
 * @param {string} value - cookie's value
 */
function createCookie(name, value) {
    if (name === '' || value === '') {
        return;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}`;
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

/**
 * Поиск и загрузка найденных куки не чаще, чем один раз в 1 сек
 */
let filterLoadCookie = debounce(loadCookies, 1000);

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

filterNameInput.addEventListener('keyup', function() {

    // так должно быть для прохождения тестов
    // loadCookies(); // вместо filterLoadCookie();

    filterLoadCookie();
});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value, addValueInput.value);
    loadCookies();
});

// загрузка куки при старте страницы
document.addEventListener('load', loadCookies());