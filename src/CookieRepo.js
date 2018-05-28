export default function CookieRepo() {

    /**
     * Получение объекта со всеми куками документа
     */
    const getAllCookiesMap = () =>
        new Map(document.cookie
            .split('; ')
            .map((item) => item.split('='))
            .map((arr) => [arr[0], decodeURIComponent(arr[1])]));

    /**
     * Проверяет наличие вхождения подстроки chunk в строку full без учета регистра
     * @param {string} full - Строка для применения фильтра
     * @param {string} chunk - Искомая подстрока
     */
    const isMatching = (full, chunk) =>
        full.toLowerCase().includes(chunk.toLowerCase());

    return {
        getFilteredCookiesMap: function(filter) {
            let all = getAllCookiesMap();

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
        },

        removeCookie: function(name) {
            document.cookie = `${name}="";expires=${new Date(0).toUTCString()}`;
        },

        insertCookie: function(name, value) {
            if (name === '' || value === '') {
                return;
            }
            document.cookie = `${name}=${encodeURIComponent(value)}`;
        }
    }
}