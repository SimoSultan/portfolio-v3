const layouts = {
  mobile: {
    resting: {
      hero: { gc: 1, gcs: 1, gr: 1, grs: 1 },
      about: { gc: 1, gcs: 1, gr: 2, grs: 1 },
      projects: { gc: 1, gcs: 1, gr: 3, grs: 1 },
      experience: { gc: 1, gcs: 1, gr: 4, grs: 1 },
      contact: { gc: 1, gcs: 1, gr: 5, grs: 1 },
    },
  },
  tablet: {
    resting: {
      hero: { gc: 1, gcs: 2, gr: 1, grs: 1 },
      about: { gc: 1, gcs: 2, gr: 2, grs: 1 },
      projects: { gc: 1, gcs: 2, gr: 3, grs: 1 },
      experience: { gc: 1, gcs: 2, gr: 4, grs: 1 },
      contact: { gc: 1, gcs: 2, gr: 5, grs: 1 },
    },
  },
  desktop: {
    resting: {
      hero: { gc: 1, gcs: 4, gr: 1, grs: 1 },
      about: { gc: 1, gcs: 2, gr: 2, grs: 1 },
      projects: { gc: 3, gcs: 1, gr: 2, grs: 1 },
      experience: { gc: 4, gcs: 1, gr: 2, grs: 1 },
      contact: { gc: 1, gcs: 4, gr: 3, grs: 1 },
    },
  },
};

const snapSizes = ['resting', 'medium', 'expanded'];

function getBreakpoint() {
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function cloneLayout(layout) {
  const clone = {};
  for (const key in layout) {
    clone[key] = { ...layout[key] };
  }
  return clone;
}

function getMaxRow(layout) {
  let max = 0;
  for (const id in layout) {
    const { gr, grs } = layout[id];
    max = Math.max(max, gr + grs - 1);
  }
  return max;
}

function generateExpandedLayout(breakpoint, cardId) {
  const base = cloneLayout(layouts[breakpoint].resting);

  if (breakpoint === 'mobile') {
    const order = ['hero', 'about', 'projects', 'experience', 'contact'];
    const index = order.indexOf(cardId);
    base[cardId] = { gc: 1, gcs: 1, gr: index + 1, grs: 2 };
    let row = index + 3;
    for (let i = index + 1; i < order.length; i++) {
      base[order[i]] = { gc: 1, gcs: 1, gr: row, grs: 1 };
      row += 1;
    }
    return base;
  }

  if (breakpoint === 'tablet') {
    base[cardId] = { gc: 1, gcs: 2, gr: 1, grs: 2 };
    const others = ['hero', 'about', 'projects', 'experience', 'contact'].filter((id) => id !== cardId);
    base[others[0]] = { gc: 1, gcs: 2, gr: 3, grs: 1 };
    base[others[1]] = { gc: 1, gcs: 2, gr: 4, grs: 1 };
    base[others[2]] = { gc: 1, gcs: 1, gr: 5, grs: 1 };
    base[others[3]] = { gc: 2, gcs: 1, gr: 5, grs: 1 };
    return base;
  }

  // desktop: 4x3 grid, expanded card is 3x2, remaining cells filled with 1x1 and 3x1
  base[cardId] = { gc: 1, gcs: 3, gr: 1, grs: 2 };
  const others = ['hero', 'about', 'projects', 'experience', 'contact'].filter((id) => id !== cardId);

  base[others[0]] = { gc: 4, gcs: 1, gr: 1, grs: 1 };
  base[others[1]] = { gc: 4, gcs: 1, gr: 2, grs: 1 };

  // Bottom row: one 1x1 and one 3x1
  const bottomSmallId = others[2];
  const bottomWideId = cardId === 'contact' ? others[3] : 'contact';

  base[bottomSmallId] = { gc: 1, gcs: 1, gr: 3, grs: 1 };
  base[bottomWideId] = { gc: 2, gcs: 3, gr: 3, grs: 1 };

  return base;
}

function generateMediumLayout(breakpoint, cardId) {
  // On mobile/tablet, medium is effectively the same as expanded due to limited cells
  if (breakpoint === 'mobile' || breakpoint === 'tablet') {
    return generateExpandedLayout(breakpoint, cardId);
  }

  // desktop: 4x3 grid, medium card is 2x2
  const base = cloneLayout(layouts.desktop.resting);

  if (cardId === 'hero') {
    base.hero = { gc: 1, gcs: 2, gr: 1, grs: 2 };
    base.about = { gc: 3, gcs: 2, gr: 1, grs: 1 };
    base.projects = { gc: 3, gcs: 1, gr: 2, grs: 1 };
    base.experience = { gc: 4, gcs: 1, gr: 2, grs: 1 };
    base.contact = { gc: 1, gcs: 4, gr: 3, grs: 1 };
  } else if (cardId === 'about') {
    base.about = { gc: 1, gcs: 2, gr: 1, grs: 2 };
    base.hero = { gc: 3, gcs: 2, gr: 1, grs: 1 };
    base.projects = { gc: 3, gcs: 1, gr: 2, grs: 1 };
    base.experience = { gc: 4, gcs: 1, gr: 2, grs: 1 };
    base.contact = { gc: 1, gcs: 4, gr: 3, grs: 1 };
  } else if (cardId === 'projects') {
    base.projects = { gc: 1, gcs: 2, gr: 1, grs: 2 };
    base.hero = { gc: 3, gcs: 2, gr: 1, grs: 1 };
    base.about = { gc: 3, gcs: 1, gr: 2, grs: 1 };
    base.experience = { gc: 4, gcs: 1, gr: 2, grs: 1 };
    base.contact = { gc: 1, gcs: 4, gr: 3, grs: 1 };
  } else if (cardId === 'experience') {
    base.experience = { gc: 1, gcs: 2, gr: 1, grs: 2 };
    base.hero = { gc: 3, gcs: 2, gr: 1, grs: 1 };
    base.about = { gc: 3, gcs: 1, gr: 2, grs: 1 };
    base.projects = { gc: 4, gcs: 1, gr: 2, grs: 1 };
    base.contact = { gc: 1, gcs: 4, gr: 3, grs: 1 };
  } else if (cardId === 'contact') {
    base.contact = { gc: 1, gcs: 2, gr: 2, grs: 2 };
    base.hero = { gc: 1, gcs: 4, gr: 1, grs: 1 };
    base.about = { gc: 3, gcs: 2, gr: 2, grs: 1 };
    base.projects = { gc: 3, gcs: 1, gr: 3, grs: 1 };
    base.experience = { gc: 4, gcs: 1, gr: 3, grs: 1 };
  }

  return base;
}

function getLayoutForSize(breakpoint, cardId, size) {
  if (size === 'expanded') return generateExpandedLayout(breakpoint, cardId);
  if (size === 'medium') return generateMediumLayout(breakpoint, cardId);
  return cloneLayout(layouts[breakpoint].resting);
}

function computeSharedEdges(layout) {
  const boxes = {};
  for (const id in layout) {
    const { gc, gcs, gr, grs } = layout[id];
    boxes[id] = {
      left: gc,
      right: gc + gcs,
      top: gr,
      bottom: gr + grs,
    };
  }

  const edges = {};
  const ids = Object.keys(boxes);

  for (const id of ids) {
    edges[id] = { n: false, e: false, s: false, w: false };
  }

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = boxes[ids[i]];
      const b = boxes[ids[j]];

      if (a.right === b.left || a.left === b.right) {
        const top = Math.max(a.top, b.top);
        const bottom = Math.min(a.bottom, b.bottom);
        if (top < bottom) {
          if (a.right === b.left) {
            edges[ids[i]].e = true;
            edges[ids[j]].w = true;
          } else {
            edges[ids[i]].w = true;
            edges[ids[j]].e = true;
          }
        }
      }

      if (a.bottom === b.top || a.top === b.bottom) {
        const left = Math.max(a.left, b.left);
        const right = Math.min(a.right, b.right);
        if (left < right) {
          if (a.bottom === b.top) {
            edges[ids[i]].s = true;
            edges[ids[j]].n = true;
          } else {
            edges[ids[i]].n = true;
            edges[ids[j]].s = true;
          }
        }
      }
    }
  }

  return edges;
}

