# История изменений

Этот файл показывает значимые продакшен-обновления `shkaev.me` в русской локали сайта.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-14</span></p>

## Запустил playground-инструмент «Deal with it»

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил в раздел «Дизайн» новый playground-инструмент «Deal with it» с локализованными маршрутами, обновлённой карточкой и полноценным трёхшаговым сценарием для создания скачиваемых гифок 128×128 под эмоджи в Slack.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-11</span></p>

## Добавил раздел «Эксперименты» и запустил «Цветовые комбо»

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил на страницу «Дизайн» новый раздел «Эксперименты» для небольших дизайн-артефактов и визуальных исследований.
- Запустил «Цветовые комбо» как первый материал в разделе «Эксперименты» и связал его с локализованными маршрутами и карточками.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-10</span></p>

## Запустил русскую версию сайта и довёл до ума переведённое дизайн-портфолио

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил русские версии верхнеуровневых страниц, фотоархива и его серий, а также полный набор дизайн-кейсов.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Переписал страницу About, панель истории изменений и переведённые кейсы AOSP, Cookie Manager и TrackOFF так, чтобы тексты звучали по-русски естественно и последовательно.
- Доработал общий ритм страниц, ширину чтения и метаданные карточек кейсов, чтобы Design, About и русская версия портфолио ощущались более цельно в обеих локалях.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Закрепил процесс, в котором английская и русская версии истории изменений собираются вместе как одна компактная запись перед каждым продакшен-пушем.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-04</span></p>

## Исправил оставшиеся регрессии и продолжил волну рефакторинга v2

<p class="changelog-label changelog-label--fixed">Исправлено</p>

- Убрал дублирующийся запрос шрифта и поправил `InfoCardGrid`, чтобы лейауты кейсов снова вели себя корректно после рефакторинга.
- Вернул тёмной теме правильную визуальную иерархию и стили поверхностей в общих метаблоках, карточках и акцентных сайд-блоках.
- Исправил оставшиеся регрессии общего UI, включая интервалы между иконками в футере, цвет иконок у общих контролов в тёмной теме и маркеры таймлайна на странице About.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Продолжил `v2`-миграцию через аудит и упрощение: вынес ещё больше повторяющихся паттернов страниц в общие контентные компоненты и стилевые токены для кейсов и верхнеуровневых страниц.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Подчистил follow-up dead code и дублирующиеся текстовые обёртки в новых срезах общей контентной системы, а также точнее настроил семантику и API body-вариантов в общих компонентах.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-02</span></p>

## Провёл большой рефакторинг

<p class="changelog-label changelog-label--fixed">Исправлено</p>

- Убрал хрупкие допущения из логики резолва ассетов и другой общей логики страниц.
- Исправил несколько проблем с доступностью, фильтрацией и мобильной галереей в панели истории изменений и фоторазделе.
- Вернул стабильную типографику тёмной темы и уменьшил мерцание при переходах между страницами.

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил расширенные метаданные для аккуратных превью при шаринге.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Пересобрал общую оболочку сайта в отдельные layout-компоненты и вынес клиентское поведение в более сфокусированные модули.
- Ввёл переиспользуемые типографические и секционные примитивы для кейсов и верхнеуровневых страниц.
- Заменил предыдущий шрифт на self-hosted IBM Plex Serif для крупных заголовков и акцентной типографики.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Централизовал общий конфиг сайта, path helper’ы, theme utilities и прочий дублировавшийся вспомогательный код.
- Упростил инфраструктурный слой: подчистил R2 sync script и ослабил неиспользуемые требования content schema.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-01</span></p>

## Доработал дизайн-кейсы и отполировал страницу About

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Доработал кейсы TrackOFF, Cookie Manager и Avast Online Security & Privacy: усилил ритм секций, прояснил иерархию контента и добавил более содержательные связи между проектами.
- Пересобрал ключевые сюжетные секции AOSP и Cookie Manager в более визуальные лейауты с командными снимками, goal-карточками, сайдбарами и result-модулями, а у TrackOFF освежил продуктовый, партнёрский и промо-контент.
- Отполировал страницу About: подтянул интервалы между абзацами, сделал поток секций чище и усилил интерактивную подачу featured recommendation.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Добавил отдельный static asset resolver для оставшихся нефотографических медиа и синхронизировал соответствующие директории с ассетами в Cloudflare R2.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-29</span></p>

## Опубликовал новые фотографии и поправил рекомендации

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил новую волну архивных фотосерий за период с сентября 2025 по январь 2026.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Подправил хронологию фотоархива.
- Обновил порядок рекомендаций на странице About, а также интервалы и ритм секций.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Перевёл локальные photo imports на схему, в которой внутри проекта остаются только производные web-ассеты и манифесты, а внешние папки считаются источником истины для оригиналов.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-28</span></p>

## Добавил фильтры в фотогалерею и полностью переработал рекомендации

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил live search и фильтры по стране и году в фотоархив.
- Добавил featured recommendation carousel на About с анимированной навигацией и иконками компаний.
- Реализовал архивные контролы, empty states и year dividers для светлой и тёмной тем.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Сделал фотографическую сетку плотнее на больших экранах, расширив её до трёх колонок и синхронизировав ширину общего shell с контейнером хедера.
- Пересобрал рекомендации на About в более короткие цитаты с обновлёнными метаданными, более аккуратными контролами и более чистой индикацией прогресса.
- Поджал интервалы в карточках рабочего таймлайна, чтобы описания ролей стали ближе к заголовкам.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-27</span></p>

