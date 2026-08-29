(function () {
  // Trong mỗi tuần, sắp xếp các content theo ngày tăng dần (ngày nhỏ/cũ hơn hiển thị trước, bên trái).
  // Mỗi khối .content-grid chỉ chứa content của đúng 1 tháng + 1 tuần nên chỉ cần so sánh theo "ngày" (dd) là đủ chính xác.
  function dayOf(cardEl) {
    var spans = cardEl.querySelectorAll('.card-meta-top span');
    var dateText = spans[1] ? spans[1].textContent.trim() : '';
    var m = dateText.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (!m) return Infinity; // content chưa có ngày -> đẩy xuống cuối
    return parseInt(m[1], 10);
  }

  function sortGridAscending(grid) {
    var current = Array.prototype.slice.call(grid.children);
    var sorted = current.slice().sort(function (a, b) { return dayOf(a) - dayOf(b); });
    for (var i = 0; i < sorted.length; i++) {
      if (grid.children[i] !== sorted[i]) {
        grid.insertBefore(sorted[i], grid.children[i] || null);
      }
    }
  }

  function processSorting() {
    document.querySelectorAll('.content-grid').forEach(sortGridAscending);
  }

  var board = document.getElementById('board');
  if (board) {
    processSorting();
    new MutationObserver(processSorting).observe(board, { childList: true, subtree: true });
  }
})();
