(function () {
  // Mỗi "Tuần" một màu riêng (thanh accordion + viền trái của khối content) để dễ phân biệt các tuần.
  var WEEK_COLORS = {
    'Tuần 1': { bg: '#e3e9fd', color: '#3f5bd9' },
    'Tuần 2': { bg: '#fde3cf', color: '#c96a1f' },
    'Tuần 3': { bg: '#dcefe0', color: '#2f8a4c' },
    'Tuần 4': { bg: '#fdf1c7', color: '#a8790c' },
    'Tuần 5': { bg: '#f4c7c3', color: '#990000' }
  };
  var DEFAULT_COLOR = { bg: '#efefef', color: '#434343' };

  function colorForWeek(label) {
    return WEEK_COLORS[(label || '').trim()] || DEFAULT_COLOR;
  }

  function processWeekColors() {
    document.querySelectorAll('.week-block').forEach(function (block) {
      var bar = block.querySelector('.acc-bar.level-week');
      var body = block.querySelector('.acc-body.level-week-body');
      if (!bar) return;
      var labelEl = bar.children[0];
      var label = labelEl ? labelEl.textContent : '';
      var c = colorForWeek(label);
      bar.style.background = c.bg;
      bar.style.color = c.color;
      bar.style.borderLeft = '4px solid ' + c.color;
      if (body) {
        body.style.borderLeft = '4px solid ' + c.color;
        body.style.paddingLeft = '10px';
      }
    });
  }

  var board = document.getElementById('board');
  if (board) {
    processWeekColors();
    new MutationObserver(processWeekColors).observe(board, { childList: true, subtree: true });
  }
})();
