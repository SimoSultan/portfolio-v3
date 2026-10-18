function renderCloseIcon() {
  return `
    <button class="card__close" data-action="close" aria-label="Close card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  `;
}

function renderResizeHandleContainer() {
  return `<div class="resize-handles" aria-hidden="true"></div>`;
}

function renderHeroCard(data) {
  return `
    <article class="card card--hero" id="hero" tabindex="0" role="button" aria-label="Simon Curran hero card, press Enter to expand">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.tagline}</span>
          <h1 class="card__title">${data.name}</h1>
          <span class="card__alias">${data.alias}</span>
        </div>
        <img class="card__avatar" src="assets/avatar.png" alt="Portrait of Simon Curran" loading="lazy" />
        <div class="card__graphic" aria-hidden="true">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="40" fill="rgba(17,17,17,0.08)" />
            <rect x="35" y="35" width="50" height="50" rx="12" fill="rgba(17,17,17,0.12)" />
          </svg>
        </div>
      </div>
    </article>
  `;
}

function renderAboutCard(data) {
  return `
    <article class="card card--about" id="about" tabindex="0" role="button" aria-label="About me card, press Enter to expand">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div>
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <div class="card__full">${data.full}</div>
        </div>
        <div class="card__actions">
          <button class="card__btn" data-action="expand" aria-label="View more about Simon">
            View more
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProjectItem(item) {
  const links = [];
  if (item.links?.github) {
    links.push(`<a href="${item.links.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
  }
  if (item.links?.live) {
    links.push(`<a href="${item.links.live}" target="_blank" rel="noopener noreferrer">Live</a>`);
  }
  const linksHtml = links.length ? `<p class="card__meta">${links.join(' · ')}</p>` : '';

  const tags = item.stack.map((s) => {
    const aiClass = s.toLowerCase() === 'ai-assisted' ? 'card__tag--ai' : '';
    return `<span class="card__tag ${aiClass}">${s}</span>`;
  }).join('');

  return `
    <li>
      <div class="card__item-header">
        <h4>${item.name}</h4>
        <span class="card__item-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
      <p>${item.what}</p>
      <div class="card__tags">${tags}</div>
      ${linksHtml}
    </li>
  `;
}

function renderProjectsCard(data) {
  const items = [...data.withoutAI, ...data.withAI].map(renderProjectItem).join('');

  return `
    <article class="card card--projects" id="projects" tabindex="0" role="button" aria-label="Projects card, press Enter to expand">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div>
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <ul class="card__list" aria-label="Selected projects">
            ${items}
          </ul>
        </div>
        <div class="card__actions">
          <button class="card__btn" data-action="expand" aria-label="View selected projects">
            View projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>
      <div class="card__graphic" aria-hidden="true">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <circle cx="100" cy="40" r="30" fill="rgba(255,255,255,0.35)" />
          <rect x="20" y="80" width="80" height="28" rx="14" fill="rgba(17,17,17,0.9)" />
          <circle cx="50" cy="110" r="40" fill="rgba(252,211,77,0.6)" />
        </svg>
      </div>
    </article>
  `;
}

function renderExperienceCard(data) {
  const items = data.items.map((item) => `
    <li>
      <h4>${item.role}</h4>
      <span class="card__meta">${item.period}</span>
      <p>${item.detail}</p>
    </li>
  `).join('');

  return `
    <article class="card card--experience" id="experience" tabindex="0" role="button" aria-label="Work experience card, press Enter to expand">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div>
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <ul class="card__list" aria-label="Work history">
            ${items}
          </ul>
        </div>
        <div class="card__actions">
          <button class="card__btn" data-action="expand" aria-label="View full work experience">
            View full experience
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>
      <div class="card__graphic" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="20" y="20" width="60" height="60" rx="16" fill="rgba(17,17,17,0.9)" transform="rotate(15 50 50)" />
          <circle cx="90" cy="70" r="25" stroke="rgba(167,139,250,0.8)" stroke-width="12" fill="none" />
        </svg>
      </div>
    </article>
  `;
}

function renderContactCard(data) {
  return `
    <article class="card card--contact" id="contact" tabindex="0" role="button" aria-label="Contact card, press Enter to expand">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div>
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <div class="card__full">
            <p>Email me at <a href="mailto:${data.email}">${data.email}</a> or find me on <a href="${data.github}" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
          </div>
        </div>
        <div class="card__actions">
          <a class="card__btn" href="mailto:${data.email}" data-action="contact" aria-label="Send Simon an email">
            Email me
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(containerId = 'grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = [
    renderHeroCard(portfolioData.hero),
    renderAboutCard(portfolioData.about),
    renderProjectsCard(portfolioData.projects),
    renderExperienceCard(portfolioData.experience),
    renderContactCard(portfolioData.contact),
  ].join('');
}

function updateCardStates(state) {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const id = card.id;
    let cardState = 'resting';
    if (state.expandedId === id) {
      cardState = 'expanded';
    } else if (state.mediumId === id) {
      cardState = 'medium';
    } else if (state.smallId === id) {
      cardState = 'small';
    }
    card.setAttribute('data-state', cardState);
    card.setAttribute('aria-expanded', String(cardState === 'expanded'));
  });
}

if (typeof window !== 'undefined') {
  window.portfolioCards = {
    renderGrid,
    updateCardStates,
  };
}