function renderResizeHandle(direction) {
  return `<div class="resize-handle resize-handle--${direction}" data-handle="${direction}"></div>`;
}

function renderResizeHandles(layout) {
  if (document.body.classList.contains('is-resizing')) return;

  const edges = computeSharedEdges(layout);
  for (const id in edges) {
    const container = document.querySelector(`#${id} .resize-handles`);
    if (!container) continue;

    const dirs = ['n', 'e', 's', 'w'];
    container.innerHTML = dirs
      .filter((d) => edges[id][d])
      .map(renderResizeHandle)
      .join('');
  }
}

function applyLayout(layout, gridEl, animate = true) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const useAnimation = animate && !prefersReducedMotion && typeof gsap !== 'undefined' && typeof Flip !== 'undefined';

  const maxRow = getMaxRow(layout);
  document.documentElement.style.setProperty('--grid-rows', maxRow);

  if (useAnimation) {
    const state = Flip.getState(gridEl.children);

    for (const id in layout) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { gc, gcs, gr, grs } = layout[id];
      el.style.setProperty('--gc', gc);
      el.style.setProperty('--gcs', gcs);
      el.style.setProperty('--gr', gr);
      el.style.setProperty('--grs', grs);
    }

    Flip.from(state, {
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.03,
      absolute: true,
      zIndex: 1,
      onComplete: () => {
        renderResizeHandles(layout);
      },
    });
  } else {
    for (const id in layout) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { gc, gcs, gr, grs } = layout[id];
      el.style.setProperty('--gc', gc);
      el.style.setProperty('--gcs', gcs);
      el.style.setProperty('--gr', gr);
      el.style.setProperty('--grs', grs);
    }
    renderResizeHandles(layout);
  }
}

function getLayoutForState(breakpoint, cardState) {
  const { expandedId, mediumId } = cardState;
  if (expandedId) return generateExpandedLayout(breakpoint, expandedId);
  if (mediumId) return generateMediumLayout(breakpoint, mediumId);
  return cloneLayout(layouts[breakpoint].resting);
}

function getCardSize(cardState, cardId) {
  if (cardState.expandedId === cardId) return 'expanded';
  if (cardState.mediumId === cardId) return 'medium';
  return 'resting';
}

function setCardSize(cardState, cardId, size) {
  if (size === 'expanded') {
    cardState.expandedId = cardId;
    cardState.mediumId = null;
  } else if (size === 'medium') {
    cardState.expandedId = null;
    cardState.mediumId = cardId;
  } else {
    if (cardState.expandedId === cardId) cardState.expandedId = null;
    if (cardState.mediumId === cardId) cardState.mediumId = null;
  }
}

if (typeof window !== 'undefined') {
  window.portfolioLayouts = {
    getBreakpoint,
    getLayoutForState,
    getLayoutForSize,
    getCardSize,
    setCardSize,
    applyLayout,
    generateExpandedLayout,
    generateMediumLayout,
    snapSizes,
    computeSharedEdges,
    renderResizeHandles,
  };
}
