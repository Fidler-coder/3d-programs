const plans = window.lessonPlans || {};

const programs = [
  {
    id: "magic-world",
    title: "Волшебный мир 3D",
    group: "6–9 лет",
    type: "Основная программа",
    color: "#2d9cdb",
    document: "documents/Программа «Волшебный мир 3D» — 6–9 лет.docx",
  },
  {
    id: "young-engineer",
    title: "Юный инженер-дизайнер",
    group: "10–12 лет",
    type: "Основная программа",
    color: "#9b51e0",
    document: "documents/Программа «Юный инженер-дизайнер» — 10–12 лет.docx",
  },
  {
    id: "idea-to-model",
    title: "От идеи к модели",
    group: "13–14 лет",
    type: "Основная программа",
    color: "#ff9b2f",
    document: "documents/Программа «От идеи к модели» — 13–14 лет.docx",
  },
  {
    id: "code-3d",
    title: "Код 3D",
    group: "15–17 лет",
    type: "Основная программа",
    color: "#eb5757",
    document: "documents/Программа «Код 3D» — 15–17 лет.docx",
  },
  {
    id: "new-year",
    title: "Новогоднее 3D-творчество",
    group: "Каникулы",
    type: "Каникулярная программа",
    color: "#21c7b7",
    document: "documents/Программа «Новогоднее 3D-творчество» — каникулы.docx",
  },
  {
    id: "holiday-basics",
    title: "Основы 3D-проектирования",
    group: "Каникулы",
    type: "Каникулярная программа",
    color: "#31b66b",
    document: "documents/Программа «Основы 3D-проектирования» — каникулы.docx",
  },
  {
    id: "profile-architecture",
    title: "Архитектурная визуализация — от модели к VR",
    group: "14–17 лет",
    type: "Профильный отряд",
    color: "#a8d641",
    document: "documents/Программа «Архитектурная визуализация — от модели к VR» — профильный отряд.docx",
  },
];

const viewTitles = {
  overview: ["Общий каталог / Обзор", "Программы 3D-моделирования"],
  programs: ["Общий каталог / Программы", "Все программы"],
  documents: ["Общий каталог / Документы", "Документы программ"],
  about: ["Общий каталог / О проекте", "О системе планирования"],
};

const pageContent = document.querySelector("#page-content");
const pageTitle = document.querySelector("#page-title");
const breadcrumb = document.querySelector("#breadcrumb");
const programNav = document.querySelector("#program-nav");
const menuButton = document.querySelector(".menu-button");
const closeButtons = [document.querySelector(".sidebar-close"), document.querySelector(".backdrop")];

function programStyle(program) {
  return `--program-color:${program.color}`;
}

function planFor(program) {
  return plans[program.id];
}

function totalHours(plan) {
  return plan.schedules.reduce((sum, schedule) => sum + schedule.lessons.length, 0);
}

function scheduleCaption(program) {
  const plan = planFor(program);
  if (!plan) return "Планирование отсутствует";
  if (program.type === "Основная программа") return "Планы на 6, 9 и 12 часов";
  if (program.type === "Каникулярная программа") return "4 возрастных плана по 5 часов";
  return "30 отдельных учебных часов";
}

function programCard(program) {
  return `
    <button class="program-card" type="button" data-program="${program.id}" style="${programStyle(program)}">
      <span class="card-top">
        <span class="age-badge">${program.group}</span>
        <span class="card-status">План готов</span>
      </span>
      <h3>${program.title}</h3>
      <p>${scheduleCaption(program)}. ${planFor(program).finalProduct}</p>
      <span class="text-button">Открыть планирование <span aria-hidden="true">→</span></span>
    </button>`;
}

function renderProgramNav() {
  programNav.innerHTML = programs.map(program => `
    <button class="program-item" type="button" data-program="${program.id}" style="${programStyle(program)}">
      <span class="program-dot" aria-hidden="true"></span>
      <span class="program-copy"><strong>${program.title}</strong><small>${program.group}</small></span>
    </button>`).join("");
}

function overviewView() {
  return `
    <div class="dashboard-grid">
      <section class="panel hero-panel">
        <div>
          <p class="eyebrow">Единое рабочее пространство</p>
          <h2 class="hero-title">Все программы и каждый учебный час в одной системе</h2>
          <p class="lead">Поурочное планирование связано с утверждённым содержанием программ. Для каждого часа указаны тема, цель, единый поток задач, действия детей и проверяемый результат.</p>
        </div>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-view="programs">Выбрать программу</button>
          <button class="secondary-button" type="button" data-view="documents">Открыть DOCX</button>
        </div>
      </section>
      <aside class="panel">
        <div class="panel-head"><div><p class="eyebrow">Готовность каталога</p><h3>Методическое наполнение</h3></div></div>
        <div class="metric-stack">
          <div class="metric"><strong>7</strong><span>программ в каталоге</span></div>
          <div class="metric"><strong>21</strong><span>вариант расчасовки</span></div>
          <div class="metric"><strong>178</strong><span>отдельных учебных часов</span></div>
        </div>
        <div class="progress-row"><div class="progress-copy"><span>Поурочное планирование</span><span>100%</span></div><div class="progress-track is-complete"><span></span></div></div>
      </aside>
    </div>
    <section class="section-block">
      <div class="section-heading"><div><h2>Программы</h2><p>Возрастные, каникулярные и профильное направление</p></div><button class="text-button" type="button" data-view="programs">Показать все →</button></div>
      <div class="program-grid">${programs.slice(0, 6).map(programCard).join("")}</div>
    </section>`;
}

