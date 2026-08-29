(function(){
  // ==========================================================================
  // 1) Bắt buộc chọn "Ngày đăng" trước khi lưu content.
  // 2) Nếu để trống "Tuần", tự động gắn tuần dựa theo ngày đăng
  //    (ngày 1-7 → Tuần 1, 8-14 → Tuần 2, 15-21 → Tuần 3, 22-28 → Tuần 4,
  //    29-31 → Tuần 5), để không còn content nào rơi vào "(Chưa gắn tuần)"
  //    một cách vô tình.
  // Cách làm: gắn listener ở PHA CAPTURE trên document, chạy trước handler
  // submit gốc của form (vốn nằm ở pha "tại đích"), nhờ đó có thể chặn submit
  // (nếu thiếu ngày) hoặc tự điền Tuần trước khi handler gốc đọc giá trị.
  // ==========================================================================

  var WEEK_LABELS = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'];

  function computeWeekFromDdMmYyyy(value){
    var m = String(value || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    var day = parseInt(m[1], 10);
    var idx = Math.min(4, Math.max(0, Math.floor((day - 1) / 7)));
    return WEEK_LABELS[idx];
  }

  document.addEventListener('submit', function(e){
    if (!e.target || e.target.id !== 'cardForm') return;

    var dateInput = document.getElementById('fDate');
    var weekInput = document.getElementById('fWeek');
    var dateValue = dateInput ? dateInput.value.trim() : '';

    if (!dateValue) {
      e.preventDefault();
      e.stopImmediatePropagation();
      alert('Vui lòng chọn Ngày đăng trước khi lưu content. Đây là trường bắt buộc.');
      if (dateInput) dateInput.focus();
      return;
    }

    // Tự động gắn tuần theo ngày đăng nếu người dùng chưa chọn tuần.
    if (weekInput && !weekInput.value.trim()) {
      var autoWeek = computeWeekFromDdMmYyyy(dateValue);
      if (autoWeek) weekInput.value = autoWeek;
    }
  }, true);

  // Gợi ý tuần ngay khi người dùng chọn ngày, để họ thấy trước kết quả tự động
  // gắn tuần (vẫn có thể tự tay đổi lại nếu muốn tuần khác).
  document.addEventListener('input', function(e){
    if (!e.target || e.target.id !== 'fDate') return;
    var weekInput = document.getElementById('fWeek');
    if (!weekInput || weekInput.value.trim()) return;
    var autoWeek = computeWeekFromDdMmYyyy(e.target.value);
    if (autoWeek) weekInput.value = autoWeek;
  });

  // Đánh dấu (*) cho nhãn các trường bắt buộc, để người dùng biết ngay từ đầu.
  var __requiredLabels = ['Ngày đăng', 'Thương hiệu', 'Định dạng nội dung', 'Pillar', 'Sản phẩm', 'Kênh đăng'];
  document.querySelectorAll('label').forEach(function(label){
    if (__requiredLabels.indexOf(label.textContent.trim()) !== -1 && !label.querySelector('.required-star')) {
      var star = document.createElement('span');
      star.className = 'required-star';
      star.style.color = '#d64545';
      star.textContent = ' *';
      label.appendChild(star);
    }
  });
})();
