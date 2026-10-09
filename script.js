const form = document.querySelector('#coffee-form');
const nameInput = document.querySelector('#guest-name');
const result = document.querySelector('#coffee-result');

const drinks = {
    cappuccino: { name: 'Капучино', price: 220 },
    latte: { name: 'Латте', price: 240 },
    cocoa: { name: 'Какао', price: 230 }
};

function validateName() {
    const name = nameInput.value.trim();
    nameInput.setCustomValidity(name.length < 2 ? 'Напишите имя: минимум 2 символа.' : '');
}

nameInput.addEventListener('input', validateName);
nameInput.addEventListener('blur', validateName);

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateName();
    if (!form.reportValidity()) return;

    const drink = drinks[form.elements.drink.value];
    const size = Number(form.elements.size.value);
    const oatMilk = form.elements.milk.value === 'oat';
    const price = drink.price + (size === 350 ? 50 : 0) + (oatMilk ? 60 : 0);
    const milk = oatMilk ? 'на овсяном молоке' : 'на обычном молоке';

    result.replaceChildren();
    const description = document.createElement('span');
    description.textContent = `${nameInput.value.trim()}, ваш выбор: ${drink.name.toLowerCase()}, ${size} мл, ${milk}.`;
    const total = document.createElement('strong');
    total.textContent = `Итого: ${price} ₽`;
    result.append(description, total);
    result.classList.add('ready', 'pop');
});

result.addEventListener('animationend', function () {
    result.classList.remove('pop');
});

form.addEventListener('input', function () {
    if (!result.classList.contains('ready')) return;
    result.classList.remove('ready', 'pop');
    result.textContent = 'Вы изменили выбор. Нажмите «Рассчитать стоимость» ещё раз.';
});
