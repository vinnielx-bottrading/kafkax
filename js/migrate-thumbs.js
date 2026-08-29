(function () {
  // Tiện ích dọn dẹp 1 lần: chuyển các ảnh thumbnail đang lưu trực tiếp dạng
  // base64 trong cột content.thumb sang Supabase Storage (bucket
  // "content-images"), chỉ giữ lại URL công khai trong database. Chỉ admin
  // nhìn thấy và chạy được nút này.
  var STORAGE_BUCKET = 'content-images';
  var btn = document.getElementById('migrateThumbsBtn');
  if (!btn) return;

  function isAdmin() {
    var u = window.__vinhCurrentUser;
    return !!(u && u.role === 'admin');
  }

  function refreshVisibility() {
    btn.style.display = isAdmin() ? '' : 'none';
  }
  setInterval(refreshVisibility, 1000);
  refreshVisibility();

  function dataUrlToBlob(dataUrl) {
    var parts = dataUrl.split(',');
    var mimeMatch = /data:([^;]+);base64/.exec(parts[0]);
    var mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    var binary = atob(parts[1]);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return { blob: new Blob([bytes], { type: mime }), mime: mime };
  }

  btn.addEventListener('click', async function () {
    var authClient = window.__vinhAuthClient;
    if (!authClient) { alert('Chưa khởi tạo được kết nối Supabase.'); return; }
    if (!isAdmin()) { alert('Chỉ admin mới thực hiện được thao tác này.'); return; }
    if (!confirm('Quét toàn bộ content, chuyển các ảnh thumbnail dạng base64 sang Supabase Storage. Tiếp tục?')) return;

    btn.disabled = true;
    var originalText = btn.textContent;

    try {
      btn.textContent = 'Đang quét...';
      var res = await authClient.from('content').select('id, thumb').like('thumb', 'data:image%');
      if (res.error) throw res.error;
      var rows = res.data || [];
      if (!rows.length) {
        alert('Không có ảnh base64 nào cần chuyển. Mọi thumbnail đều đã là URL.');
        return;
      }

      var okCount = 0, failCount = 0;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        btn.textContent = 'Đang xử lý ' + (i + 1) + '/' + rows.length + '...';
        try {
          var conv = dataUrlToBlob(row.thumb);
          var ext = conv.mime.indexOf('jpeg') !== -1 ? 'jpg' : conv.mime.split('/')[1];
          var path = 'migrated_' + row.id + '_' + Date.now() + '.' + ext;
          var up = await authClient.storage.from(STORAGE_BUCKET).upload(path, conv.blob, { contentType: conv.mime, upsert: false });
          if (up.error) throw up.error;
          var pub = authClient.storage.from(STORAGE_BUCKET).getPublicUrl(path);
          var publicUrl = pub && pub.data && pub.data.publicUrl;
          if (!publicUrl) throw new Error('Không lấy được URL công khai');
          var upd = await authClient.from('content').update({ thumb: publicUrl }).eq('id', row.id);
          if (upd.error) throw upd.error;
          okCount++;
        } catch (rowErr) {
          console.error('[Content Planner] Lỗi chuyển ảnh cho content', row.id, rowErr);
          failCount++;
        }
      }
      alert('Hoàn tất: ' + okCount + ' ảnh đã chuyển sang Storage thành công' + (failCount ? ', ' + failCount + ' ảnh lỗi (xem console).' : '.'));
    } catch (err) {
      console.error('[Content Planner] Lỗi dọn ảnh nặng:', err);
      alert('Có lỗi khi quét/chuyển ảnh: ' + ((err && err.message) || 'không rõ nguyên nhân'));
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
})();
