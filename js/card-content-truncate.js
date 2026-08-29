(function () {
  // Rút gọn nội dung hiển thị trên thẻ (card) về tối đa 50 từ.
  // Nội dung đầy đủ vẫn được giữ nguyên trong dữ liệu và trong popup xem chi tiết khi bấm vào thẻ.
  var MAX_WORDS = 50;

  function truncateWords(text) {
    var words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    if (words.length <= MAX_WORDS) return null;
    return words.slice(0, MAX_WORDS).join(' ') + '…';
  }

  function processBoard() {
    var titles = document.querySelectorAll('#board .card-title:not([data-kx-done])');
    titles.forEach(function (el) {
      var short = truncateWords(el.textContent || '');
      if (short) el.textContent = short;
      el.setAttribute('data-kx-done', '1');
    });
  }

  var board = document.getElementById('board');
  if (board) {
    processBoard();
    new MutationObserver(processBoard).observe(board, { childList: true, subtree: true });
  }
})();