function programsView() {
  return `
    <div class="panel">
      <div class="panel-head"><div><p class="eyebrow">7 направлений</p><h2>Каталог программ</h2><p class="lead">Выберите программу. Для основных направлений доступны самостоятельные планы на 6, 9 и 12 часов, для каникул — четыре возрастных пятичасовых интенсива.</p></div></div>
      <div class="program-grid">${programs.map(programCard).join("")}</div>
    </div>`;
}

function documentsView() {
  return `
    <section class="panel">
      <div class="panel-head"><div><p class="eyebrow">Актуальные файлы</p><h2>Документы программ</h2><p class="lead">В каталоге находится по одному актуальному DOCX для каждой программы. Поурочные планы доступны внутри страниц программ.</p></div></div>
      <div class="document-list">
        ${programs.map(program => `
          <div class="document-row" style="${programStyle(program)}">
            <span class="document-icon">DOCX</span>
            <span class="document-copy"><strong>${program.title}</strong><span>${program.group} · ${program.type}</span></span>
            <a class="document-link" href="${program.document}" target="_blank">Открыть файл</a>
          </div>`).join("")}
      </div>
    </section>`;
}

function aboutView() {
  return `
    <div class="about-grid">
      <section class="panel">
        <p class="eyebrow">Методическая логика</p><h2>Один час — один результат</h2>
        <p class="lead">Даже если раздел программы рассчитан на два, три или четыре часа, в планировании каждый час оформлен отдельно и заканчивается наблюдаемым результатом.</p>
        <ul class="principles">
          <li>Цель каждого часа сформулирована существительным.</li>
          <li>Образовательные, развивающие и воспитательные задачи идут единым текстом.</li>
          <li>Действия детей описаны конкретно, без формулировок только про работу педагога.</li>
          <li>Результат можно увидеть в сцене, файле, изображении, проверке или защите.</li>
          <li>Варианты 6, 9 и 12 часов являются самостоятельными завершёнными маршрутами.</li>
        </ul>
      </section>
      <aside class="panel">
        <p class="eyebrow">Объём системы</p><h3>Структура каталога</h3>
        <div class="legend">
          ${programs.map(program => `<div class="legend-row" style="${programStyle(program)}"><span><i class="legend-dot"></i>${program.title}</span><small>${totalHours(planFor(program))} ч.</small></div>`).join("")}
        </div>
      </aside>
    </div>`;
}

function phaseButtons(schedule) {
  const phases = [...new Set(schedule.lessons.map(item => item.phase))];
  return ["all", ...phases].map(phase => `
    <button class="plan-filter${phase === "all" ? " is-active" : ""}" type="button" data-phase-filter="${phase}">
      ${phase === "all" ? "Все часы" : phase}
    </button>`).join("");
}

function lessonRows(schedule) {
  return schedule.lessons.map((item, index) => `
    <tr class="plan-row" data-phase="${item.phase}">
      <td data-label="Час">${index + 1}</td>
      <td data-label="Тема"><strong class="lesson-topic">${item.topic}</strong><span class="lesson-phase">${item.phase}</span></td>
      <td data-label="Цель">${item.goal}</td>
      <td data-label="Задачи">${item.tasks}</td>
      <td data-label="Действия детей">${item.activity}</td>
      <td data-label="Результат">${item.result}</td>
    </tr>`).join("");
}

function schedulePanel(program, plan, schedule) {
  return `
    <section class="plan-panel" data-plan-panel data-program-id="${program.id}" data-schedule-id="${schedule.id}" data-phase="all">
      <div class="plan-panel-head">
        <div><p class="eyebrow">Поурочное планирование</p><h2>${schedule.label}</h2><p class="lead">${schedule.note}. Каждый пункт таблицы — один отдельный учебный час.</p></div>
        <span class="hour-total">${schedule.lessons.length}<small>часов</small></span>
      </div>
      <div class="plan-controls">
        <div class="phase-filters" aria-label="Фильтр по этапу">${phaseButtons(schedule)}</div>
        <label class="plan-search-label"><span>Поиск по плану</span><input class="plan-search" type="search" placeholder="Тема, инструмент, результат…" autocomplete="off"></label>
        <span class="plan-count" aria-live="polite">Показано: ${schedule.lessons.length}</span>
      </div>
      <div class="plan-table-wrap">
        <table class="plan-table">
          <thead><tr><th>№</th><th>Тема</th><th>Цель</th><th>Задачи</th><th>Что делают дети</th><th>Результат часа</th></tr></thead>
          <tbody>${lessonRows(schedule)}</tbody>
        </table>
        <div class="plan-empty" hidden>По вашему запросу занятия не найдены.</div>
      </div>
    </section>`;
}

