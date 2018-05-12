function createDiv() {
    let getColor = () => (Math.random() * 255).toFixed(0);

    const width = (50 + Math.random() * 150).toFixed(0);

    const paddingLeft = 20;
    const paddingTop = 21;
    const calcLeft = (Math.random() * (body.clientWidth - paddingLeft) + paddingLeft).toFixed(0);
    const calcTop = (Math.random() * body.clientWidth / 2 + paddingTop).toFixed(0);

    // + контроль выхода за границы видимой области body
    let left = Math.min(calcLeft, body.clientWidth - width);
    let top = Math.min(calcTop, body.clientWidth / 2 - width);

    let div = document.createElement('div');

    div.classList.add('draggable-div');

    var style = `width:${width}px;height:${width}px;left:${left}px;top:${top}px;position:absolute;background-color:rgb(${getColor()},${getColor()},${getColor()})`;

    div.setAttribute('style', style);

    return div;
}

function addListeners(target) {

    var isDnd;
    var currentEl;

    let mmHandler = (e) => {
        var el = e.target;

        if (!isDnd || el !== currentEl || el.tagName !== 'DIV' || !el.classList.contains('draggable-div')) {
            return;
        }

        let newLeft = e.pageX - el.offsetWidth / 2;
        let newTop = e.pageY - el.offsetHeight / 2;

        // контроль выхода за границы видимой части экрана
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft + el.offsetWidth > body.clientWidth) {
            newLeft = body.clientWidth - el.offsetWidth;
        }

        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop + el.offsetHeight > body.clientWidth / 2) {
            newTop = body.ClientWidth / 2 - el.offsetHeight;
        }

        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';

        el.zIndex = 1000; // помещаем поверх остальных квадратов
    };

    target.addEventListener('mousemove', mmHandler);

    target.addEventListener('mousedown', (e1) => {
        if (e1.target.tagName !== 'DIV' || !e1.target.classList.contains('draggable-div')) {
            return;
        }
        currentEl = e1.target;
        isDnd = true;
    });

    target.addEventListener('mouseup', (e2) => {
        if (e2.target.tagName !== 'DIV' || !e2.target.classList.contains('draggable-div')) {
            return;
        }
        currentEl = null;
        isDnd = false;
    });
}

const body = document.querySelector('body');

const homeworkContainer = document.querySelector('#homework-container');

addListeners(homeworkContainer);

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
});

export {
    createDiv
};