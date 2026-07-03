(function () {
  const content = window.MathVizContent || {
    subjects: [],
    subjectPages: {},
    modules: [],
    mvpUnits: [],
    learningPaths: [],
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function getCurrentScope() {
    return document.body.dataset.contentScope || "math";
  }

  function getScopedCollection() {
    const scope = getCurrentScope();
    if (scope === "math") {
      return {
        modules: content.modules || [],
        mvpUnits: content.mvpUnits || [],
        learningPaths: content.learningPaths || [],
      };
    }

    return content.subjectCollections?.[scope] || {
      modules: [],
      mvpUnits: [],
      learningPaths: [],
    };
  }

  function getModule(moduleId) {
    return getScopedCollection().modules.find((module) => module.id === moduleId);
  }

  function getSubject(subjectId) {
    return content.subjects.find((subject) => subject.id === subjectId);
  }

  function getSubjectPage(subjectId) {
    return content.subjectPages?.[subjectId] || null;
  }

  function resolveHref(path) {
    if (!path) return "";
    const root = document.body.dataset.root || "./";
    return `${root}${path}`;
  }

  function renderHeader() {
    const moduleId = document.body.dataset.module || "";
    const subjectId = document.body.dataset.subject || "";
    const pageTitle = byId("pageTitle");
    const pageSummary = byId("pageSummary");
    const badge = byId("pageBadge");
    const titleText = document.body.dataset.title;
    const summaryText = document.body.dataset.summary;

    if (pageTitle && titleText) pageTitle.textContent = titleText;
    if (pageSummary && summaryText) pageSummary.textContent = summaryText;
    if (badge) {
      if (moduleId) {
        const module = getModule(moduleId);
        badge.textContent = module ? module.stage : "学习系统";
      } else if (subjectId) {
        const subjectPage = getSubjectPage(subjectId);
        const subject = getSubject(subjectId);
        badge.textContent = subjectPage?.badge || subject?.stage || "理科学习系统";
      } else {
        badge.textContent = "理科学习可视化系统";
      }
    }
  }

  function subjectCard(subject) {
    return `
      <a class="card subject-card tone-${subject.color}" href="${resolveHref(subject.href)}">
        <div class="card-topline">
          <span class="chip">${subject.stage}</span>
          <span class="sub-chip">${subject.status}</span>
        </div>
        <h3>${subject.title}</h3>
        <p>${subject.summary}</p>
        <ul class="mini-list">
          ${subject.highlights.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <span class="inline-link">进入学科页</span>
      </a>
    `;
  }

  function roadmapCard(subject, index) {
    return `
      <article class="card roadmap-card">
        <div class="card-topline">
          <span class="chip">阶段 ${index + 1}</span>
          <span class="sub-chip">${subject.status}</span>
        </div>
        <h3>${subject.title}</h3>
        <p>${subject.summary}</p>
      </article>
    `;
  }

  function renderSubjectCards() {
    const container = byId("subjectGrid");
    if (!container) return;
    container.innerHTML = content.subjects.map(subjectCard).join("");
  }

  function renderSubjectRoadmap() {
    const container = byId("roadmapGrid");
    if (!container) return;
    container.innerHTML = content.subjects.map(roadmapCard).join("");
  }

  function moduleCard(module) {
    return `
      <a class="card module-card tone-${module.color}" href="${resolveHref(module.href)}">
        <div class="card-topline">
          <span class="chip">${module.stage}</span>
        </div>
        <h3>${module.title}</h3>
        <p>${module.summary}</p>
        <ul class="mini-list">
          ${module.highlights.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </a>
    `;
  }

  function renderModuleCards() {
    const container = byId("moduleGrid");
    if (!container) return;
    container.innerHTML = getScopedCollection().modules.map(moduleCard).join("");
  }

  function unitCard(unit, module) {
    const statusText = unit.status === "available" ? "已上线" : "规划中";
    const footer = unit.href
      ? `<a class="inline-link" href="${resolveHref(unit.href)}">进入单元</a>`
      : `<span class="inline-link is-muted">即将制作</span>`;

    return `
      <article class="card unit-card">
        <div class="card-topline">
          <span class="chip">${unit.priority}</span>
          <span class="sub-chip">${statusText}</span>
        </div>
        <h3>${unit.title}</h3>
        <p>${unit.summary}</p>
        <div class="meta-row">
          <span>${module ? module.title : "未分类"}</span>
          <span>${unit.difficulty}</span>
        </div>
        ${footer}
      </article>
    `;
  }

  function renderMvpUnits() {
    const container = byId("mvpGrid");
    if (!container) return;
    const scoped = getScopedCollection();
    container.innerHTML = scoped.mvpUnits
      .map((unit) => unitCard(unit, getModule(unit.moduleId)))
      .join("");
  }

  function renderModuleUnits() {
    const container = byId("unitGrid");
    const moduleId = document.body.dataset.module;
    if (!container || !moduleId) return;
    const scoped = getScopedCollection();
    const module = getModule(moduleId);
    const units = scoped.mvpUnits.filter((unit) => unit.moduleId === moduleId);
    byId("moduleHighlights").innerHTML = module
      ? module.highlights.map((item) => `<li>${item}</li>`).join("")
      : "";
    container.innerHTML = units.map((unit) => unitCard(unit, module)).join("");
  }

  function renderSubjectPageMeta() {
    const subjectId = document.body.dataset.subject;
    if (!subjectId) return;

    const subjectPage = getSubjectPage(subjectId);
    const highlights = byId("subjectHighlights");
    const focus = byId("subjectFocus");

    if (highlights) {
      highlights.innerHTML = (subjectPage?.highlights || [])
        .map((item) => `<li>${item}</li>`)
        .join("");
    }

    if (focus) {
      focus.innerHTML = (subjectPage?.focus || [])
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
  }

  function renderLearningPaths() {
    const container = byId("pathGrid");
    if (!container) return;
    container.innerHTML = getScopedCollection().learningPaths
      .map(
        (path) => `
          <article class="card path-card">
            <h3>${path.title}</h3>
            <p>${path.summary}</p>
            <ul class="mini-list">
              ${path.topics.map((topic) => `<li>${topic}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
  }

  function init() {
    renderHeader();
    renderSubjectCards();
    renderSubjectRoadmap();
    renderSubjectPageMeta();
    renderModuleCards();
    renderMvpUnits();
    renderModuleUnits();
    renderLearningPaths();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
