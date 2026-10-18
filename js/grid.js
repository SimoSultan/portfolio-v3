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

const cardSizes = {
  hero: ['small', 'resting', 'medium', 'expanded'],
  contact: ['small', 'resting', 'medium', 'expanded'],
  about: ['resting', 'medium', 'expanded'],
  projects: ['resting', 'medium', 'expanded'],
  experience: ['resting', 'medium', 'expanded'],
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

function getCells(box) {
  const cells = new Set();
  for (let c = box.gc; c < box.gc + box.gcs; c++) {
    for (let r = box.gr; r < box.gr + box.grs; r++) {
      cells.add(`${c},${r}`);
    }
  }
  return cells;
}

function boxFromCells(cells) {
  if (cells.size === 0) return null;
  let minC = Infinity;
  let maxC = -Infinity;
  let minR = Infinity;
  let maxR = -Infinity;
  cells.forEach((key) => {
    const [c, r] = key.split(',').map(Number);
    minC = Math.min(minC, c);
    maxC = Math.max(maxC, c);
    minR = Math.min(minR, r);
    maxR = Math.max(maxR, r);
  });
  const width = maxC - minC + 1;
  const height = maxR - minR + 1;
  if (width * height !== cells.size) return null;
  return { gc: minC, gcs: width, gr: minR, grs: height };
}

function findOwner(layout, cellKey, excludeId) {
  for (const id in layout) {
    if (id === excludeId) continue;
    const box = layout[id];
    const [c, r] = cellKey.split(',').map(Number);
    if (c >= box.gc && c < box.gc + box.gcs && r >= box.gr && r < box.gr + box.grs) {
      return id;
    }
  }
  return null;
}

function isValidLayout(layout) {
  const cells = new Set();
  let totalArea = 0;
  let maxC = 0;
  let maxR = 0;
  for (const id in layout) {
    const box = layout[id];
    if (box.gcs < 1 || box.grs < 1) return false;
    totalArea += box.gcs * box.grs;
    maxC = Math.max(maxC, box.gc + box.gcs - 1);
    maxR = Math.max(maxR, box.gr + box.grs - 1);
    for (let c = box.gc; c < box.gc + box.gcs; c++) {
      for (let r = box.gr; r < box.gr + box.grs; r++) {
        const key = `${c},${r}`;
        if (cells.has(key)) return false;
        cells.add(key);
      }
    }
  }
  const expectedArea = maxC * maxR;
  return cells.size === expectedArea && totalArea === expectedArea;
}

function getCandidateSubsets(baseBox, lostCells) {
  const cells = [...lostCells];
  const subsets = [new Set()];
  const total = cells.length;
  for (let mask = 1; mask < 1 << total; mask++) {
    const subset = new Set();
    for (let i = 0; i < total; i++) {
      if (mask & (1 << i)) subset.add(cells[i]);
    }
    const combined = getCells(baseBox);
    subset.forEach((c) => combined.add(c));
    if (boxFromCells(combined)) subsets.push(subset);
  }
  return subsets;
}

function findShrinkAssignment(layout, cardId, lostCells) {
  const otherIds = Object.keys(layout).filter((id) => id !== cardId);
  const remaining = new Set(lostCells);
  const assignment = {};

  function backtrack(index) {
    if (remaining.size === 0) return true;
    if (index >= otherIds.length) return false;

    const id = otherIds[index];
    const candidates = getCandidateSubsets(layout[id], remaining);

    for (const subset of candidates) {
      assignment[id] = subset;
      subset.forEach((c) => remaining.delete(c));
      if (backtrack(index + 1)) return true;
      subset.forEach((c) => remaining.add(c));
    }

    delete assignment[id];
    return false;
  }

  if (!backtrack(0)) return null;
  return assignment;
}

function applyLocalResize(layout, cardId, direction, grow) {
  const current = layout[cardId];
  const next = { ...current };

  if (direction === 'e') {
    next.gcs += grow ? 1 : -1;
  } else if (direction === 'w') {
    if (grow) {
      next.gc -= 1;
      next.gcs += 1;
    } else {
      next.gc += 1;
      next.gcs -= 1;
    }
  } else if (direction === 's') {
    next.grs += grow ? 1 : -1;
  } else if (direction === 'n') {
    if (grow) {
      next.gr -= 1;
      next.grs += 1;
    } else {
      next.gr += 1;
      next.grs -= 1;
    }
  }

  if (next.gcs < 1 || next.grs < 1) return null;

  const oldCells = getCells(current);
  const newCells = getCells(next);
  const gained = new Set([...newCells].filter((c) => !oldCells.has(c)));
  const lost = new Set([...oldCells].filter((c) => !newCells.has(c)));

  const nextLayout = cloneLayout(layout);
  nextLayout[cardId] = next;

  if (grow) {
    const deltas = {};
    for (const cell of gained) {
      const owner = findOwner(layout, cell, cardId);
      if (!owner) return null;
      if (!deltas[owner]) deltas[owner] = new Set();
      deltas[owner].add(cell);
    }
    for (const id in deltas) {
      const remaining = getCells(layout[id]);
      for (const cell of deltas[id]) remaining.delete(cell);
      const box = boxFromCells(remaining);
      if (!box) return null;
      nextLayout[id] = box;
    }
  } else {
    const assignment = findShrinkAssignment(layout, cardId, lost);
    if (!assignment) return null;
    for (const id in assignment) {
      const subset = assignment[id];
      if (subset.size === 0) continue;
      const combined = getCells(layout[id]);
      subset.forEach((c) => combined.add(c));
      const box = boxFromCells(combined);
      if (!box) return null;
      nextLayout[id] = box;
    }
  }

  return isValidLayout(nextLayout) ? nextLayout : null;
}

function getMaxRow(layout) {
  let max = 0;
  for (const id in layout) {
    const { gr, grs } = layout[id];
    max = Math.max(max, gr + grs - 1);
  }
  return max;
}

function getDesktopAnchor(box) {
  const centerC = box.gc + (box.gcs - 1) / 2;
  const centerR = box.gr + (box.grs - 1) / 2;
  return {
    horizontal: centerC <= 2.5 ? 'left' : 'right',
    vertical: centerR <= 2 ? 'top' : 'bottom',
  };
}

function boxCenter(box) {
  return {
    c: box.gc + (box.gcs - 1) / 2,
    r: box.gr + (box.grs - 1) / 2,
  };
}

function assignSlots(cards, slots) {
  const used = new Set();
  const assignment = {};

  cards.forEach((card) => {
    const cc = boxCenter(card.box);
    let bestIndex = -1;
    let bestDist = Infinity;

    slots.forEach((slot, i) => {
      if (used.has(i)) return;
      const sc = boxCenter(slot.box);
      const dist = (cc.c - sc.c) ** 2 + (cc.r - sc.r) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    });

    assignment[card.id] = slots[bestIndex].box;
    used.add(bestIndex);
  });

  return assignment;
}

const desktopExpandedTemplates = {
  topleft: {
    expanded: { gc: 1, gcs: 3, gr: 1, grs: 2 },
    slots: [
      { box: { gc: 4, gcs: 1, gr: 1, grs: 1 } },
      { box: { gc: 4, gcs: 1, gr: 2, grs: 1 } },
      { box: { gc: 1, gcs: 3, gr: 3, grs: 1 } },
      { box: { gc: 4, gcs: 1, gr: 3, grs: 1 } },
    ],
  },
  topright: {
    expanded: { gc: 2, gcs: 3, gr: 1, grs: 2 },
    slots: [
      { box: { gc: 1, gcs: 1, gr: 1, grs: 1 } },
      { box: { gc: 1, gcs: 1, gr: 2, grs: 1 } },
      { box: { gc: 2, gcs: 3, gr: 3, grs: 1 } },
      { box: { gc: 1, gcs: 1, gr: 3, grs: 1 } },
    ],
  },
  bottomleft: {
    expanded: { gc: 1, gcs: 3, gr: 2, grs: 2 },
    slots: [
      { box: { gc: 4, gcs: 1, gr: 2, grs: 1 } },
      { box: { gc: 4, gcs: 1, gr: 3, grs: 1 } },
      { box: { gc: 1, gcs: 3, gr: 1, grs: 1 } },
      { box: { gc: 4, gcs: 1, gr: 1, grs: 1 } },
    ],
  },
  bottomright: {
    expanded: { gc: 2, gcs: 3, gr: 2, grs: 2 },
    slots: [
      { box: { gc: 1, gcs: 1, gr: 2, grs: 1 } },
      { box: { gc: 1, gcs: 1, gr: 3, grs: 1 } },
      { box: { gc: 2, gcs: 3, gr: 1, grs: 1 } },
      { box: { gc: 1, gcs: 1, gr: 1, grs: 1 } },
    ],
  },
};



function generateExpandedLayout(breakpoint, cardId, baseLayout = layouts[breakpoint].resting) {
  if (breakpoint === 'mobile') {
    const layout = cloneLayout(layouts.mobile.resting);
    const order = ['hero', 'about', 'projects', 'experience', 'contact'];
    const index = order.indexOf(cardId);
    layout[cardId] = { gc: 1, gcs: 1, gr: index + 1, grs: 2 };
    let row = index + 3;
    for (let i = index + 1; i < order.length; i++) {
      layout[order[i]] = { gc: 1, gcs: 1, gr: row, grs: 1 };
      row += 1;
    }
    return layout;
  }

  if (breakpoint === 'tablet') {
    // Tablet portrait expands like mobile: the clicked card becomes 2×2 at its
    // current row and pushes the cards below it down.
    const ids = Object.keys(baseLayout);
    ids.sort((a, b) => {
      const ab = baseLayout[a];
      const bb = baseLayout[b];
      if (ab.gr !== bb.gr) return ab.gr - bb.gr;
      return ab.gc - bb.gc;
    });

    const index = ids.indexOf(cardId);
    const layout = {};
    let row = 1;

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (i === index) {
        layout[id] = { gc: 1, gcs: 2, gr: row, grs: 2 };
        row += 2;
      } else {
        layout[id] = { gc: 1, gcs: 2, gr: row, grs: 1 };
        row += 1;
      }
    }

    return layout;
  }

  // desktop
  const others = ['hero', 'about', 'projects', 'experience', 'contact'].filter((id) => id !== cardId);
  const otherCards = others.map((id) => ({ id, box: baseLayout[id] }));
  const anchor = getDesktopAnchor(baseLayout[cardId]);
  const key = `${anchor.vertical}${anchor.horizontal}`;
  const template = desktopExpandedTemplates[key];
  const assignment = assignSlots(otherCards, template.slots);

  const layout = { [cardId]: template.expanded };
  others.forEach((id) => {
    layout[id] = assignment[id];
  });
  return layout;
}

