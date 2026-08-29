(function(){
  // ==========================================================================
  // 🔐 Đăng nhập / phân quyền (Admin / Nhân viên) qua Supabase Auth.
  // Đọc là công khai (không cần đăng nhập); mọi thao tác ghi (thêm/sửa/xóa/
  // phê duyệt) đều bị chặn ở cả giao diện lẫn tầng Supabase (RLS + trigger)
  // nếu chưa đăng nhập hoặc không đủ quyền.
  // ==========================================================================
  var AUTH_URL = "https://okhvwdzhxyskmxckdqam.supabase.co";
  var AUTH_KEY = "sb_publishable_6iCApdhAtJVnKonvUVJbUA_OpyW5lMB";
  var authClient = null;
  try {
    authClient = supabase.createClient(AUTH_URL, AUTH_KEY);
  } catch (e) {
    console.error('[Kafka X] Không khởi tạo được Auth client:', e);
  }
  // Cho phép các script khác (vd. upload ảnh thumbnail lên Storage) dùng lại
  // đúng client này, để request upload đi kèm phiên đăng nhập hiện tại.
  window.__vinhAuthClient = authClient;

  var authBtn = document.getElementById('authAreaBtn');
  var authOverlay = document.getElementById('authOverlay');
  var authForm = document.getElementById('authForm');
  var authError = document.getElementById('authError');
  var authEmail = document.getElementById('authEmail');
  var authPassword = document.getElementById('authPassword');

  function showAuthError(msg){
    authError.textContent = msg;
    authError.classList.add('show');
  }
  function hideAuthError(){
    authError.textContent = '';
    authError.classList.remove('show');
  }
  function openAuthModal(){
    hideAuthError();
    authForm.reset();
    authOverlay.classList.add('open');
    setTimeout(function(){ authEmail && authEmail.focus(); }, 50);
  }
  function closeAuthModal(){
    authOverlay.classList.remove('open');
  }

  var currentSessionUser = null; // { id, email, displayName, role } hoặc null

  function applyAuthUI(){
    if (currentSessionUser) {
      authBtn.textContent = '👤 ' + currentSessionUser.displayName +
        (currentSessionUser.role === 'admin' ? ' (Admin)' : ' (Nhân viên)') + ' · Đăng xuất';
      authBtn.classList.add('logged-in');
      authBtn.title = 'Bấm để đăng xuất';
    } else {
      authBtn.textContent = '🔓 Đăng nhập';
      authBtn.classList.remove('logged-in');
      authBtn.title = 'Đăng nhập để chỉnh sửa content';
    }
    if (window.__vinh_setCurrentUser) window.__vinh_setCurrentUser(currentSessionUser);
  }

  async function loadProfileAndApply(session){
    if (!session || !session.user) {
      currentSessionUser = null;
      applyAuthUI();
      return;
    }
    try {
      var res = await authClient.from('profiles').select('display_name, role').eq('id', session.user.id).single();
      if (res.error || !res.data) {
        currentSessionUser = null;
        applyAuthUI();
        return;
      }
      currentSessionUser = {
        id: session.user.id,
        email: session.user.email,
        displayName: res.data.display_name,
        role: res.data.role
      };
    } catch (e) {
      currentSessionUser = null;
    }
    applyAuthUI();
  }

  authBtn.addEventListener('click', function(){
    if (currentSessionUser) {
      if (confirm('Đăng xuất khỏi tài khoản "' + currentSessionUser.displayName + '"?')) {
        authClient.auth.signOut().then(function(){
          currentSessionUser = null;
          applyAuthUI();
        });
      }
    } else {
      openAuthModal();
    }
  });

  document.getElementById('authModalCloseX').addEventListener('click', closeAuthModal);
  document.getElementById('authCancelBtn').addEventListener('click', closeAuthModal);

  authForm.addEventListener('submit', async function(e){
    e.preventDefault();
    hideAuthError();
    var email = authEmail.value.trim();
    var password = authPassword.value;
    if (!authClient) {
      showAuthError('Không kết nối được hệ thống đăng nhập.');
      return;
    }
    var submitBtn = document.getElementById('authSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang đăng nhập...';
    try {
      var res = await authClient.auth.signInWithPassword({ email: email, password: password });
      if (res.error) {
        showAuthError('Sai email hoặc mật khẩu.');
        return;
      }
      await loadProfileAndApply(res.data.session);
      closeAuthModal();
    } catch (err) {
      showAuthError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng nhập';
    }
  });

  // Khôi phục phiên đăng nhập cũ (nếu có) ngay khi tải trang.
  if (authClient) {
    authClient.auth.getSession().then(function(res){
      loadProfileAndApply(res.data && res.data.session);
    });
    authClient.auth.onAuthStateChange(function(event, session){
      loadProfileAndApply(session);
    });
  }
})();
