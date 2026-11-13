# 🛍️ ByteOS Store — Decentralized Source-Based App Store

[English](#-english) | [Русский](#-русский)

---

<a name="-english"></a>
## 🇬🇧 English

**ByteOS Store** is a lightweight, serverless application registry and package repository built for **ByteOS**. Instead of hosting heavy pre-compiled binaries on expensive servers, ByteOS Store uses GitHub as a free, transparent, and automated backend. Applications are distributed as tiny JSON build recipes and compiled directly on the user's machine using `gcc` for maximum performance and hardware optimization.

### ✨ Key Features
* **Zero Server Costs:** Powered entirely by GitHub repositories, Raw CDN, and GitHub Actions.
* **Native Source Compilation:** Applications are compiled locally via `gcc -O2` directly on the target machine, ensuring native CPU optimization and small binary footprints.
* **Automated CI/CD Validation:** Every Pull Request is automatically verified by a GitHub Actions pipeline (JSON schema validation, icon checks, and sandboxed test builds) before generating the global `catalog.json`.
* **Security & Integrity:** Recipes pin exact Git commit hashes (`commit`), preventing silent upstream code tampering after review.
* **Seamless OS Integration:** Automatically installs compiled binaries to `/opt/apps/` and registers application shortcuts in the ByteOS Dock.

### 📂 Repository Structure
```text
ByteOS-Store/
├── .github/
│   └── workflows/
│       └── validate.yml        # Automated CI/CD backend pipeline
├── scripts/
│   └── build_catalog.py        # Validator & catalog.json generator
├── apps/                       # Individual app build recipes (*.json)
│   ├── fox-assistant.json
│   └── terminal-pro.json
├── icons/                      # Application icons (64x64 or 128x128 PNG)
│   ├── fox-assistant.png
│   └── terminal-pro.png
└── catalog.json                # Auto-generated master index for the OS client
```

### 🚀 How It Works (Architecture)
1. **Catalog Fetch:** The ByteOS Store GUI client fetches `https://raw.githubusercontent.com/<user>/ByteOS-Store/main/catalog.json` in a single HTTP request.
2. **Dependency Check:** When the user clicks **Install**, the client checks required system libraries (`deps`).
3. **Clone & Compile:** Source code is shallow-cloned (`git clone --depth 1`) into `/tmp/byte-build/` and compiled locally via `gcc`.
4. **Install & Register:** The resulting binary is moved to `/opt/apps/<id>/`, state is saved in `~/.byteos/installed.json`, and an IPC signal adds the app icon to the Dock.

### 📦 How to Submit an App (Pull Request Guide)
Want to publish your C/C++ application to ByteOS Store?
1. **Fork** this repository.
2. Add a `128x128` PNG icon to `icons/<app-id>.png`.
3. Create a recipe file `apps/<app-id>.json` following this schema:
   ```json
   {
     "id": "fox-assistant",
     "name": "Fox Assistant",
     "author": "mrmapyx",
     "version": "1.0.2",
     "category": "System",
     "description": "Lightweight local voice assistant built with C and Vosk",
     "repo": "[https://github.com/mrmapyx/fox-assistant.git](https://github.com/mrmapyx/fox-assistant.git)",
     "commit": "a8f9c21",
     "deps": ["libvosk-dev", "libasound2-dev"],
     "build_cmd": "gcc -O2 -Wall src/*.c -o fox-assistant -lvosk -lasound -lm",
     "install_bin": "fox-assistant",
     "dock": true
   }
   ```
4. Open a **Pull Request**. Once GitHub Actions passes all checks (green checkmark), your app will be merged and published automatically!

### 📋 Recipe Fields Reference
| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `id` | `string` | Yes | Unique lowercase identifier (must match `.json` and `.png` filenames). |
| `name` | `string` | Yes | Display name shown in the Store UI and Dock. |
| `author` | `string` | Yes | Developer's GitHub username or alias. |
| `version` | `string` | Yes | Semantic version (`MAJOR.MINOR.PATCH`) used for update detection. |
| `category` | `string` | Yes | Store category (`System`, `Development`, `Internet`, `Games`, `Utilities`). |
| `description` | `string` | Yes | Short one-line summary of the application. |
| `repo` | `string` | Yes | Public Git repository URL containing the C/C++ source code. |
| `commit` | `string` | Yes | Exact Git commit hash pinned for security verification. |
| `deps` | `array` | No | List of required system libraries or headers. |
| `build_cmd` | `string` | Yes | Shell command executed to compile the source code (`gcc ...`). |
| `install_bin` | `string` | Yes | Name of the compiled executable binary to install. |
| `dock` | `boolean` | No | If `true`, pins the application icon to the ByteOS Dock upon install. |

---

<a name="-русский"></a>
## 🇷🇺 Русский

**ByteOS Store** — это лёгкий децентрализованный каталог и система доставки приложений для **ByteOS**. Вместо хранения тяжёлых скомпилированных бинарников на платных серверах магазин использует GitHub в качестве бесплатного, прозрачного и автоматизированного бэкенда. Программы распространяются в виде компактных JSON-рецептов сборки и компилируются прямо на компьютере пользователя с помощью `gcc`, обеспечивая максимальную скорость работы и минимальный размер файлов.

### ✨ Основные возможности
* **Нулевые затраты на серверы:** Вся инфраструктура работает на базе репозитория GitHub, Raw CDN и GitHub Actions.
* **Нативная компиляция из исходников:** Приложения собираются локально через `gcc -O2` непосредственно под процессор пользователя.
* **Автоматическая проверка (CI/CD):** Каждый Pull Request автоматически проверяется пайплайном GitHub Actions (валидация JSON, проверка наличия иконки и тестовая сборка в песочнице) перед обновлением общего файла `catalog.json`.
* **Безопасность и целостность:** В каждом рецепте жёстко фиксируется хеш коммита (`commit`), что защищает пользователей от незаметной подмены исходного кода после проверки.
* **Бесшовная интеграция с ОС:** Скомпилированный бинарник автоматически устанавливается в `/opt/apps/`, а ярлык программы сразу появляется в **Dock**.

### 📂 Структура репозитория
```text
ByteOS-Store/
├── .github/
│   └── workflows/
│       └── validate.yml        # Автоматический «бэкенд»-проверщик на GitHub Actions
├── scripts/
│   └── build_catalog.py        # Скрипт валидации и генерации catalog.json
├── apps/                       # Рецепты сборки отдельных приложений (*.json)
│   ├── fox-assistant.json
│   └── terminal-pro.json
├── icons/                      # Иконки приложений (64x64 или 128x128 PNG)
│   ├── fox-assistant.png
│   └── terminal-pro.png
└── catalog.json                # Единый индексный файл для GUI-клиента ОС
```

### 🚀 Как это работает (Архитектура)
1. **Загрузка каталога:** Клиент магазина в ByteOS одним HTTP-запросом скачивает актуальный список приложений по ссылке `https://raw.githubusercontent.com/<user>/ByteOS-Store/main/catalog.json`.
2. **Проверка зависимостей:** После нажатия кнопки **«Установить»** клиент проверяет наличие нужных системных библиотек (`deps`).
3. **Клонирование и компиляция:** Исходный код скачивается во временную директорию `/tmp/byte-build/` (`git clone --depth 1`) и собирается локальным компилятором `gcc`.
4. **Установка и регистрация:** Готовый бинарник переносится в `/opt/apps/<id>/`, запись об установке сохраняется в `~/.byteos/installed.json`, а оконный менеджер получает команду добавить иконку в Dock.

### 📦 Как добавить своё приложение в магазин (Pull Request)
Чтобы опубликовать свою программу на C/C++ в ByteOS Store:
1. Сделайте **Fork** этого репозитория.
2. Положите PNG-иконку размером `128x128` в папку `icons/<app-id>.png`.
3. Создайте файл рецепта `apps/<app-id>.json` по следующему шаблону:
   ```json
   {
     "id": "fox-assistant",
     "name": "Fox Assistant",
     "author": "mrmapyx",
     "version": "1.0.2",
     "category": "Система",
     "description": "Локальный голосовой помощник на C + Vosk",
     "repo": "[https://github.com/mrmapyx/fox-assistant.git](https://github.com/mrmapyx/fox-assistant.git)",
     "commit": "a8f9c21",
     "deps": ["libvosk-dev", "libasound2-dev"],
     "build_cmd": "gcc -O2 -Wall src/*.c -o fox-assistant -lvosk -lasound -lm",
     "install_bin": "fox-assistant",
     "dock": true
   }
   ```
4. Откройте **Pull Request**. Как только GitHub Actions проверит рецепт и загорится зелёная галочка, изменения будут приняты, а приложение автоматически появится в каталоге у всех пользователей.

### 📋 Описание полей рецепта (`apps/*.json`)
| Поле | Тип | Обязательно | Описание |
| :--- | :--- | :---: | :--- |
| `id` | `string` | Да | Уникальный идентификатор в нижнем регистре (должен совпадать с именем `.json` и `.png`). |
| `name` | `string` | Да | Отображаемое название программы в интерфейсе магазина и Dock. |
| `author` | `string` | Да | Никнейм автора на GitHub. |
| `version` | `string` | Да | Версия пакета (`MAJOR.MINOR.PATCH`) для отслеживания обновлений. |
| `category` | `string` | Да | Категория в магазине (`Система`, `Разработка`, `Интернет`, `Игры`, `Утилиты`). |
| `description` | `string` | Да | Краткое описание приложения в одну строку. |
| `repo` | `string` | Да | Ссылка на публичный Git-репозиторий с исходным кодом. |
| `commit` | `string` | Да | Точный хеш коммита для фиксации проверенной версии кода. |
| `deps` | `array` | Нет | Список необходимых системных библиотек или заголовочных файлов. |
| `build_cmd` | `string` | Да | Команда компиляции, которая будет запущена на машине пользователя (`gcc ...`). |
| `install_bin` | `string` | Да | Имя итогового исполняемого файла после компиляции. |
| `dock` | `boolean` | Нет | Если `true`, иконка приложения автоматически закрепляется в Dock после установки. |