function generateSmallLayout(breakpoint, cardId) {
  // Small only applies to the full-width cards on desktop; elsewhere fall back to default.
  if (breakpoint !== 'desktop' || (cardId !== 'hero' && cardId !== 'contact')) {
    return cloneLayout(layouts[breakpoint].resting);
  }

  const base = cloneLayout(layouts.desktop.resting);

  if (cardId === 'hero') {
    base.hero = { gc: 1, gcs: 2, gr: 1, grs: 1 };
    base.about = { gc: 3, gcs: 2, gr: 1, grs: 1 };
    base.projects = { gc: 1, gcs: 2, gr: 2, grs: 1 };
    base.experience = { gc: 3, gcs: 2, gr: 2, grs: 1 };
    base.contact = { gc: 1, gcs: 4, gr: 3, grs: 1 };
  } else {
    base.hero = { gc: 1, gcs: 4, gr: 1, grs: 1 };
    base.about = { gc: 1, gcs: 2, gr: 2, grs: 1 };
    base.projects = { gc: 3, gcs: 2, gr: 2, grs: 1 };
    base.experience = { gc: 1, gcs: 2, gr: 3, grs: 1 };
    base.contact = { gc: 3, gcs: 2, gr: 3, grs: 1 };
  }

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
  if (size === 'small') return generateSmallLayout(breakpoint, cardId);
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
  if (cardState.currentLayout) {
    return cloneLayout(cardState.currentLayout);
  }
  const { expandedId, mediumId, smallId } = cardState;
  if (expandedId) return generateExpandedLayout(breakpoint, expandedId);
  if (mediumId) return generateMediumLayout(breakpoint, mediumId);
  if (smallId) return generateSmallLayout(breakpoint, smallId);
  return cloneLayout(layouts[breakpoint].resting);
}

