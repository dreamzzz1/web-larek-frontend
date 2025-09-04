# Проектная работа "Веб-ларек"

Этот проект --- учебное приложение интернет-магазина, реализованное на
TypeScript с использованием SCSS и Webpack. Основная цель --- показать
умение работать с компонентным подходом, архитектурой приложения и
взаимодействием с сервером.

-   Установка
    -   npm install
    -   или yarn
-   Запуск
    -   npm run start
    -   или yarn start

## Архитектура проекта

Проект реализован по слоистой (MVC-подобной) архитектуре, разделяя
ответственность: - Model --- данные и бизнес-логика (Product, Cart,
Order). - View --- визуальные компоненты: карточки товара, модальные
окна, страницы. - Controller --- обработчики событий, связывающие
действия пользователя и обновление состояния.

## Структура проекта

-   src/pages/index.html --- главная страница
-   src/index.ts --- точка входа
-   src/scss/styles.scss --- основные стили
-   src/components/ --- компоненты интерфейса
-   src/utils/ --- утилиты и константы
-   src/types/ --- типы TypeScript

## Ключевые классы и назначение

### Model

-   **Product**
    -   Описывает карточку товара
    -   Поля: id, title, price, description?
    -   Методы: render(): HTMLElement --- создаёт элемент карточки;
        getInfo() --- возвращает данные товара
-   **Cart**
    -   Хранит выбранные товары и считает итог
    -   Поля: items: Product\[\]
    -   Методы: add(product), remove(productId), getTotal(), clear()
-   **Order**
    -   Управляет оформлением покупки
    -   Конструктор получает Cart
    -   Поля: cart, paymentInfo, deliveryInfo
    -   Методы: setPaymentInfo(data), setDeliveryInfo(data), submit():
        Promise`<Response>`{=html}

### View

-   **ProductCard**
    -   Отвечает за отображение товара
    -   Поля: product (данные товара), element (DOM-узел карточки)
    -   Методы: render(), update(data)
-   **CartView**
    -   Представление корзины
    -   Поля: itemsContainer, totalElement
    -   Методы: render(items), updateTotal(sum), clear()
-   **Modal**
    -   Базовый компонент модального окна
    -   Поля: content, isOpen
    -   Методы: open(), close(), setContent(node)
-   **Page**
    -   Управляет отображением страницы (например, списка товаров)
    -   Поля: rootElement
    -   Методы: render(products), showLoader(), showError()

### Controller

-   **EventEmitter**
    -   Локальная шина событий для связи компонентов
    -   Поля: events: Map\<string, Function\[\]\>
    -   Методы: on(event, cb), emit(event, data?), off(event, cb)

## Как работает приложение

-   Загружается список товаров с сервера.
-   При клике «Добавить» генерируется событие.
-   Через EventEmitter контроллеры обновляют состояние (корзина).
-   UI перерисовывается на основе нового состояния.
-   При оформлении заказа данные отправляются на сервер (через
    Order.submit()).

