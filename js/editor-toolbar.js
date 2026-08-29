(function(){
  // ---- Toolbar định dạng + chèn ảnh + dán ảnh (Ctrl+V) cho khung soạn thảo nội dung (dùng chung ngắn/dài) ----
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var editor = document.getElementById('fBody');
    if(!editor) return;

    document.querySelectorAll('.blog-tb-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        editor.focus();
        var cmd = btn.getAttribute('data-cmd');
        var block = btn.getAttribute('data-block');
        if(cmd){ document.execCommand(cmd, false, null); }
        else if(block){ document.execCommand('formatBlock', false, block); }
      });
    });

    function insertImageFile(file){
      if(!file || !file.type || file.type.indexOf('image/') !== 0) return;
      var reader = new FileReader();
      reader.onload = function(ev){
        var img = new Image();
        img.onload = function(){
          // Giới hạn chiều rộng tối đa 1280px và nén JPEG chất lượng 0.72
          // để bài blog nhiều ảnh không bị quá nặng khi lưu lên Supabase.
          var maxW = 1280;
          var scale = Math.min(1, maxW / img.width);
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var compressed = canvas.toDataURL('image/jpeg', 0.72);
          editor.focus();
          document.execCommand('insertImage', false, compressed);
        };
        img.onerror = function(){
          // Nếu vì lý do gì đó không đọc được làm ảnh để nén, vẫn chèn ảnh gốc để không mất thao tác của người dùng.
          editor.focus();
          document.execCommand('insertImage', false, ev.target.result);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }

    var imgBtn = document.getElementById('fBlogImgBtn');
    var imgFile = document.getElementById('fBlogImgFile');
    if(imgBtn && imgFile){
      imgBtn.addEventListener('click', function(e){ e.preventDefault(); imgFile.click(); });
      imgFile.addEventListener('change', function(){
        if(imgFile.files && imgFile.files[0]) insertImageFile(imgFile.files[0]);
        imgFile.value = '';
      });
    }

    editor.addEventListener('paste', function(e){
      var clipboard = e.clipboardData || window.clipboardData;
      var items = clipboard ? clipboard.items : null;
      if(items){
        for(var i=0;i<items.length;i++){
          if(items[i].type && items[i].type.indexOf('image/') === 0){
            e.preventDefault();
            insertImageFile(items[i].getAsFile());
            return;
          }
        }
      }
      var text = clipboard ? clipboard.getData('text/plain') : '';
      if(text){
        e.preventDefault();
        document.execCommand('insertText', false, text);
      }
    });
  });
})();
