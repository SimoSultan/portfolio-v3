function renderCloseIcon() {
  return `
    <button class="card__close" data-action="close" aria-label="${portfolioData.meta.closeAriaLabel}">
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
    <article class="card card--hero" id="hero" tabindex="0" role="button" aria-label="${data.ariaLabel}">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.tagline}</span>
          <h1 class="card__title">${data.name}</h1>
          <span class="card__alias">${data.alias}</span>
        </div>
        <img class="card__avatar" src="assets/avatar.png" alt="${data.avatarAlt}" loading="lazy" />
      </div>
    </article>
  `;
}

function renderAboutCard(data) {
  return `
    <article class="card card--about" id="about" tabindex="0" role="button" aria-label="${data.ariaLabel}">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <div class="card__full">${data.full}</div>
        </div>
      </div>
    </article>
  `;
}

function renderProjectLink(link) {
  const isGithub = link.type === 'github';
  const iconSvg = isGithub
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>`;

  return `
    <a class="card__btn" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
      <span class="btn-label">${link.label}</span>
      ${iconSvg}
    </a>
  `;
}

function renderProjectItem(item, linkLabels, notMaintainedLabel) {
  const linkDefs = [];
  if (item.links?.github) {
    linkDefs.push({ type: 'github', label: linkLabels.github, href: item.links.github });
  }
  if (item.links?.live) {
    linkDefs.push({ type: 'live', label: linkLabels.live, href: item.links.live });
  }
  if (item.links?.reference) {
    linkDefs.push({ type: 'reference', label: linkLabels.reference, href: item.links.reference });
  }
  const linksHtml = linkDefs.map(renderProjectLink).join('');

  const tags = item.stack.map((s) => {
    const aiClass = s.toLowerCase() === 'ai-assisted' ? 'card__tag--ai' : '';
    return `<span class="card__tag ${aiClass}">${s}</span>`;
  }).join('');

  const maintainedBadge = item.maintained === false
    ? `<span class="card__tag card__tag--unmaintained">${notMaintainedLabel}</span>`
    : '';

  return `
    <li>
      <div class="card__body">
        <h4>${item.name}${maintainedBadge}</h4>
        <p>${item.what}</p>
        <div class="card__tags">${tags}</div>
      </div>
      ${linksHtml ? `<div class="card__links">${linksHtml}</div>` : ''}
    </li>
  `;
}

function renderProjectsCard(data) {
  const items = [...data.withoutAI, ...data.withAI]
    .map((item) => renderProjectItem(item, data.linkLabels, data.notMaintainedLabel))
    .join('');

  return `
    <article class="card card--projects" id="projects" tabindex="0" role="button" aria-label="${data.ariaLabel}">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <ul class="card__list" aria-label="${data.listAriaLabel}">
            ${items}
          </ul>
        </div>
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
    <article class="card card--experience" id="experience" tabindex="0" role="button" aria-label="${data.ariaLabel}">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <ul class="card__list" aria-label="${data.listAriaLabel}">
            ${items}
          </ul>
        </div>
      </div>
    </article>
  `;
}

function renderContactAction(action, data) {
  const href = action.key === 'email' ? `mailto:${data.email}` : data[action.key];
  const externalAttrs = action.external ? 'target="_blank" rel="noopener noreferrer"' : '';
  return `
    <a class="card__btn" href="${href}" ${externalAttrs} data-action="contact" aria-label="${action.ariaLabel}">
      ${action.label}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>
  `;
}

function renderContactCard(data) {
  const fullHtml = data.fullText.replace(
    /{{email}}/g,
    `<a href="mailto:${data.email}">${data.email}</a>`,
  );
  const actionsHtml = data.actions.map((action) => renderContactAction(action, data)).join('');

  return `
    <article class="card card--contact" id="contact" tabindex="0" role="button" aria-label="${data.ariaLabel}">
      ${renderCloseIcon()}
      ${renderResizeHandleContainer()}
      <div class="card__content">
        <div class="card__text">
          <span class="card__label">${data.label}</span>
          <h2 class="card__title">${data.title}</h2>
          <p class="card__summary">${data.summary}</p>
          <div class="card__full">
            <p>${fullHtml}</p>
          </div>
        </div>
        <div class="card__actions">
          ${actionsHtml}
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

const CONTENT_SELECTOR =
  '.card__summary, .card__list, .card__full, .card__actions, .card__avatar, .card__graphic, .card__label, .card__alias';

let pendingContentFlags = null;

function contentKeyOf(el) {
  if (el.classList.contains('card__summary')) return 'summary';
  if (el.classList.contains('card__list')) return 'list';
  if (el.classList.contains('card__full')) return 'full';
  if (el.classList.contains('card__actions')) return 'actions';
  if (el.classList.contains('card__avatar')) return 'avatar';
  if (el.classList.contains('card__alias')) return 'alias';
  if (el.classList.contains('card__label')) return 'label';
  return 'graphic';
}

function isVisibleContent(el) {
  const cs = getComputedStyle(el);
  return {
    visible: cs.display !== 'none' && parseFloat(cs.opacity) > 0.5,
    opacity: parseFloat(cs.opacity),
    height: el.offsetHeight,
    display: cs.display,
  };
}

function captureContentFlags() {
  const flags = {};
  document.querySelectorAll('.card').forEach((card) => {
    const entry = {};
    card.querySelectorAll(CONTENT_SELECTOR).forEach((el) => {
      entry[contentKeyOf(el)] = isVisibleContent(el);
    });
    flags[card.id] = entry;
  });
  return flags;
}

function hasContentFlags() {
  return pendingContentFlags !== null;
}

function consumeContentFlags() {
  const flags = pendingContentFlags;
  pendingContentFlags = null;
  return flags;
}

function discardContentFlags() {
  pendingContentFlags = null;
}

function clearContentInlineStyles(gridEl) {
  if (!gridEl) return;
  const props = ['height', 'opacity', 'transform', 'display', 'translate', 'rotate', 'scale'];
  gridEl.querySelectorAll(CONTENT_SELECTOR).forEach((el) => {
    props.forEach((prop) => el.style.removeProperty(prop));
  });
}

function animateContentState(timeline, gridEl) {
  const flags = consumeContentFlags();
  if (!flags || !timeline || !gridEl) return false;

  clearContentInlineStyles(gridEl);

  let animated = false;

  gridEl.querySelectorAll('.card').forEach((card) => {
    const previous = flags[card.id];
    if (!previous) return;

    card.querySelectorAll(CONTENT_SELECTOR).forEach((el) => {
      const key = contentKeyOf(el);
      const before = previous[key];
      if (!before) return;

      const now = isVisibleContent(el);
      if (before.visible === now.visible) return;

      const isBox = key === 'avatar' || key === 'graphic';
      animated = true;

      if (now.visible) {
        const from = isBox ? { opacity: 0, y: 12 } : { height: 0, opacity: 0, y: 12 };
        const to = isBox
          ? { opacity: now.opacity, y: 0, duration: 0.3, ease: 'power2.out' }
          : { height: now.height, opacity: now.opacity, y: 0, duration: 0.38, ease: 'power2.out' };
        timeline.fromTo(el, from, { ...to, immediateRender: true }, 0.08);
      } else {
        if (key === 'avatar') return;
        if (isBox) el.style.display = before.display;
        const from = isBox ? { opacity: before.opacity, y: 0 } : { height: before.height, opacity: before.opacity, y: 0 };
        const to = isBox
          ? { opacity: 0, y: 12, duration: 0.3, ease: 'power2.in' }
          : { height: 0, opacity: 0, y: 12, duration: 0.3, ease: 'power2.in' };
        timeline.fromTo(el, from, { ...to, immediateRender: true }, 0.06);
      }
    });
  });

  return animated;
}

function updateCardStates(state) {
  pendingContentFlags = captureContentFlags();
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
    hasContentFlags,
    consumeContentFlags,
    discardContentFlags,
    clearContentInlineStyles,
    animateContentState,
  };
}
