# История изменений

Этот файл показывает значимые продакшен-обновления `shkaev.me` в русской локали сайта.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-04</span></p>

## Исправили оставшиеся регрессии и продолжили волну рефакторинга v2

<p class="changelog-label changelog-label--fixed">Исправлено</p>

- Убрали дублирующийся запрос шрифта и поправили `InfoCardGrid`, чтобы лейауты кейсов снова вели себя корректно после рефакторинга.
- Вернули тёмной теме правильную иерархию и стили поверхностей в общих метаблоках, карточках и акцентных асайдах.
- Исправили оставшиеся регрессии общего UI, включая интервалы между иконками в футере, цвет иконок у общих контролов в тёмной теме и маркеры таймлайна на странице About.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Продолжили миграцию `v2` через аудит и упрощение: вынесли ещё больше повторяющихся паттернов страниц в общие компоненты контента и стилевые токены для кейсов и верхнеуровневых страниц.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Подчистили follow-up dead code и дублирующиеся prose-обёртки в новых срезах общей контентной системы, а также точнее настроили семантику и API body-вариантов в новых общих компонентах.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-02</span></p>

## Провели большой рефакторинг

<p class="changelog-label changelog-label--fixed">Исправлено</p>

- Убрали хрупкие допущения из резолва ассетов и другой общей логики страниц.
- Исправили несколько проблем с доступностью, фильтрацией и мобильной галереей в чейнджлог-шите и фоторазделе.
- Вернули надёжную типографику тёмной темы и уменьшили мерцание при переходах между страницами.

<p class="changelog-label changelog-label--added">Добавлено</p>

- Богатые метаданные для аккуратных превью при шаринге.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Пересобрали общую оболочку сайта в отдельные layout-компоненты и вынесли клиентское поведение в более сфокусированные модули.
- Ввели переиспользуемые типографические и секционные примитивы для кейсов и верхнеуровневых страниц.
- Заменили предыдущий шрифт на self-hosted IBM Plex Serif для крупных заголовков и display-текста.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Централизовали общий конфиг сайта, path helper’ы, theme utilities и прочую дублировавшуюся поддержку.
- Упростили вспомогательный код: подчистили R2 sync script и ослабили неиспользуемые требования content schema.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-01</span></p>

## Доработали дизайн-кейсы и отполировали страницу About

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Доработали кейсы TrackOFF, Cookie Manager и Avast Online Security & Privacy: усилили ритм секций, прояснили иерархию контента и добавили более содержательные связи между проектами.
- Пересобрали ключевые сюжетные секции AOSP и Cookie Manager в более визуальные лейауты с командными снимками, goal-карточками, сайдбарами и result-модулями, а у TrackOFF освежили продуктовый, reseller- и promotional-контент.
- Отполировали страницу About: подтянули интервалы между абзацами, сделали поток секций чище и усилили интерактивную подачу featured recommendation.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Добавили отдельный static asset resolver для оставшихся нефотографических медиа и синхронизировали эти ассет-директории в Cloudflare R2.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-29</span></p>

## Опубликовали новые фотографии и поправили рекомендации

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили новую волну фотографических архивных записей с сентября 2025 по январь 2026.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Подправили хронологию фотоархива.
- Обновили порядок рекомендаций на странице About, интервалы и ритм секций.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Перевели локальные photo imports на схему, где в проекте остаются только производные web-ассеты и манифесты, а внешние папки считаются источником истины для оригиналов.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-28</span></p>

## Добавили фильтры в фотогалерею и полностью переработали рекомендации

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили live search и фильтры по стране и году в фотоархив.
- Добавили featured recommendation carousel на About с анимированной навигацией и иконками компаний.
- Реализовали архивные controls, empty states и year dividers для светлой и тёмной тем.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Сделали фотографическую сетку плотнее на больших экранах, расширив её до трёх колонок и синхронизировав ширину общего shell с контейнером хедера.
- Пересобрали рекомендации на About в более короткие цитаты с обновлёнными метаданными, tighter controls и более чистой progress feedback.
- Поджали интервалы в карточках рабочего таймлайна, чтобы описания ролей стали ближе к заголовкам.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-27</span></p>

## Расширили фотоархив и доработали ключевые секции сайта

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили следующую волну кипрских фотосерий за период с апреля по сентябрь 2025.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Вернули пропавший пост за июль 2025 из ошибочно размеченного legacy-источника обратно в хронологию архива.
- Подчистили несколько архивных карточек и границы постов, чтобы новые записи легли в архив аккуратнее.
- Восстановили отсутствующие производные ассеты для сентября 2025, так что самая свежая архивная запись снова корректно грузит cover и gallery images в продакшене.
- Улучшили общую навигацию: активные состояния стали надёжнее, keyboard shortcuts безопаснее, мобильное выравнивание хедера аккуратнее, а back links теперь стабильно возвращают в корневые разделы.
- Доработали дизайн- и фоторазделы: сделали case study cards чище, мобильную навигацию между сериями лучше, gallery previews без JavaScript понятнее, а поведение фото-сетки стабильнее.
- Пересобрали About с более сильным вступительным заголовком, обновлённым work-history copy, раскрывающимся work timeline и tighter mobile spacing в карточках таймлайна.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Подтянули правила release workflow так, чтобы работы одного дня и изменения из разных тредов собирались в одну общую changelog entry перед пушем.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-26</span></p>