## Расширил фотоархив и доработал ключевые секции сайта

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил следующую волну кипрских фотосерий за период с апреля по сентябрь 2025.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Вернул пропавший пост за июль 2025 из ошибочно размеченного legacy-источника обратно в хронологию архива.
- Подчистил несколько архивных карточек и границы постов, чтобы новые записи легли в архив аккуратнее.
- Восстановил отсутствующие производные ассеты для сентября 2025, так что самая свежая архивная запись снова корректно грузит cover и gallery images в продакшене.
- Улучшил общую навигацию: активные состояния стали надёжнее, keyboard shortcuts безопаснее, мобильное выравнивание хедера аккуратнее, а back links теперь стабильно возвращают в корневые разделы.
- Доработал дизайн- и фоторазделы: сделал карточки кейсов чище, мобильную навигацию между сериями лучше, gallery previews без JavaScript понятнее, а поведение фото-сетки стабильнее.
- Пересобрал About с более сильным вступительным заголовком, обновлённым описанием карьерного пути, раскрывающимся work timeline и более аккуратными мобильными интервалами в карточках таймлайна.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Подтянул правила release workflow так, чтобы работа одного дня и изменения из разных тредов собирались в одну общую changelog entry перед пушем.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-26</span></p>

## Расширил и улучшил фотоархив

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил новые архивные записи на кипрскую временную линию фотоархива с конца 2023 до марта 2025.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Улучшил карточки фотоархива, добавив optional custom card covers для сложных кропов.
- Исправил custom card covers, чтобы архивные кропы корректно загружались с R2 photo domain.
- Улучшил связность архива, навигацию и поведение галереи во всём фоторазделе.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Добавил в content model поддержку custom archive card cover assets рядом со стандартными сгенерированными обложками.
- Обновил project workflow notes: теперь при длинных photo imports обязателен live progress report, а consecutive commits внутри одного shipped release должны жить в одной верхней changelog entry.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-25</span></p>

## Добавил выдвижную панель истории изменений и закрепил workflow для будущих обновлений

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил кнопку changelog в header рядом с переключателем темы.
- Добавил правую выдвижную панель истории изменений с keyboard shortcuts, blur overlay и inline-рендером `changelog.md`.
- Добавил project rules, которые обязали обновлять `changelog.md` в том же changeset при любом будущем коммите.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Переформатировал changelog в date-based формат с более чистыми заголовками, понятными label’ами и более простым copy в прошедшем времени.
- Подстроил ширину панели, интервалы, типографику, цвета label’ов, стилизацию checkmark, положение tooltip’ов и анимацию открытия/закрытия.
- Исправил focus behavior, чтобы keyboard shortcuts для changelog и theme toggle больше не оставляли лишние focus rings.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-24</span></p>

## Запустил фотоархив и перевёл его на хранение через R2

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил настоящий фотоархив с отдельными страницами для каждой серии.
- Добавил флаги стран в карточки фотографии и в заголовки серий.
- Добавил предыдущие и следующие ссылки между фотосериями.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Улучшил фотографические страницы: scroll restore стал лучше, keyboard и touch lightbox — стабильнее, загрузка изображений — плавнее.
- Поджал мобильные интервалы и типографику на home, about, design и photography.
- Почистил мобильную оболочку сайта, чтобы avatar wordmark, nav, footer и theme toggle лучше помещались на маленьких экранах.
- Пересобрал страницы фотосерий на телефонах: горизонтальный carousel, paired landscape shots и более надёжные mobile layout rules.
- Доработал общую оболочку сайта и layout главной страницы вокруг avatar wordmark, интервалов и footer social links.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Импортировал десятки фотосерий в Astro content collections со структурированными JSON-метаданными.
- Добавил поддержку `PUBLIC_PHOTO_BASE_URL`, чтобы фотоассеты могли грузиться из Cloudflare R2 вместо репозитория.
- Добавил R2 sync scripts, примеры env и setup docs для выноса `public/photo-imports` из git.
- Добавил несколько небольших performance-улучшений, включая preloading аватара и более чистую настройку темы в общем layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-22</span></p>

## Добавил полные дизайн-кейсы и обновил общий layout сайта

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавил постоянную тёмную тему с поддержкой local storage и keyboard shortcut.
- Добавил визуальные превью на landing page раздела Design вместо простых текстовых ссылок.
- Добавил полные кейсы для Avast Online Security & Privacy, Cookie Manager и TrackOFF.
- Добавил Telegram в site chrome и связал с ним контактную секцию.
- Добавил брендовые favicon’ы в work timeline, чтобы компании считывались быстрее.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Пересобрал общий site chrome: tighter nav layout, avatar label, отдельный theme toggle и footer social tooltips.
- Распространил обновлённую тему на homepage, about page, design pages, photography page и шаблоны кейсов.
- Превратил раздел Design в browseable portfolio с отдельными страницами проектов.
- Переписал интро на About так, чтобы оно лучше объясняло продуктовый дизайн-бэкграунд и текущую работу.
- Отполировал work timeline: cleaner markers, stronger links и tighter copy.
- Сократил первый экран страницы, показав только часть recommendations list и убрав остальное за reveal action.
- Почистил тексты на About и рекомендации для первой публичной версии.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Импортировал supporting images для design case studies и связал их с основным design page.
- Перенёс portrait assets в `/avatars` и заменил стартовый набор favicon’ов на проектные файлы из нового layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-21</span></p>

## Запустил первый многостраничный layout сайта и страницу About

<p class="changelog-label changelog-label--added">Добавлено</p>

- Заменил заглушку фронт-страницы на новое светлое визуальное направление и общий layout сайта.
- Запустил страницу About с карьерным таймлайном, блоками рекомендаций и портретными ассетами.
- Добавил верхнеуровневые страницы Design и Photography.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Расширил глобальные стили так, чтобы проект работал как многостраничное портфолио, а не как один placeholder-экран.
