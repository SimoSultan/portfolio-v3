function initResize(gridEl, cardState, applyLayoutCallback, updateCardStatesCallback) {
  let drag = null;

  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  gridEl.addEventListener('mousedown', (e) => {
    const handle = e.target.closest('.resize-handle');
    if (!handle) return;

    const card = handle.closest('.card');
    if (!card) return;

    e.preventDefault();
    e.stopPropagation();

    const handleDir = handle.dataset.handle;
    const isHorizontal = handleDir === 'e' || handleDir === 'w';

    drag = {
      cardId: card.id,
      handle: handleDir,
      handleEl: handle,
      startX: e.clientX,
      startY: e.clientY,
      threshold: 50,
      axis: isHorizontal ? 'x' : 'y',
    };

    document.body.classList.add('is-resizing');
    card.style.cursor = 'grabbing';
    document.body.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!drag) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const card = document.getElementById(drag.cardId);

    if (!card) return;

    let grow = false;
    let shrink = false;

    if (drag.handle === 'e') {
      grow = dx > drag.threshold;
      shrink = dx < -drag.threshold;
    } else if (drag.handle === 'w') {
      grow = dx < -drag.threshold;
      shrink = dx > drag.threshold;
    } else if (drag.handle === 's') {
      grow = dy > drag.threshold;
      shrink = dy < -drag.threshold;
    } else if (drag.handle === 'n') {
      grow = dy < -drag.threshold;
      shrink = dy > drag.threshold;
    }

    const growOrShrink = grow || shrink;
    if (!growOrShrink) {
      drag.handleEl.classList.remove('resize-handle--blocked');
      return;
    }

    const breakpoint = portfolioLayouts.getBreakpoint();
    const layout = portfolioLayouts.getLayoutForState(breakpoint, cardState);
    const nextLayout = portfolioLayouts.applyLocalResize(
      layout,
      drag.cardId,
      drag.handle,
      grow
    );

    if (!nextLayout) {
      drag.handleEl.classList.add('resize-handle--blocked');
      return;
    }

    drag.handleEl.classList.remove('resize-handle--blocked');
    cardState.currentLayout = nextLayout;
    updateCardStatesCallback(cardState);
    applyLayoutCallback();

    drag.startX = e.clientX;
    drag.startY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    if (!drag) return;

    const card = document.getElementById(drag.cardId);
    if (card) {
      card.style.cursor = '';
    }

    drag.handleEl.classList.remove('resize-handle--blocked');
    document.body.classList.remove('is-resizing');
    document.body.style.cursor = '';

    // Re-render handles now that drag is done
    const breakpoint = portfolioLayouts.getBreakpoint();
    const layout = portfolioLayouts.getLayoutForState(breakpoint, cardState);
    portfolioLayouts.renderResizeHandles(layout);

    drag = null;
  });
}

if (typeof window !== 'undefined') {
  window.portfolioResize = { initResize };
}
