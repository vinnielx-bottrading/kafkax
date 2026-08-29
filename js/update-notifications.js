(function(){
  // ==========================================================================
  // Thông báo popup: hiện khi có content được cập nhật / phê duyệt.
  // Hoạt động độc lập với script chính phía trên (không đụng vào code cũ),
  // dựa trên việc so sánh dữ liệu trong localStorage theo thời gian — dữ liệu
  // này được đồng bộ real-time (Supabase) và cũng được ghi lại mỗi khi có ai
  // thao tác, nên phát hiện được cả thay đổi do người khác thực hiện.
  // ==========================================================================

  var STACK = document.getElementById('toastStack');
  var MAX_TOASTS = 4;

  function escapeHtml(str){
    return String(str == null ? '' : str).replace(/[&<>"']/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  function truncate(str, n){
    str = String(str || '').replace(/<[^>]*>/g, '').trim();
    return str.length > n ? str.slice(0, n) + '…' : str;
  }

  function showToast(opts){
    if (!STACK) return;
    var isApprove = opts.type === 'approve';
    var icon = isApprove ? '✅' : opts.type === 'new' ? '🆕' : opts.type === 'delete' ? '🗑️' : '📝';

    var el = document.createElement('div');
    el.className = 'toast-item' + (isApprove ? ' toast-approve' : '') + (opts.type === 'delete' ? ' toast-delete' : '');
    el.innerHTML =
      '<span class="toast-icon">' + icon + '</span>' +
      '<span class="toast-body">' +
        '<div class="toast-title">' + escapeHtml(opts.title) + '</div>' +
        '<div class="toast-msg">' + escapeHtml(opts.message) + '</div>' +
      '</span>';
    STACK.appendChild(el);

    while (STACK.children.length > MAX_TOASTS) {
      STACK.removeChild(STACK.firstChild);
    }

    // Tự động biến mất sau ~5 giây với hiệu ứng nhẹ nhàng.
    setTimeout(function(){
      el.classList.add('toast-leave');
      setTimeout(function(){
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 400);
    }, 5000);

    // Nếu người dùng đang ở tab/ứng dụng khác, vẫn báo qua thông báo hệ thống
    // của trình duyệt (cần trình duyệt đã cấp quyền Notification).
    try {
      if (document.hidden && window.Notification && Notification.permission === 'granted') {
        var n = new Notification(opts.title, { body: opts.message, silent: false });
        setTimeout(function(){ n.close(); }, 6000);
      }
    } catch (e) { /* bỏ qua nếu trình duyệt không hỗ trợ */ }
  }

  // Xin quyền gửi thông báo hệ thống ngay khi người dùng có tương tác đầu tiên
  // với trang (nhiều trình duyệt yêu cầu phải có cử chỉ người dùng).
  try {
    if (window.Notification && Notification.permission === 'default') {
      var askPermissionOnce = function(){
        Notification.requestPermission();
        document.removeEventListener('click', askPermissionOnce);
      };
      document.addEventListener('click', askPermissionOnce, { once: true });
    }
  } catch (e) { /* bỏ qua nếu trình duyệt không hỗ trợ Notification */ }

  var CONTENT_KEY = 'content_planner_data_v1';
  var TASKS_KEY = 'content_planner_tasks_v1';
  var TRADE_KEY = 'content_planner_trade_events_v1';
  var APPROVED_CONTENT_STATUSES = ['Chờ xuất bản', 'Xuất bản'];

  function readJSON(key){
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }

  function snapshotOf(list, fields){
    var map = {};
    (list || []).forEach(function(item){
      if (!item || !item.id) return;
      map[item.id] = fields.map(function(f){
        return item[f] == null ? '' : String(item[f]);
      }).join('|');
    });
    return map;
  }

  var lastContent = snapshotOf(readJSON(CONTENT_KEY), ['status', 'content', 'bodyHtml']);
  var lastTasks = snapshotOf(readJSON(TASKS_KEY), ['progress', 'description', 'issue', 'solution']);
  var lastTrade = snapshotOf(readJSON(TRADE_KEY), ['status', 'name', 'description']);

  // Lưu tên/tiêu đề của từng mục tại lần kiểm tra gần nhất, để khi một mục bị
  // xóa vẫn hiển thị được tên của nó trong thông báo (lúc đó mục đã biến mất
  // khỏi dữ liệu nên không thể tra cứu lại được nữa).
  var lastLabels = { content: {}, trade: {}, tasks: {} };
  (function seedLabels(){
    readJSON(CONTENT_KEY).forEach(function(item){
      if (item && item.id) lastLabels.content[item.id] = truncate(item.content || item.bodyHtml || '', 60) || '(không có tiêu đề)';
    });
    readJSON(TRADE_KEY).forEach(function(item){
      if (item && item.id) lastLabels.trade[item.id] = truncate(item.name || '', 60) || '(không có tên sự kiện)';
    });
    readJSON(TASKS_KEY).forEach(function(item){
      if (item && item.id) lastLabels.tasks[item.id] = truncate(item.name || '', 60) || '(không có tên công việc)';
    });
  })();

  function checkContent(){
    var list = readJSON(CONTENT_KEY);
    var current = snapshotOf(list, ['status', 'content', 'bodyHtml']);
    var currentIds = {};

    list.forEach(function(item){
      if (!item || !item.id) return;
      currentIds[item.id] = true;
      var label = truncate(item.content || item.bodyHtml || '', 60) || '(không có tiêu đề)';
      var prevSig = lastContent[item.id];

      if (prevSig === undefined) {
        showToast({ type: 'new', title: 'Content mới được thêm', message: label });
        return;
      }
      if (prevSig === current[item.id]) return;

      var prevStatus = prevSig.split('|')[0];
      var becameApproved = APPROVED_CONTENT_STATUSES.indexOf(item.status) !== -1 &&
        APPROVED_CONTENT_STATUSES.indexOf(prevStatus) === -1;

      showToast(becameApproved ? {
        type: 'approve',
        title: 'Content đã được phê duyệt',
        message: label
      } : {
        type: 'update',
        title: 'Content vừa được cập nhật',
        message: label
      });
    });

    Object.keys(lastLabels.content).forEach(function(id){
      if (!currentIds[id]) {
        showToast({
          type: 'delete',
          title: 'Content đã bị xóa',
          message: lastLabels.content[id]
        });
      }
    });

    lastContent = current;
    lastLabels.content = {};
    list.forEach(function(item){
      if (item && item.id) {
        lastLabels.content[item.id] = truncate(item.content || item.bodyHtml || '', 60) || '(không có tiêu đề)';
      }
    });
  }

  function checkTrade(){
    var list = readJSON(TRADE_KEY);
    var current = snapshotOf(list, ['status', 'name', 'description']);
    var currentIds = {};

    list.forEach(function(item){
      if (!item || !item.id) return;
      currentIds[item.id] = true;
      var label = truncate(item.name || '', 60) || '(không có tên sự kiện)';
      var prevSig = lastTrade[item.id];

      if (prevSig === undefined) {
        showToast({ type: 'new', title: 'Sự kiện Trade Marketing mới được thêm', message: label });
        return;
      }
      if (prevSig === current[item.id]) return;

      var prevStatus = prevSig.split('|')[0];
      var becameApproved = item.status === 'Đã duyệt' && prevStatus !== 'Đã duyệt';

      showToast(becameApproved ? {
        type: 'approve',
        title: 'Sự kiện Trade Marketing đã được duyệt',
        message: label
      } : {
        type: 'update',
        title: 'Sự kiện Trade Marketing vừa cập nhật',
        message: label
      });
    });

    Object.keys(lastLabels.trade).forEach(function(id){
      if (!currentIds[id]) {
        showToast({
          type: 'delete',
          title: 'Sự kiện Trade Marketing đã bị xóa',
          message: lastLabels.trade[id]
        });
      }
    });

    lastTrade = current;
    lastLabels.trade = {};
    list.forEach(function(item){
      if (item && item.id) {
        lastLabels.trade[item.id] = truncate(item.name || '', 60) || '(không có tên sự kiện)';
      }
    });
  }

  function checkTasks(){
    var list = readJSON(TASKS_KEY);
    var current = snapshotOf(list, ['progress', 'description', 'issue', 'solution']);
    var currentIds = {};

    list.forEach(function(item){
      if (!item || !item.id) return;
      currentIds[item.id] = true;
      var label = truncate(item.name || '', 60) || '(không có tên công việc)';
      var prevSig = lastTasks[item.id];

      if (prevSig === undefined) {
        showToast({ type: 'new', title: 'Công việc mới được thêm', message: label });
        return;
      }
      if (prevSig === current[item.id]) return;

      showToast({ type: 'update', title: 'Công việc vừa được cập nhật', message: label });
    });

    Object.keys(lastLabels.tasks).forEach(function(id){
      if (!currentIds[id]) {
        showToast({
          type: 'delete',
          title: 'Công việc đã bị xóa',
          message: lastLabels.tasks[id]
        });
      }
    });

    lastTasks = current;
    lastLabels.tasks = {};
    list.forEach(function(item){
      if (item && item.id) {
        lastLabels.tasks[item.id] = truncate(item.name || '', 60) || '(không có tên công việc)';
      }
    });
  }

  function checkAll(){
    checkContent();
    checkTrade();
    checkTasks();
  }

  // Bắt thay đổi NGAY LẬP TỨC tại đúng thời điểm ứng dụng ghi dữ liệu vào
  // localStorage — kể cả khi dữ liệu đó vừa được đẩy về từ đồng bộ real-time
  // (Supabase) do người khác thao tác trên máy/thiết bị khác. Cách này không
  // dùng setInterval polling nên không bị trình duyệt "throttle" (làm chậm/
  // tạm dừng bộ đếm giờ) khi tab đang chạy nền hoặc người dùng đang ở ứng
  // dụng khác — vốn là lúc thông báo cần hiện ra nhất.
  var WATCHED_KEYS = [CONTENT_KEY, TASKS_KEY, TRADE_KEY];
  var nativeSetItem = Storage.prototype.setItem;
  var lastQuotaWarnAt = 0;

  function warnQuotaOnce(){
    var now = Date.now();
    if (now - lastQuotaWarnAt < 5 * 60 * 1000) return; // tối đa 1 lần / 5 phút
    lastQuotaWarnAt = now;
    showToast({
      type: 'delete',
      title: 'Bộ nhớ trình duyệt (localStorage) đã đầy',
      message: 'Dữ liệu vẫn được gửi lên Supabase bình thường, nhưng bộ nhớ cache cục bộ trên trình duyệt này đã đầy — nên kiểm tra lại các content có ảnh nhúng trực tiếp (base64) quá nặng.'
    });
  }

  Storage.prototype.setItem = function(key, value){
    var result;
    try {
      result = nativeSetItem.apply(this, arguments);
    } catch (err) {
      // QUAN TRỌNG: nếu localStorage đầy (QuotaExceededError), TUYỆT ĐỐI không
      // để lỗi này lan ra ngoài — nếu không, nó sẽ chặn đứng luôn bước gửi dữ
      // liệu lên Supabase ngay sau đó trong cùng hàm gọi (đây chính là nguyên
      // nhân khiến nhiều thay đổi "tưởng đã lưu" nhưng thực ra chưa từng lên
      // được server). Bỏ qua việc cache cục bộ, để ứng dụng tiếp tục chạy và
      // vẫn gửi được dữ liệu lên Supabase như bình thường.
      if (this === window.localStorage && err && (
        err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 || err.code === 1014
      )) {
        console.warn('[Kafka X] localStorage đầy — bỏ qua cache cục bộ cho key "' + key + '", dữ liệu vẫn tiếp tục gửi lên Supabase.', err);
        warnQuotaOnce();
        return;
      }
      throw err;
    }
    if (this === window.localStorage && WATCHED_KEYS.indexOf(key) !== -1) {
      // Chạy sau khi giá trị đã thực sự được ghi vào localStorage.
      setTimeout(checkAll, 0);
    }
    return result;
  };

  // Lưới an toàn dự phòng: nếu vì lý do nào đó việc ghi localStorage không đi
  // qua setItem (ví dụ trình duyệt lạ), vẫn kiểm tra định kỳ mỗi 15 giây.
  setInterval(checkAll, 15000);

  // Khi người dùng quay lại tab/trang sau khi rời đi, kiểm tra ngay để không
  // bỏ lỡ thay đổi xảy ra trong lúc họ vắng mặt.
  document.addEventListener('visibilitychange', function(){
    if (!document.hidden) checkAll();
  });

  // Bắt thay đổi ngay lập tức khi một tab khác (cùng trình duyệt) ghi localStorage.
  window.addEventListener('storage', function(e){
    if (e.key === CONTENT_KEY || e.key === TASKS_KEY || e.key === TRADE_KEY) {
      checkAll();
    }
  });
})();
