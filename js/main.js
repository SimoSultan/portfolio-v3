(function () {
  const state = {
    expandedId: null,
    mediumId: null,
  };

  let resizeTimeout;

  function applyCurrentLayout(animate = true) {
    const breakpoint = portfolioLayouts.getBreakpoint();
    const layout = portfolioLayouts.getLayoutForState(breakpoint, state);
    const grid = document.getElementById('grid');
    portfolioLayouts.applyLayout(layout, grid, animate);
  }

  function updateStates() {
    portfolioCards.updateCardStates(state);
  }

  function expandCard(id) {
    if (state.expandedId === id) {
      state.expandedId = null;
      state.mediumId = null;
    } else {
      state.expandedId = id;
      state.mediumId = null;
    }
    updateStates();
    applyCurrentLayout(true);
  }

  function collapseCard(id) {
    if (state.expandedId === id || state.mediumId === id) {
      state.expandedId = null;
      state.mediumId = null;
      updateStates();
      applyCurrentLayout(true);
    }
  }

  function initEvents() {
    const grid = document.getElementById('grid');

    grid.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-action="close"]');
      if (closeBtn) {
        e.stopPropagation();
        collapseCard(closeBtn.closest('.card').id);
        return;
      }

      const interactive = e.target.closest('a, button, [data-action]');
      const btn = e.target.closest('[data-action="expand"]');
      const card = e.target.closest('.card');
      const handle = e.target.closest('.resize-handle');

      if (handle) return;

      if (interactive && !btn) {
        return;
      }

      if (btn) {
        e.stopPropagation();
        const cardId = btn.closest('.card').id;
        if (state.expandedId !== cardId) {
          expandCard(cardId);
        }
        return;
      }

      if (card) {
        expandCard(card.id);
      }
    });

    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.card');
      if (!card) return;
      e.preventDefault();
      expandCard(card.id);
    });

    portfolioResize.initResize(grid, state, () => applyCurrentLayout(true), updateStates);

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        applyCurrentLayout(false);
      }, 150);
    });
  }

  function init() {
    portfolioCards.renderGrid();
    updateStates();
    applyCurrentLayout(false);
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
