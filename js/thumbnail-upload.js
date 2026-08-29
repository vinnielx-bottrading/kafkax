(function () {
  // Tải ảnh thumbnail thật lên Supabase Storage (bucket "content-images").
  // Ảnh được nén & thu nhỏ ở phía trình duyệt, upload lên Storage, rồi CHỈ lưu
  // URL công khai vào field fThumb hiện có — không còn nhúng base64 vào
  // database nữa (tránh làm phình bảng content / chậm đồng bộ realtime).
  var urlInput = document.getElementById('fThumb');
  var fileInput = document.getElementById('fThumbFile');
  var uploadBtn = document.getElementById('fThumbUploadBtn');
  var preview = document.getElementById('fThumbPreview');
  if (!urlInput || !fileInput || !uploadBtn || !preview) return;

  var STORAGE_BUCKET = 'content-images';
  var MAX_DIMENSION = 1600;
  var MAX_UPLOAD_BYTES = 1500000; // ~1.5MB, dư sức dưới giới hạn 5MB của bucket
  var QUALITY_STEPS = [0.82, 0.7, 0.55, 0.4, 0.28];
  var uploadBtnDefaultText = uploadBtn.textContent;

  function updatePreview() {
    if (urlInput.value) {
      preview.src = urlInput.value;
      preview.classList.add('show');
    } else {
      preview.classList.remove('show');
      preview.removeAttribute('src');
    }
  }

  function setUploading(isUploading) {
    uploadBtn.disabled = isUploading;
    uploadBtn.textContent = isUploading ? 'Đang tải lên...' : uploadBtnDefaultText;
  }

  function compressToBlob(canvas) {
    return new Promise(function (resolve) {
      (function tryQuality(i) {
        canvas.toBlob(function (blob) {
          if (!blob) { resolve(null); return; }
          if (blob.size <= MAX_UPLOAD_BYTES || i === QUALITY_STEPS.length - 1) {
            resolve(blob);
          } else {
            tryQuality(i + 1);
          }
        }, 'image/jpeg', QUALITY_STEPS[i]);
      })(0);
    });
  }

  function uploadToStorage(blob) {
    var authClient = window.__vinhAuthClient;
    if (!authClient) {
      alert('Chưa khởi tạo được kết nối Supabase, vui lòng tải lại trang.');
      return;
    }
    setUploading(true);
    var path = 'thumb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.jpg';
    authClient.storage.from(STORAGE_BUCKET).upload(path, blob, {
      contentType: 'image/jpeg',
      upsert: false
    }).then(function (res) {
      if (res && res.error) throw res.error;
      var pub = authClient.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      var publicUrl = pub && pub.data && pub.data.publicUrl;
      if (!publicUrl) throw new Error('Không lấy được đường dẫn công khai của ảnh.');
      urlInput.value = publicUrl;
      updatePreview();
    }).catch(function (err) {
      console.error('[Content Planner] Lỗi upload ảnh thumbnail:', err);
      alert('Tải ảnh lên thất bại (' + ((err && err.message) || 'không rõ nguyên nhân') + '). Bạn cần đăng nhập trước khi tải ảnh lên.');
    }).finally(function () {
      setUploading(false);
    });
  }

  uploadBtn.addEventListener('click', function () {
    fileInput.click();
  });

  fileInput.addEventListener('change', function () {
    var file = fileInput.files && fileInput.files[0];
    fileInput.value = '';
    if (!file) return;
    if (!file.type || file.type.indexOf('image/') !== 0) {
      alert('Vui lòng chọn một file hình ảnh.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth || 1;
        var h = img.naturalHeight || 1;
        var scale = Math.min(1, MAX_DIMENSION / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale));
        var ch = Math.max(1, Math.round(h * scale));
        var canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        canvas.getContext('2d').drawImage(img, 0, 0, cw, ch);

        compressToBlob(canvas).then(function (blob) {
          if (!blob) {
            alert('Không nén được ảnh này, vui lòng thử ảnh khác.');
            return;
          }
          uploadToStorage(blob);
        });
      };
      img.onerror = function () {
        alert('Không đọc được ảnh này, vui lòng thử ảnh khác.');
      };
      img.src = e.target.result;
    };
    reader.onerror = function () {
      alert('Có lỗi khi đọc file ảnh.');
    };
    reader.readAsDataURL(file);
  });

  urlInput.addEventListener('input', updatePreview);
  urlInput.addEventListener('blur', function () {
    if (urlInput.value && urlInput.value.indexOf('data:') === 0) {
      alert('Đây là ảnh dán trực tiếp (base64), sẽ làm nặng database. Hãy dùng nút "⬆ Tải ảnh lên" thay vì dán mã ảnh.');
    }
  });

  // Cập nhật preview mỗi khi modal tạo/sửa content được mở (kể cả khi mở để sửa content có sẵn).
  var overlay = document.getElementById('overlay');
  if (overlay) {
    new MutationObserver(function () {
      if (overlay.classList.contains('open')) updatePreview();
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }
})();
