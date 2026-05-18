# Продвинутые критерии JavaScript-проекта

# Задача

### Д1. Техническое задание реализовано полностью

Выполнены:

* все обязательные пункты;
* все дополнительные пункты ТЗ.

---

# Именование

### Д2. Переменные имеют абстрактные названия

Названия переменных не содержат имён собственных.

```js id="92a8e2"
// Плохо
const keks = {
  name: 'Кекс',
};

// Хорошо
const cat = {
  name: 'Кекс',
};
```

---

### Д3. Методы и свойства не содержат название объекта

```js id="q2v8my"
// Плохо
const popup = {
  openPopup() {},
};

class Wizard {
  constructor(name) {
    this.wizardName = name;
  }
}

// Хорошо
const popup = {
  open() {},
};

class Wizard {
  constructor(name) {
    this.name = name;
  }
}
```

---

### Д4. Обработчики событий названы единообразно

Используются схемы:

* `on<Element><Event>`
* `<element><Event>Handler`

```js id="4vw3s8"
const onSidebarClick = () => {};
const onWindowResize = () => {};

const sidebarClickHandler = () => {};
const windowResizeHandler = () => {};
```

---

# Единообразие

### Д6. Используется единый стиль именования

Во всех модулях соблюдается единый подход:

* одинаковые суффиксы;
* одинаковые префиксы;
* единые правила именования DOM-элементов.

```js id="m8lyu2"
// Плохо
const popupMainElement = document.querySelector('.popup');
const sidebarNode = document.querySelector('.sidebar');

// Хорошо
const popupMainElement = document.querySelector('.popup');
const sidebarElement = document.querySelector('.sidebar');
```

---

### Д8. Методы класса упорядочены

Рекомендуемый порядок:

1. Конструктор
2. Геттеры и сеттеры
3. Основные методы
4. Приватные методы
5. Обработчики событий
6. Статические методы

```js id="l9xq8r"
class User {
  constructor() {}

  get name() {}

  set name(value) {}

  save() {}

  #validate() {}

  onClick() {}

  static create() {}
}
```

---

# Избыточность

### Д10. Нет лишних проверок

Не проверяются значения, тип которых заранее известен.

```js id="5j7d2g"
// Плохо
const isPositiveNumber = (number) => {
  if (typeof number === 'undefined') {
    throw new Error();
  }

  return number > 0;
};

// Хорошо
const isPositiveNumber = (number) => number > 0;
```

---

### Д11. Нет дублирования кода (`DRY`)

Повторяющийся код:

* выносится в функции;
* переносится за пределы условий.

```js id="r2v7mx"
// Плохо
if (success) {
  stopTimer();
  removeTimer();
}

if (error) {
  stopTimer();
  removeTimer();
}

// Хорошо
stopTimer();

if (success) {
  showSuccess();
}

if (error) {
  showError();
}

removeTimer();
```

---

### Д13. Нет лишних приведений типов

```js id="7a2mzn"
// Плохо
if (isLoading === true) {}

// Хорошо
if (isLoading) {}
```

---

### Д15. Условия упрощены

#### 1. Упрощённый возврат boolean

```js id="zy0q4m"
// Плохо
const isEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  return false;
};

// Хорошо
const isEqual = (a, b) => a === b;
```

#### 2. Используется тернарный оператор

```js id="3qv2po"
// Плохо
let role;

if (isAdmin) {
  role = 'admin';
} else {
  role = 'user';
}

// Хорошо
const role = isAdmin ? 'admin' : 'user';
```

#### 3. Убираются лишние `else`

```js id="4g0kwe"
// Плохо
if (condition) {
  return value;
} else {
  return anotherValue;
}

// Хорошо
if (condition) {
  return value;
}

return anotherValue;
```

---

# Оптимальность

### Д18. DOM-элементы ищутся минимальное число раз

```js id="x1d8yr"
// Плохо
for (let i = 0; i < items.length; i++) {
  const dialog = document.querySelector('.dialog');
  render(dialog, items[i]);
}

// Хорошо
const dialog = document.querySelector('.dialog');

for (let i = 0; i < items.length; i++) {
  render(dialog, items[i]);
}
```

---

### Д21. Изменения применяются точечно

Изменяется только то, что действительно нужно.

```js id="n0r5ty"
// Плохо
element.classList.remove(
  'active',
  'hidden',
  'selected'
);

// Хорошо
if (currentClass) {
  element.classList.remove(currentClass);
}

element.classList.add(newClass);
```

---

# Сложность и читаемость

### Д22. Для каждого события — отдельный обработчик

Одна функция не должна обрабатывать несколько разных событий.

```js id="8v1kma"
button.addEventListener('click', onButtonClick);
window.addEventListener('resize', onWindowResize);
```

---

### Д23. Длинные функции разбиты на небольшие

Большие функции декомпозированы на маленькие и понятные.

```js id="p9z3wl"
const renderPage = () => {
  renderHeader();
  renderContent();
  renderFooter();
};
```

---

### Д24. Для коллекций используются итераторы массивов

Используются:

* `forEach`
* `map`
* `filter`
* `reduce`
* `sort`

```js id="u6j1qe"
elements.forEach((element) => {
  element.addEventListener('click', () => {
    console.log(element);
  });
});
```

---

### Д25. Присваивание не используется внутри выражений

```js id="2o7rzd"
// Плохо
render(items = JSON.parse(rawItems));

// Хорошо
items = JSON.parse(rawItems);

render(items);
```

---

### Д26. Работа с DOM инкапсулирована

DOM-операции выполняются только внутри компонентов/классов, которые владеют этими элементами.

```js id="v8j2xa"
// Плохо
view.element.querySelector('.button');

// Хорошо
view.setOnClick(() => {
  submitForm();
});
```

Внешний код не должен напрямую управлять внутренними DOM-элементами компонента.