## Расширили и улучшили фотоархив

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили новые архивные записи по фотографии на кипрской временной линии с конца 2023 до марта 2025.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Улучшили карточки фотоархива, добавив optional custom card covers для сложных кропов.
- Исправили custom card covers, чтобы архивные кропы корректно загружались с R2 photo domain.
- Улучшили связность архива, навигацию и поведение галереи во всём фоторазделе.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Добавили в content model поддержку custom archive card cover assets рядом со стандартными сгенерированными обложками.
- Обновили project workflow notes: теперь при длинных photo imports обязателен live progress report, а consecutive commits внутри одного shipped release должны жить в одной верхней changelog entry.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-25</span></p>

## Добавили выдвижной changelog и закрепили workflow для будущих обновлений

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили кнопку changelog в header рядом с переключателем темы.
- Добавили правый выдвижной changelog drawer с keyboard shortcuts, blur overlay и inline-рендером `changelog.md`.
- Добавили project rules, которые обязали обновлять `changelog.md` в том же changeset при любом будущем коммите.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Переформатировали changelog в date-based формат с более чистыми заголовками, понятными label’ами и более простым copy в прошедшем времени.
- Подстроили ширину drawer, интервалы, типографику, цвета label’ов, стилизацию checkmark, положение tooltip’ов и анимацию открытия/закрытия.
- Исправили focus behavior, чтобы keyboard shortcuts для changelog и theme toggle больше не оставляли лишние focus rings.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-24</span></p>

## Запустили фотоархив и перевели его на хранение через R2

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили настоящий фотоархив с отдельными страницами для каждой серии.
- Добавили флаги стран в карточки фотографии и в заголовки серий.
- Добавили предыдущие и следующие ссылки между фотосериями.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Улучшили фотографические страницы: scroll restore стал лучше, keyboard и touch lightbox — стабильнее, загрузка изображений — плавнее.
- Поджали мобильные интервалы и типографику на home, about, design и photography.
- Почистили mobile site shell, чтобы avatar wordmark, nav, footer и theme toggle лучше помещались на маленьких экранах.
- Пересобрали страницы фотосерий на телефонах: горизонтальный carousel, paired landscape shots и более надёжные mobile layout rules.
- Доработали общий site shell и homepage layout вокруг avatar wordmark, интервалов и footer social links.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Импортировали десятки фотосерий в Astro content collections со структурированными JSON-метаданными.
- Добавили поддержку `PUBLIC_PHOTO_BASE_URL`, чтобы фотоассеты могли грузиться из Cloudflare R2 вместо репозитория.
- Добавили R2 sync scripts, примеры env и setup docs для выноса `public/photo-imports` из git.
- Добавили несколько небольших performance-улучшений, включая preloading аватара и более чистую настройку темы в общем layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-22</span></p>

## Добавили полные дизайн-кейсы и обновили общий site layout

<p class="changelog-label changelog-label--added">Добавлено</p>

- Добавили постоянную тёмную тему с поддержкой local storage и keyboard shortcut.
- Добавили визуальные превью на landing page раздела Design вместо простых текстовых ссылок.
- Добавили полные кейсы для Avast Online Security & Privacy, Cookie Manager и TrackOFF.
- Добавили Telegram в site chrome и связали с ним контактную секцию.
- Добавили брендовые favicon’ы в work timeline, чтобы компании считывались быстрее.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Пересобрали общий site chrome: tighter nav layout, avatar label, отдельный theme toggle и footer social tooltips.
- Распространили обновлённую тему на homepage, about page, design pages, photography page и case study templates.
- Превратили раздел Design в browseable portfolio с отдельными страницами проектов.
- Переписали интро на About так, чтобы оно лучше объясняло продуктовый дизайн-бэкграунд и текущую работу.
- Отполировали work timeline: cleaner markers, stronger links и tighter copy.
- Сократили первый экран страницы, показав только часть recommendations list и убрав остальное за reveal action.
- Почистили About page copy и recommendation text для первой публичной версии.

<p class="changelog-label changelog-label--infrastructure">Инфраструктура</p>

- Импортировали supporting images для design case studies и связали их с основным design page.
- Перенесли portrait assets в `/avatars` и заменили стартовый набор favicon’ов на проектные файлы из нового layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-21</span></p>

## Запустили первый многостраничный layout сайта и страницу About

<p class="changelog-label changelog-label--added">Добавлено</p>

- Заменили заглушку фронт-страницы на новое светлое визуальное направление и общий site layout.
- Запустили страницу About с карьерным таймлайном, блоками рекомендаций и портретными ассетами.
- Добавили верхнеуровневые страницы Design и Photography.

<p class="changelog-label changelog-label--improved">Улучшено</p>

- Расширили глобальные стили так, чтобы проект работал как многостраничное портфолио, а не как один placeholder-экран.