function programView(program, requestedScheduleId) {
  const plan = planFor(program);
  const schedule = plan.schedules.find(item => item.id === requestedScheduleId) || plan.schedules[0];
  return `
    <div class="view-stack program-detail" style="${programStyle(program)}">
      <section class="panel detail-hero plan-hero">
        <div>
          <span class="age-badge">${program.group}</span>
          <h2>${program.title}</h2>
          <p class="lead">${plan.summary}</p>
          <div class="program-facts">
            <span><small>Среда</small><strong>${plan.software}</strong></span>
            <span><small>Итог</small><strong>${plan.finalProduct}</strong></span>
          </div>
          <div class="hero-actions">
            <a class="primary-button" href="${program.document}" target="_blank">Открыть DOCX <span aria-hidden="true">↗</span></a>
            <button class="secondary-button" type="button" data-print-plan>Печать / PDF</button>
          </div>
        </div>
        <aside class="detail-aside"><strong>Планирование готово</strong><span>${scheduleCaption(program)}. Выберите нужный вариант ниже.</span></aside>
      </section>
      <nav class="schedule-tabs" aria-label="Выбор расчасовки">
        ${plan.schedules.map(item => `<button class="schedule-tab${item.id === schedule.id ? " is-active" : ""}" type="button" data-program-id="${program.id}" data-schedule="${item.id}"><strong>${item.label}</strong><span>${item.note}</span></button>`).join("")}
      </nav>
      ${schedulePanel(program, plan, schedule)}
    </div>`;
}

function closeSidebar() {
  document.body.classList.remove("sidebar-open");
  menuButton.setAttribute("aria-expanded", "false");
}

function setActiveState(view, programId = null) {
  document.querySelectorAll("[data-view]").forEach(item => item.classList.toggle("is-active", item.dataset.view === view && !programId));
  document.querySelectorAll(".program-item").forEach(item => item.classList.toggle("is-active", item.dataset.program === programId));
}

function updatePlanFilter() {
  const panel = document.querySelector("[data-plan-panel]");
  if (!panel) return;
  const query = panel.querySelector(".plan-search").value.trim().toLocaleLowerCase("ru");
  const phase = panel.dataset.phase;
  let visible = 0;
  panel.querySelectorAll(".plan-row").forEach(row => {
    const phaseMatch = phase === "all" || row.dataset.phase === phase;
    const textMatch = !query || row.textContent.toLocaleLowerCase("ru").includes(query);
    const show = phaseMatch && textMatch;
    row.hidden = !show;
    if (show) visible += 1;
  });
  panel.querySelector(".plan-count").textContent = `Показано: ${visible}`;
  panel.querySelector(".plan-empty").hidden = visible !== 0;
}

function renderRoute() {
  const hash = location.hash.slice(1) || "overview";
  if (hash.startsWith("program/")) {
    const [, programId, scheduleId] = hash.split("/");
    const program = programs.find(item => item.id === programId) || programs[0];
    breadcrumb.textContent = `Программы / ${program.group}`;
    pageTitle.textContent = program.title;
    pageContent.innerHTML = programView(program, scheduleId);
    setActiveState("program", program.id);
  } else {
    const view = viewTitles[hash] ? hash : "overview";
    breadcrumb.textContent = viewTitles[view][0];
    pageTitle.textContent = viewTitles[view][1];
    pageContent.innerHTML = view === "overview" ? overviewView() : view === "programs" ? programsView() : view === "documents" ? documentsView() : aboutView();
    setActiveState(view);
  }
  closeSidebar();
  document.title = `${pageTitle.textContent} — Программы 3D`;
}

document.addEventListener("click", event => {
  const scheduleTarget = event.target.closest("[data-schedule]");
  const phaseTarget = event.target.closest("[data-phase-filter]");
  const printTarget = event.target.closest("[data-print-plan]");
  const programTarget = event.target.closest("[data-program]");
  const viewTarget = event.target.closest("[data-view]");

  if (scheduleTarget) {
    location.hash = `program/${scheduleTarget.dataset.programId}/${scheduleTarget.dataset.schedule}`;
  } else if (phaseTarget) {
    const panel = phaseTarget.closest("[data-plan-panel]");
    panel.dataset.phase = phaseTarget.dataset.phaseFilter;
    panel.querySelectorAll("[data-phase-filter]").forEach(button => button.classList.toggle("is-active", button === phaseTarget));
    updatePlanFilter();
  } else if (printTarget) {
    window.print();
  } else if (programTarget) {
    location.hash = `program/${programTarget.dataset.program}`;
  } else if (viewTarget) {
    location.hash = viewTarget.dataset.view;
  }
});

document.addEventListener("input", event => {
  if (event.target.matches(".plan-search")) updatePlanFilter();
});

menuButton.addEventListener("click", () => {
  const open = !document.body.classList.contains("sidebar-open");
  document.body.classList.toggle("sidebar-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

closeButtons.forEach(button => button.addEventListener("click", closeSidebar));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeSidebar(); });
window.addEventListener("hashchange", renderRoute);

renderProgramNav();
renderRoute();
