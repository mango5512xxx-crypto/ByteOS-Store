# 🛍️ ByteOS Store — Decentralized Binary & Web Package Repository

[English](#-english) | [Русский](#-русский)

---

<a name="-english"></a>
## 🇬🇧 English

**ByteOS Store** is the official decentralized application repository and package delivery system for **ByteOS**. 

Instead of requiring users to compile software from source on the machine (like Gentoo), **ByteOS Store distributes ready-to-run precompiled binaries (freestanding 64-bit ELF)** and **JavaScript applications powered by the embedded QuickJS ES2020 engine**.

This guarantees **instant 1-click installation**, zero compile-time overhead, no need for heavy compilers or build tools on the target device, and maximum performance straight out of the box!

### ✨ Key Features
* **Precompiled Native Binaries:** Applications are distributed as ready-to-run static 64-bit ELF executables (compiled with C, C++, or Rust `no_std`).
* **QuickJS Web Applications:** Lightweight JavaScript applications that execute natively in ByteOS without compilation.
* **Instant 1-Click Installation:** Direct installation into `/SYSTEM/APPS/` and immediate shortcut registration on the **Desktop** and in the **Dock**.
* **Zero Server Infrastructure:** Powered entirely by GitHub Raw CDN and versioned package releases.
* **Catalog API (`catalog.json`):** Clean JSON index consumed directly by the ByteStore client.

### 📂 Repository Structure
```text
ByteOS-Store/
├── catalog.json                # Master index fetched by the ByteStore client
├── apps/                       # Application metadata manifests (*.json)
│   ├── hello-c.json
│   ├── hello-rust.json
│   ├── hello-js.json
│   ├── snake.json
│   ├── calc-pro.json
│   └── byte-web.json
├── packages/                   # Precompiled binaries and scripts
│   ├── hello-c/hello.elf
│   ├── hello-js/hello.js
│   ├── snake/snake.js
│   └── calc-pro/calc_pro.js
└── icons/                      # Application icons
```

### 🚀 How It Works
1. **Catalog Fetch:** The ByteStore GUI client in ByteOS loads `catalog.json` containing app metadata, screenshots, and download paths.
2. **One-Click Install:** When the user clicks **Install**, the precompiled binary or script is downloaded directly to `/SYSTEM/APPS/<app_id>/` and placed on the Desktop.
3. **Execution:**
   * ELF binaries are spawned as native processes via `int 0x80` (`SYS_SPAWN`).
   * JavaScript apps run inside the sandboxed QuickJS engine.

### 📋 App Manifest Schema (`apps/<id>.json`)
```json
{
  "id": "com.byteos.snake",
  "name": "Retro Snake",
  "version": "1.2.0",
  "author": "ByteStore Community",
  "category": "Games",
  "type": "js",
  "size_kb": 16,
  "download_url": "https://raw.githubusercontent.com/mango5512xxx-crypto/ByteOS-Store/main/packages/snake/snake.js",
  "executable": "snake.js",
  "icon": "icon_games",
  "description": "Classic retro arcade Snake game for ByteOS"
}
```

---

<a name="-русский"></a>
## 🇷🇺 Русский

**ByteOS Store** — это официальный децентрализованный каталог и система доставки готовых приложений для **ByteOS**.

В отличие от исходных дистрибутивов (вроде Gentoo), где программы компилируются на целевом устройстве, **ByteOS Store распространяет готовые скомпилированные бинарники (автономные 64-битные ELF)**, а также **скриптовые приложения на JavaScript (на базе встроенного движка QuickJS ES2020)**.

Это обеспечивает **мгновенную установку в один клик**, отсутствие необходимости держать на устройстве тяжеловесные компиляторы (gcc/git) и максимальную скорость работы сразу после скачивания!

### ✨ Основные возможности
* **Готовые нативные бинарники:** Программы поставляются в виде готовых статических 64-битных ELF-файлов (C, C++, Rust `no_std`).
* **Приложения на QuickJS:** Лёгкие JavaScript-приложения, работающие нативно без компиляции с поддержкой Web Storage, Console и DOM API.
* **Мгновенная установка:** Копирование в системный каталог `/SYSTEM/APPS/` и автоматическое создание ярлыков на **Рабочем столе** и в **Dock**.
* **Каталог `catalog.json`:** Простой и открытый JSON-манифест для встроенного GUI-клиента ByteStore в операционной системе.

### 📂 Структура репозитория
```text
ByteOS-Store/
├── catalog.json                # Главный индекс каталога для клиента ByteStore
├── apps/                       # Манифесты приложений (*.json)
│   ├── hello-c.json
│   ├── hello-rust.json
│   ├── hello-js.json
│   ├── snake.json
│   ├── calc-pro.json
│   └── byte-web.json
├── packages/                   # Готовые бинарники и скрипты
│   ├── hello-c/hello.elf
│   ├── hello-js/hello.js
│   ├── snake/snake.js
│   └── calc-pro/calc_pro.js
└── icons/                      # Иконки приложений
```

### 🚀 Как это работает
1. **Загрузка каталога:** Клиент магазина ByteStore в ByteOS запрашивает файл `catalog.json` с описанием программ, категорий и ссылок на скачивание.
2. **Установка в 1 клик:** При нажатии кнопки **«Установить»** готовый бинарник или скрипт сохраняется в `/SYSTEM/APPS/<id>/` и выносится на Рабочий стол.
3. **Запуск:**
   * Бинарники ELF запускаются ядром через системный вызов `SYS_SPAWN` (`int 0x80`).
   * Скрипты JavaScript выполняются напрямую через встроенный QuickJS.
