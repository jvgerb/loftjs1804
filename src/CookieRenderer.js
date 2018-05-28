/**
 * Создает объект, умеющий отрисовывать таблицу с куками
 * @param {object} listTableEl - html-элемент таблицы
 * @param {object} cookieRepo - объект, работающий с хранилищем куков
 */
export default function CookieRenderer(listTableEl, cookieRepository) {

    /**
     * Создает строку таблицы для куки с указанными name и value
     * @param {string} name - cookie's name
     * @param {string} value - cookie's value
     * @param {object} listTable - html-элемент таблицы
     * @param {function} deleteCookieFromRepo - функция, удаляющая куки из хранилища куков
     */
    const renderCookie = (listTable, name, value, deleteCookieFromRepo) => {

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

        // добавить обработчик на удаление куки
        btnDel.addEventListener('click', function() {
            let name = btnDel.getAttribute('cookie'),
                tr = btnDel.closest('tr');

            deleteCookie(name, listTable, tr, deleteCookieFromRepo);
        })
    }

    /**
     * Удаляет cookie с имененем name из документа и из таблицы
     * @param {string} name - наименование куки
     * @param {object} listTable - html-элемент таблицы
     * @param {object} trCookie - html-элемент строки таблицы, содержащей куки
     * @param {function} deleteCookieFromRepo - функция, удаляющая куки из хранилища куков
     */
    const deleteCookie = (name, listTable, trCookie, deleteCookieFromRepo) => {
        deleteCookieFromRepo(name);
        listTable.removeChild(trCookie);
    }

    return {
        loadCookies: function(filter) {
            // получаем отфильтрованные куки из коллекции
            let filteredCookies = cookieRepository.getFilteredCookiesMap(filter);

            // очищаем таблицу 
            listTableEl.innerHTML = '';
            // для каждой куки создаем строку в таблице с кнопкой удаления куки
            filteredCookies.forEach((value, key) =>
                renderCookie(listTableEl, key, value, cookieRepository.removeCookie));
        }
    }
}