(function () {
  // Bỏ link "Xem bài" trên card content: nó chỉ mở link bài đăng ngoài, không phải xem nội dung
  // (xem nội dung nên bấm mở card để mở popup chi tiết như hiện có) -> gây hiểu lầm nên loại bỏ.
  function removeViewPostLinks() {
    document.querySelectorAll('#board .card-footer .footer-right a').forEach(function (a) {
      a.remove();
    });
  }
  var board2 = document.getElementById('board');
  if (board2) {
    removeViewPostLinks();
    new MutationObserver(removeViewPostLinks).observe(board2, { childList: true, subtree: true });
  }
})();
