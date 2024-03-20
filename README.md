# Лабораторна робота №2 з предмету "Методи та технології розробки програмного забезпечення"

## Опис застосунку
В даній лабораторній роботі я розробляв застосунок, який ідентифікує деякий markdown синтаксис в тексті і замінює його на html-теги. Застосунок може знаходити жирний, курсивний, моноширинний тексти, ідентифікує абзаци та преформатовану частину тексту, замінюючи їх на відповідні теги.

## Інструкція, як зібрати проєкт
Для того, щоб користуватися даним застосунком потрібно мати встановлений Node.js 20-ої і вище версій. Для початку потрібно склонувати собі даний репозиторій за допомогою команди:
```
git clone https://github.com/GIroSTarK/mtrpz_lab2.git
```

Після клонування репозиторію, потрібно перейти в директорію з проєктом та запустити команду
```
npm install
```
для встановлення залежностей

## Інструкція до використання проєкту
Для того, щоб запустити парсер, потрібно:

1. Перейти в директорію src:
```
cd src
```
2. В терміналі написати команду 
```
node index.js <шлях до вашого md файлу>
```
3. Запустити виконання команди

Якщо Вам потрібно записати конвертований md синтаксис у html-файл - Вам потрібно вказати прапорець --out, як вказано на прикладі нижче:

```
node index.js <шлях до вашого md файлу> --out <шлях до файлу>
```

В оновленій версії програми є також можливість обирати формат запису конвертованого тексту. Є два формати:
ansi та html

```
node index.js <шлях до вашого md файлу> --out <шлях до файлу> --format <формат>
```

## Інструкція, як запустити тести
Для запуску тестів потрібно в терміналі виконати команду нижче:
```
npm test
```

### Приклад
```
Як умру, то поховайте

**Мене** на могилі

Серед ст_епу широкого

На _Вкраїні_ милій,

Щоб лани широкополі,

\```
І _Дні_про_, і кручі

Було `видно`, було чути,

Як реве ревучий.
\```

Як понесе з України

У синєє_море

Кров **ворожу... отойді** я

І лани і гори —

Все покину, і _пол*ину_

До самого бога

Молитися... а до того

Я не знаю бога.

`Поховайте` та вставайте,

Кайдани порвіте

І вражою злою кров’ю

Волю окропіте.

І мене в сім’ї великій,

В сім’ї вольній, новій,

**Не забудьте пом’янути**

Незлим тихим словом.
```

### Результат
```html
<p>Як умру, то поховайте</p>
<p><b>Мене</b> на могилі</p>
<p>Серед ст_епу широкого</p>
<p>На <i>Вкраїні</i> милій,</p>
<p>Щоб лани широкополі,</p>
<pre>
І _Дні_про_, і кручі

Було `видно`, було чути,

Як реве ревучий.
</pre>
<p>Як понесе з України</p>
<p>У синєє_море</p>
<p>Кров <b>ворожу... отойді</b> я</p>
<p>І лани і гори —</p>
<p>Все покину, і <i>пол*ину</i></p>
<p>До самого бога</p>
<p>Молитися... а до того</p>
<p>Я не знаю бога.</p>
<p><tt>Поховайте</tt> та вставайте,</p>
<p>Кайдани порвіте</p>
<p>І вражою злою кров’ю</p>
<p>Волю окропіте.</p>
<p>І мене в сім’ї великій,</p>
<p>В сім’ї вольній, новій,</p>
<p><b>Не забудьте пом’янути</b></p>
<p>Незлим тихим словом.</p>
```

## Вказання на revert-коміт
Revert-коміт вказаний в Лабораторній роботі №1