function getCardSizes(cardId) {
  return cardSizes[cardId] || snapSizes;
}

function getCardSize(cardState, cardId) {
  if (cardState.expandedId === cardId) return 'expanded';
  if (cardState.mediumId === cardId) return 'medium';
  if (cardState.smallId === cardId) return 'small';
  return 'resting';
}

function setCardSize(cardState, cardId, size) {
  if (size === 'expanded') {
    cardState.expandedId = cardId;
    cardState.mediumId = null;
    cardState.smallId = null;
  } else if (size === 'medium') {
    cardState.expandedId = null;
    cardState.mediumId = cardId;
    cardState.smallId = null;
  } else if (size === 'small') {
    cardState.expandedId = null;
    cardState.mediumId = null;
    cardState.smallId = cardId;
  } else {
    if (cardState.expandedId === cardId) cardState.expandedId = null;
    if (cardState.mediumId === cardId) cardState.mediumId = null;
    if (cardState.smallId === cardId) cardState.smallId = null;
  }
}

if (typeof window !== 'undefined') {
  window.portfolioLayouts = {
    getBreakpoint,
    getLayoutForState,
    getLayoutForSize,
    getCardSizes,
    getCardSize,
    setCardSize,
    applyLayout,
    generateExpandedLayout,
    generateMediumLayout,
    generateSmallLayout,
    applyLocalResize,
    isValidLayout,
    snapSizes,
    computeSharedEdges,
    renderResizeHandles,
  };
}
