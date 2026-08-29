(function() {
  const _0x12fda4 = null,
    _0x1d8095 = "content_planner_data_v1",
    _0x51cd58 = {
      'url': "https://okhvwdzhxyskmxckdqam.supabase.co",
      'anonKey': "sb_publishable_6iCApdhAtJVnKonvUVJbUA_OpyW5lMB",
      'projectId': "okhvwdzhxyskmxckdqam"
    },
    _0x313817 = _0x51cd58["url"] && _0x51cd58["anonKey"] && _0x51cd58["url"]["indexOf"]("PASTE_") !== 0x0;
  let _0x2405e1 = null;
  let _0xCurrentUser = null; // { id, email, displayName, role } khi đã đăng nhập, null khi chưa
  window.__vinh_setCurrentUser = function(_0xUser) {
    _0xCurrentUser = _0xUser;
    // Expose công khai để các script độc lập khác (vd. tiện ích dọn ảnh nặng
    // base64 -> Storage) biết được vai trò người đang đăng nhập mà không cần
    // đụng vào biến nội bộ _0xCurrentUser.
    window.__vinhCurrentUser = _0xUser;
    try {
      _0x20ff35();
    } catch (_0xIgnore) {}
  };
    const _0x50a568 = {
      'Đang thực hiện': {
        'bg': "#a67c1e",
        'color': "#ffffff"
      },
      'Đang xem xét': {
        'bg': "#3c78d8",
        'color': '#ffffff'
      },
      'Chờ xuất bản': {
        'bg': "#34a853",
        'color': "#ffffff"
      },
      'Xuất bản': {
        'bg': '#45818e',
        'color': "#ffffff"
      },
      'Tạm ngừng': {
        'bg': "#38454f",
        'color': '#ffffff'
      },
      'Hủy': {
        'bg': '#434343',
        'color': "#ffffff"
      }
    },
    _0x204bfd = Object["keys"](_0x50a568),
    _0x46dba2 = {
      'Knowledge': {
        'bg': "#cfe2f3",
        'color': "#1c4587"
      },
      'Feedback': {
        'bg': "#fce8b2",
        'color': '#7f6000'
      },
      'Trend': {
        'bg': '#d9d2e9',
        'color': "#351c75"
      },
      'Conversion': {
        'bg': '#f4c7c3',
        'color': "#990000"
      },
      'Promotion': {
        'bg': '#d0e0e3',
        'color': "#134f5c"
      },
      'Other': {
        'bg': "#efefef",
        'color': "#434343"
      }
    },
    _0x1baf87 = Object["keys"](_0x46dba2),
    _0x26483e = {
      'Tour': {
        'bg': "#3d85c6",
        'color': "#ffffff"
      },
      'Vé\x20máy\x20bay': {
        'bg': "#134f5c",
        'color': "#ffffff"
      },
      'Visa': {
        'bg': "#674ea7",
        'color': "#ffffff"
      },
      'Cà\x20phê': {
        'bg': "#6f4e37",
        'color': "#ffffff"
      },
      'Bất\x20Động\x20Sản': {
        'bg': "#8fce00",
        'color': "#274e13"
      },
      'Retreat': {
        'bg': "#a2c4c9",
        'color': "#0c343d"
      },
      'Catering': {
        'bg': "#e69138",
        'color': "#ffffff"
      }
    },
    _0x3a7ff0 = Object['keys'](_0x26483e),
    _0x3090ac = {
      'Travel': {
        'bg': "#d9ead3",
        'color': '#274e13'
      },
      'Communications': {
        'bg': "#c9daf8",
        'color': "#1c4587"
      },
      'Gift': {
        'bg': "#f9cb9c",
        'color': "#b45f06"
      },
      'Horeca': {
        'bg': '#ead1dc',
        'color': '#741b47'
      },
      'Wellness\x20Retreat': {
        'bg': "#d0e0e3",
        'color': "#0c343d"
      },
      'Real\x20Estate': {
        'bg': "#fff2cc",
        'color': "#7f6000"
      },
      'Trading': {
        'bg': '#d9d2e9',
        'color': "#351c75"
      },
      'Education': {
        'bg': '#fce5cd',
        'color': "#783f04"
      },
      'Working\x20Cafe': {
        'bg': "#e6d7c3",
        'color': "#5c3a21"
      }
    },
    _0x5bb905 = Object['keys'](_0x3090ac),
    _0x4637b3 = {
      'Hình\x20ảnh': {
        'bg': "#e3e9fd",
        'color': "#3f5bd9"
      },
      'Video': {
        'bg': "#fbdada",
        'color': "#c0392b"
      },
      'Carousel': {
        'bg': "#d7f3e3",
        'color': "#1a7f4c"
      },
      'Blog': {
        'bg': "#fce8b2",
        'color': "#7f6000"
      },
      'Khác': {
        'bg': "#efefef",
        'color': "#434343"
      }
    },
    _0x2a7762 = Object['keys'](_0x4637b3),
    _0xb5b91a = ["Facebook", "TikTok", "Instagram", "Threads", "YouTube", "Website", 'Zalo'],
    _0x2b97dc = ['Tuần\x201', 'Tuần\x202', 'Tuần\x203', "Tuần 4", "Tuần 5"];
  // ==========================================================================
  // 🩹 TỰ ĐỘNG DỌN CACHE CŨ: mỗi khi có bản vá quan trọng làm thay đổi cấu trúc
  // dữ liệu cục bộ (ví dụ: loại bỏ cơ chế "dữ liệu mẫu" từng gây nhân bản content
  // liên tục), tăng CODE_VERSION lên. Bất kỳ thiết bị nào mở file này lần đầu
  // sau bản vá — dù đã từng lưu/copy file ở đâu, bao nhiêu bản — sẽ tự động
  // phát hiện phiên bản cũ và XÓA SẠCH cache content cục bộ, buộc tải lại
  // hoàn toàn từ Supabase (nguồn dữ liệu chính thức duy nhất). Nhờ vậy không
  // cần yêu cầu người dùng vào Console xóa thủ công trên từng máy/điện thoại.
  const _0xCODE_VERSION = 'v3-new-supabase-project-2026-08-28';
  try {
    if (localStorage.getItem('content_planner_code_version') !== _0xCODE_VERSION) {
      localStorage.removeItem(_0x1d8095);
      localStorage.setItem('content_planner_code_version', _0xCODE_VERSION);
      console.warn('[Kafka X] Phát hiện phiên bản code mới — đã tự động xóa cache content cục bộ để đồng bộ sạch lại từ Supabase.');
    }
  } catch (_0xVersionCheckErr) {}

  let _0x2fc8d0 = _0x379128();
  const _0xPendingDeletes = new Set();

  function _0x379128() {
    const _0x2458e6 = _0x12fda4;
    try {
      const _0xa12496 = localStorage["getItem"](_0x1d8095);
      if (_0xa12496) return JSON['parse'](_0xa12496);
    } catch (_0x3c361f) {}
    // QUAN TRỌNG: KHÔNG fallback về dữ liệu mẫu nữa. Supabase giờ là nguồn dữ
    // liệu chính thức duy nhất — nếu localStorage trống/lỗi, bắt đầu với mảng
    // rỗng và để onSnapshot() nạp đúng dữ liệu thật ngay khi kết nối xong.
    // (Trước đây fallback về 2 content mẫu "Tour Malaysia" / "Behind the
    // scenes: Singapore" mỗi khi localStorage trống — đây chính là nguyên
    // nhân gốc gây nhân bản dữ liệu liên tục trong suốt các lần khắc phục
    // trước, vì mỗi bản mẫu mới lại được coi là "content chưa đồng bộ" rồi
    // tự động đẩy lên Supabase như dữ liệu thật.)
    return [];
  }

  function _0x2dc1ce(_0x4a601c) {
    const _0x5ebcd7 = _0x12fda4;
    localStorage["setItem"](_0x1d8095, JSON["stringify"](_0x2fc8d0));
    if (_0x2405e1) return _0x18665f('syncing', "Đang lưu..."), _0x2405e1["collection"]('content')["doc"](_0x4a601c['id'])["set"](_0x4a601c)["then"](() => _0x18665f('ok', "Đã đồng bộ (real-time)"))['catch'](_0x2e2be7 => {
      _0x18665f("error", "Lỗi lưu: " + _0x2e2be7['message']);
      alert('⚠️ LƯU THẤT BẠI: "' + ((_0x4a601c['content'] || '').slice(0, 40)) + '..."\n\nLỗi: ' + _0x2e2be7['message'] + '\n\nBài này CHƯA được lưu lên hệ thống — nó có thể biến mất nếu tải lại trang hoặc có đồng bộ khác diễn ra. Hãy chụp màn hình hoặc copy lại nội dung ngay, sau đó thử lưu lại (có thể do ảnh trong bài quá nặng hoặc mất mạng).');
    });
    return Promise["resolve"]();
  }

  function _0x5387a6(_0x4f9db8) {
    const _0x5a1d56 = _0x12fda4;
    localStorage["setItem"](_0x1d8095, JSON['stringify'](_0x2fc8d0));
    // QUAN TRỌNG: đánh dấu ID này đang trong quá trình xóa. Nếu một sự kiện
    // đồng bộ real-time (onSnapshot) xảy ra TRƯỚC KHI lệnh xóa lên Supabase
    // thực sự hoàn tất (do độ trễ mạng), server vẫn còn trả về bản ghi này —
    // nếu không có cờ đánh dấu, nó sẽ bị "hồi sinh" ngay lập tức do bị gộp lại
    // vào danh sách hiển thị. Đây chính là nguyên nhân "xóa xong lại hiện lại".
    _0xPendingDeletes.add(_0x4f9db8);
    if (_0x2405e1) return _0x18665f("syncing", "Đang xóa..."), _0x2405e1["collection"]("content")["doc"](_0x4f9db8)['delete']()["then"](() => {
      _0xPendingDeletes.delete(_0x4f9db8);
      _0x18665f('ok', 'Đã\x20đồng\x20bộ\x20(real-time)');
    })["catch"](_0x34ff48 => {
      _0xPendingDeletes.delete(_0x4f9db8);
      _0x18665f("error", "Lỗi xóa: " + _0x34ff48['message']);
    });
    _0xPendingDeletes.delete(_0x4f9db8);
    return Promise["resolve"]();
  }

  function _0x39d4c8(_0x14953b) {
    const _0x16bd02 = _0x12fda4;
    if (!_0x14953b['id']) _0x14953b['id'] = _0xe449dc();
    if (!_0x204bfd["includes"](_0x14953b['status'])) _0x14953b["status"] = _0x204bfd[0x0];
    return _0x14953b["channels"] = Array["isArray"](_0x14953b["channels"]) ? _0x14953b['channels'] : _0x14953b["channels"] ? String(_0x14953b["channels"])["split"](',')["map"](_0x23a3f8 => _0x23a3f8['trim']())["filter"](Boolean) : [], _0x14953b["brand"] = _0x14953b["brand"] || '', _0x14953b["format"] = _0x14953b['format'] || '', _0x14953b;
  }

  function _0x2d2a2a() {
    const _0x22a755 = _0x12fda4,
      _0x5450ab = new Date();
    return _0x5450ab['getFullYear']() + '-' + String(_0x5450ab["getMonth"]() + 0x1)["padStart"](0x2, '0') + '-' + String(_0x5450ab["getDate"]())['padStart'](0x2, '0');
  }

  function _0x42ceb7() {
    const _0x472893 = _0x12fda4,
      _0x11a2a3 = _0x2d2a2a(),
      _0x318121 = _0x2fc8d0["filter"](_0x22f248 => _0x22f248["status"] === "Chờ xuất bản" && _0x22f248["date"] && _0x22f248['date'] <= _0x11a2a3);
    if (_0x318121["length"] === 0x0) return ![];
    return _0x318121["forEach"](_0x77fed8 => {
      const _0x1f75b3 = _0x472893;
      _0x77fed8["status"] = "Xuất bản";
    }), localStorage["setItem"](_0x1d8095, JSON["stringify"](_0x2fc8d0)), _0x2405e1 && _0x318121['forEach'](_0x2ddaff => {
      const _0x33f012 = _0x472893;
      _0x2405e1["collection"]("content")["doc"](_0x2ddaff['id'])['set'](_0x2ddaff)['catch'](() => {});
    }), !![];
  }
  const _0x4b1ea4 = "vinhdeptrai",
    _0x332656 = '123VPS';

  function _0x5ed14e(_0x2f24aa) {
    const _0x429a84 = _0x12fda4;
    if (!_0xCurrentUser) {
      alert("Bạn cần đăng nhập để chỉnh sửa content.");
      return ![];
    }
    return !![];
  }

  function _0x1d1416() {
    const _0x13a6eb = _0x12fda4;
    if (!_0xCurrentUser) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này.");
      return ![];
    }
    if (_0xCurrentUser.role !== 'admin') {
      alert("Chỉ admin mới có quyền phê duyệt / thay đổi trạng thái content.");
      return ![];
    }
    return !![];
  }

  function _0x4ee201(_0x1f82d2) {
    const _0xcf5700 = _0x12fda4;
    if (!confirm(_0x1f82d2)) return ![];
    if (!_0xCurrentUser) {
      alert("Bạn cần đăng nhập để xóa content.");
      return ![];
    }
    if (_0xCurrentUser.role !== 'admin') {
      alert("Chỉ admin mới có quyền xóa content.");
      return ![];
    }
    return !![];
  }

  function _0x9bd0f1(_0xf52f7e) {
    const _0x2722c7 = _0x12fda4;
    if (!_0xCurrentUser) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này.");
      return ![];
    }
    if (_0xCurrentUser.role !== 'admin') {
      alert("Chỉ admin mới có quyền thực hiện thao tác này.");
      return ![];
    }
    return !![];
  }
  const _0x2695c1 = document["getElementById"]('syncStatus');

  function _0x18665f(_0x220d33, _0x4e63ff) {
    const _0x47f09d = _0x12fda4;
    _0x2695c1["className"] = "sync-status" + (_0x220d33 ? '\x20' + _0x220d33 : '');
    const _0x1a0ecd = _0x220d33 === 'ok' ? '🟢' : _0x220d33 === "error" ? '🔴' : _0x220d33 === "syncing" ? '🔄' : '⚪';
    _0x2695c1['textContent'] = _0x1a0ecd + '\x20' + _0x4e63ff;
  }

  function __vinh_createSupabaseFirestoreShim(sb) {
    function makeSnapshot(rows) {
      return {
        docs: (rows || []).map(function(row) {
          var data = Object.assign({}, row);
          var id = data.id;
          delete data.id;
          return {
            id: id,
            data: function() {
              return data;
            }
          };
        })
      };
    }

    function collectionRef(table) {
      return {
        doc: function(id) {
          return {
            id: id,
            set: function(data) {
              var row = Object.assign({}, data, {
                id: id
              });
              // Bọc bằng Promise.resolve() để đảm bảo LUÔN trả về Promise
              // chuẩn (có .then/.catch) — không phụ thuộc vào việc thư viện
              // supabase-js (tải qua CDN không ghim phiên bản) trả về đúng
              // kiểu thenable nào ở từng bản cập nhật.
              return Promise.resolve(sb.from(table).upsert(row));
            },
            delete: function() {
              return Promise.resolve(sb.from(table).delete().eq('id', id));
            }
          };
        },
        get: function() {
          return sb.from(table).select('*').then(function(res) {
            if (res.error) throw res.error;
            return makeSnapshot(res.data);
          });
        },
        onSnapshot: function(onNext, onError) {
          function reload() {
            sb.from(table).select('*').then(function(res) {
              if (res.error) {
                if (onError) onError(res.error);
                // Tự thử lại sau 3 giây nếu gặp lỗi tạm thời, thay vì để
                // trạng thái kẹt mãi ở "Đang kết nối..." vô thời hạn.
                setTimeout(reload, 3000);
                return;
              }
              onNext(makeSnapshot(res.data));
            }).catch(function(err) {
              // QUAN TRỌNG: trước đây thiếu .catch() ở đây — nếu request gặp
              // lỗi mạng thực sự (không phải lỗi Supabase trả về, mà là
              // promise bị reject, ví dụ mất mạng tạm thời lúc tải trang lần
              // đầu), lỗi sẽ bị "nuốt" âm thầm và trạng thái kẹt vĩnh viễn ở
              // "Đang kết nối..." dù các thao tác khác (lưu/xóa) vẫn hoạt
              // động bình thường qua đường gọi API riêng của chúng.
              if (onError) onError(err);
              setTimeout(reload, 3000);
            });
          }
          reload();
          var channel = sb.channel('rt-' + table).on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: table
          }, reload).subscribe();
          return function() {
            sb.removeChannel(channel);
          };
        }
      };
    }
    return {
      collection: collectionRef,
      enablePersistence: function() {
        return {
          catch: function() {
            return Promise.resolve();
          }
        };
      },
      batch: function() {
        var ops = [];
        return {
          set: function(docRef, data) {
            ops.push({
              type: 'set',
              docRef: docRef,
              data: data
            });
          },
          delete: function(docRef) {
            ops.push({
              type: 'delete',
              docRef: docRef
            });
          },
          commit: function() {
            return Promise.all(ops.map(function(op) {
              return op.type === 'set' ? op.docRef.set(op.data) : op.docRef.delete();
            }));
          }
        };
      }
    };
  }

  function _0x5aab46() {
    const _0x414841 = _0x12fda4;
    if (!_0x313817) {
      _0x18665f('', 'Chưa\x20cấu\x20hình\x20Supabase\x20(lưu\x20trên\x20trình\x20duyệt)'), _0x42ceb7(), _0x20ff35();
      return;
    }
    try {
      _0x2405e1 = __vinh_createSupabaseFirestoreShim(supabase.createClient(_0x51cd58['url'], _0x51cd58['anonKey'])), _0x2405e1["enablePersistence"]({
        'synchronizeTabs': !![]
      })['catch'](() => {}), _0x18665f("syncing", "Đang kết nối..."), _0x2405e1["collection"]("content")["onSnapshot"](_0x51f7b6 => {
        const _0x6d2e95 = _0x414841;
        const __serverListRaw = _0x51f7b6["docs"]['map'](_0x5cdcea => _0x39d4c8(Object["assign"]({}, _0x5cdcea["data"](), {
          'id': _0x5cdcea['id']
        })));
        // Loại bỏ khỏi kết quả server bất kỳ ID nào đang trong quá trình xóa
        // (xem _0xPendingDeletes ở _0x5387a6) để tránh bị "hồi sinh" do race
        // condition giữa lệnh xóa và sự kiện đồng bộ real-time đến trước khi
        // lệnh xóa lên Supabase thực sự hoàn tất.
        const __serverList = __serverListRaw.filter(function(x) {
          return !(x && x.id && _0xPendingDeletes.has(x.id));
        });
        // QUAN TRỌNG: Supabase LUÔN là nguồn dữ liệu duy nhất và chính xác
        // nhất — không còn giữ lại bất kỳ item "chưa đồng bộ" nào từ bộ nhớ
        // cục bộ nữa. Cơ chế "giữ lại tạm thời" trước đây chính là nguyên
        // nhân gây ra tình trạng dữ liệu đã xóa liên tục hồi sinh: một tab cũ
        // còn mở sẽ giữ mãi bản sao cục bộ và tự động đẩy lại lên server sau
        // mỗi vài chục giây, bất kể người khác đã xóa bao nhiêu lần.
        _0x2fc8d0 = __serverList, localStorage["setItem"](_0x1d8095, JSON['stringify'](_0x2fc8d0)), _0x42ceb7(), _0x20ff35(), _0x18665f('ok', "Đã đồng bộ (real-time)");
      }, _0x55a9e7 => {
        const _0xcb8721 = _0x414841;
        _0x18665f("error", "Lỗi Supabase: " + _0x55a9e7["message"]);
      });
    } catch (_0xf9f08d) {
      _0x18665f("error", "Không khởi tạo được Supabase"), _0x42ceb7(), _0x20ff35();
    }
  }

  function _0xe449dc() {
    const _0x168aae = _0x12fda4;
    return 'c_' + Date["now"]()["toString"](0x24) + Math['random']()["toString"](0x24)["slice"](0x2, 0x8);
  }

  function _0x294d34(_0x131e4c, _0x2a13bb, _0x5d8add) {
    const _0x469449 = _0x12fda4;
    _0x131e4c["innerHTML"] = '', _0x2a13bb["forEach"](_0xffa000 => {
      const _0x21782c = _0x469449,
        _0x489a2a = document["createElement"]('option');
      _0x489a2a["value"] = _0xffa000, _0x489a2a['textContent'] = _0xffa000, _0x5d8add && _0x5d8add[_0xffa000] && (_0x489a2a["style"]['background'] = _0x5d8add[_0xffa000]['bg'], _0x489a2a["style"]['color'] = _0x5d8add[_0xffa000]['color']), _0x131e4c["appendChild"](_0x489a2a);
    });
  }
  const _0x1d36e2 = document["getElementById"]("fStatus");
  _0x294d34(_0x1d36e2, _0x204bfd, _0x50a568);
  const _0x4de8c7 = document["getElementById"]("fPillar");
  _0x294d34(_0x4de8c7, _0x1baf87, _0x46dba2);
  const _0x12ce8d = document['getElementById']("fProduct");
  _0x294d34(_0x12ce8d, _0x3a7ff0, _0x26483e);
  const _0x4dce10 = document["getElementById"]("fBrand");
  _0x294d34(_0x4dce10, _0x5bb905, _0x3090ac);
  const _0x2c6ef3 = document["getElementById"]("fFormat");
  _0x294d34(_0x2c6ef3, _0x2a7762, _0x4637b3);
  const _0x47af22 = document["getElementById"]('fWeek');
  _0x294d34(_0x47af22, _0x2b97dc);
  const _0x4b4191 = document["getElementById"]("channelChecks");
  _0xb5b91a["forEach"](_0x2093b7 => {
    const _0xca23f4 = _0x12fda4,
      _0x3071dd = document['createElement']("label");
    _0x3071dd["innerHTML"] = "<input type=\"checkbox\" value=\"" + _0x2093b7 + '\x22>\x20' + _0x2093b7, _0x4b4191["appendChild"](_0x3071dd);
  });
  const _0x3c249 = document["getElementById"]('filterPillar'),
    _0x476524 = document['getElementById']("filterChannel"),
    _0x504d15 = document['getElementById']("filterBrand"),
    _0x2e289d = document["getElementById"]("filterMonth"),
    _0x5058e4 = document['getElementById']("filterStatus");
  _0x476524["innerHTML"] = "<option value=\"\">Tất cả Kênh</option>" + _0xb5b91a["map"](_0x274489 => "<option value=\"" + _0x274489 + '\x22>' + _0x274489 + "</option>")["join"](''), _0x3c249["innerHTML"] = "<option value=\"\">Tất cả Pillar</option>" + _0x1baf87['map'](_0x2509d1 => "<option value=\"" + _0x2509d1 + '\x22>' + _0x2509d1 + '</option>')["join"](''), _0x504d15["innerHTML"] = "<option value=\"\">Tất cả Thương hiệu</option>" + _0x5bb905["map"](_0x125ba2 => '<option\x20value=\x22' + _0x125ba2 + '\x22>' + _0x125ba2 + "</option>")["join"](''), _0x5058e4["innerHTML"] = '<option\x20value=\x22\x22>Tất\x20cả\x20Trạng\x20thái</option>' + _0x204bfd["map"](_0x26f9b2 => "<option value=\"" + _0x26f9b2 + '\x22>' + _0x26f9b2 + '</option>')['join']('');
  const _0xbf5673 = ["Tháng 1", "Tháng 2", "Tháng 3", 'Tháng\x204', "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", 'Tháng\x2011', "Tháng 12"];
  // ===== Cải thiện UI/UX: khay bộ lọc ẩn/hiện =====
  const __toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
  const __filtersPanel = document.getElementById('filtersPanel');
  if (__toggleFiltersBtn && __filtersPanel) {
    __toggleFiltersBtn.addEventListener('click', function() {
      __filtersPanel.classList.toggle('hidden-section');
      __toggleFiltersBtn.classList.toggle('active');
    });
  }

  function _0x401a0a() {}

  function _0x23d1f2() {
    const _0x471e97 = _0x12fda4,
      _0x150c20 = [...new Set(_0x2fc8d0["map"](_0xcac253 => _0xcac253['date'] && _0xcac253["date"]['length'] >= 0x7 ? _0xcac253["date"]["slice"](0x0, 0x7) : null)["filter"](Boolean))];
    _0x150c20["sort"]((_0x4c7473, _0x426745) => _0x4c7473 < _0x426745 ? 0x1 : -0x1);
    const _0x823cc0 = _0x2e289d["value"];
    _0x2e289d['innerHTML'] = "<option value=\"\">Tất cả tháng</option>" + _0x150c20["map"](_0x252a40 => {
      const _0x333be9 = _0x471e97,
        [_0x471c5d, _0x5e673d] = _0x252a40["split"]('-'),
        _0x23e18f = _0xbf5673[parseInt(_0x5e673d, 0xa) - 0x1] + '/' + _0x471c5d;
      return "<option value=\"" + _0x252a40 + '\x22>' + _0x23e18f + "</option>";
    })["join"]('');
    if (_0x150c20["includes"](_0x823cc0)) _0x2e289d['value'] = _0x823cc0;
  }
  const _0x329366 = document["getElementById"]('board');

  function _0x367fc5(_0x22f380) {
    const _0x2fde52 = _0x12fda4;
    if (!_0x22f380) return '?';
    return _0x22f380["trim"]()["split"](/\s+/)["map"](_0x2f83ad => _0x2f83ad[0x0])['slice'](-0x2)["join"]('')["toUpperCase"]();
  }

  function _0x3eeaea(_0x256855) {
    const _0x5cf916 = _0x12fda4;
    return String(_0x256855)["normalize"]('NFD')["replace"](/[\u0300-\u036f]/g, '')['replace'](/đ/g, 'd')["replace"](/Đ/g, 'D');
  }

  function _0xfe5760(_0x941dc3) {
    const _0x1f92f2 = _0x12fda4;
    return [_0x941dc3['content'], _0x941dc3["week"], _0x941dc3["assignee"], _0x941dc3["cta"], _0x941dc3["pillar"], _0x941dc3["brand"], _0x941dc3["product"], _0x941dc3["format"], _0x941dc3["status"], (_0x941dc3["channels"] || [])['join']('\x20')]["filter"](Boolean)["join"]('\x20');
  }

  function _0xe34bb0(_0x4d6a44) {
    const _0x4398ae = _0x12fda4,
      _0x3ae8ff = document["getElementById"]("searchBox")['value']["trim"](),
      _0x33e4cc = _0x3ae8ff ? _0x3eeaea(_0x3ae8ff)['toLowerCase']() : '',
      _0x1b2ec3 = _0x3c249["value"],
      _0x2d04a3 = _0x476524["value"],
      _0x41ca09 = _0x504d15["value"],
      _0x85f853 = _0x2e289d["value"],
      _0x24786d = _0x5058e4["value"];
    if (_0x33e4cc && !_0x3eeaea(_0xfe5760(_0x4d6a44))["toLowerCase"]()['includes'](_0x33e4cc)) return ![];
    if (_0x1b2ec3 && _0x4d6a44["pillar"] !== _0x1b2ec3) return ![];
    if (_0x2d04a3 && !(_0x4d6a44["channels"] || [])['includes'](_0x2d04a3)) return ![];
    if (_0x41ca09 && _0x4d6a44["brand"] !== _0x41ca09) return ![];
    if (_0x85f853 && !(_0x4d6a44['date'] && _0x4d6a44["date"]['startsWith'](_0x85f853))) return ![];
    if (_0x24786d && _0x4d6a44["status"] !== _0x24786d) return ![];
    return !![];
  }
  const _0x1157ab = document['getElementById']("gridCount");
  let _0x4ec9be = new Set(),
    _0x4bd293 = new Set(),
    _0xdc3c52 = new Set(),
    _0x4e1120 = new Set(),
    _0xebb50a = new Set(),
    _0x450e27 = new Set();

  function _0x5e77d5(_0x198d38, _0x33fd80, _0x736f10, _0x24ef23) {
    const _0x3090ff = _0x12fda4;
    if (!_0x33fd80['has'](_0x198d38)) {
      _0x33fd80["add"](_0x198d38);
      if (_0x24ef23) _0x736f10['add'](_0x198d38);
    }
  }

  function _0x5774bc(_0x49024b) {
    const _0xff84d8 = _0x12fda4,
      [_0x51c5d3, _0x45effd] = _0x49024b["split"]('-');
    return _0xbf5673[parseInt(_0x45effd, 0xa) - 0x1] + '/' + _0x51c5d3;
  }

  function _0x3a2499(_0x5eee23) {
    if (!_0x5eee23) return 0x270f;
    const _0x8aa0bd = String(_0x5eee23)['match'](/(\d+)/);
    return _0x8aa0bd ? parseInt(_0x8aa0bd[0x1], 0xa) : 0x270e;
  }

  function _0x5be2ee(_0x971b31) {
    const _0x35d486 = _0x12fda4,
      _0x113772 = new Map();
    return _0x971b31["forEach"](_0xf618c0 => {
      const _0xd3beff = _0x35d486,
        _0x555005 = _0xf618c0["week"] || '(Chưa\x20gắn\x20tuần)';
      if (!_0x113772["has"](_0x555005)) _0x113772["set"](_0x555005, []);
      _0x113772['get'](_0x555005)["push"](_0xf618c0);
    }), [..._0x113772["entries"]()]["sort"]((_0x11c83a, _0x10c449) => _0x3a2499(_0x11c83a[0x0]) - _0x3a2499(_0x10c449[0x0]));
  }

  function _0x23dc80(_0xd3524, _0x399d7e, _0x51c541, _0x190a3e) {
    const _0x15d9d0 = _0x12fda4,
      _0x30b0e2 = document["createElement"]("div");
    return _0x30b0e2['className'] = "acc-bar " + _0xd3524, _0x30b0e2["innerHTML"] = '<span>' + _0x399d7e + "</span><span class=\"acc-right\">" + _0x51c541 + " content <span class=\"acc-caret\">" + (_0x190a3e ? "▲ Thu gọn" : "▼ Xem") + "</span></span>", _0x30b0e2;
  }

  function _0x304729(_0x27dc26, _0x1e3f27, _0x1f8779, _0x420fc8) {
    const _0x5ebfa4 = document['createDocumentFragment']();
    return _0x5be2ee(_0x1e3f27)['forEach'](([_0x286b3d, _0x233829]) => {
      const _0x43d063 = null,
        _0x446784 = _0x27dc26 + '::' + _0x286b3d;
      _0x5e77d5(_0x446784, _0x450e27, _0xdc3c52, _0x1f8779);
      const _0x92658 = _0x420fc8 || _0xdc3c52['has'](_0x446784),
        _0x36f3b2 = document["createElement"]("div");
      _0x36f3b2["className"] = "week-block";
      const _0x3100bc = _0x23dc80("level-week", _0x5cc9d3(_0x286b3d), _0x233829['length'], _0x92658);
      _0x3100bc["addEventListener"]("click", () => {
        const _0x259b76 = _0x43d063;
        if (_0xdc3c52["has"](_0x446784)) _0xdc3c52['delete'](_0x446784);
        else _0xdc3c52["add"](_0x446784);
        _0x20ff35();
      });
      const _0x39a29f = document["createElement"]("div");
      _0x39a29f["className"] = "acc-body level-week-body" + (_0x92658 ? " open" : '');
      const _0x4ddeee = document["createElement"]("div");
      _0x4ddeee["className"] = "content-grid", _0x233829["slice"]()["sort"]((_0x4356d1, _0x2f3df3) => (_0x2f3df3["date"] || '')["localeCompare"](_0x4356d1["date"] || ''))["forEach"](_0x34da48 => _0x4ddeee["appendChild"](_0x4a8704(_0x34da48))), _0x39a29f["appendChild"](_0x4ddeee), _0x36f3b2['appendChild'](_0x3100bc), _0x36f3b2["appendChild"](_0x39a29f), _0x5ebfa4['appendChild'](_0x36f3b2);
    }), _0x5ebfa4;
  }

  function _0x1a5e87(_0x407996, _0x7f1579, _0x4ddbe7) {
    const _0x2c5af8 = _0x12fda4,
      _0x49eb1e = document["createDocumentFragment"](),
      _0x48096e = [..._0x407996["keys"]()]["sort"]((_0x5166d2, _0x2614c6) => _0x2614c6["localeCompare"](_0x5166d2));
    return _0x48096e["forEach"](_0x571a8c => {
      const _0x4a0d54 = _0x2c5af8,
        _0x2b93a2 = _0x407996["get"](_0x571a8c);
      _0x5e77d5(_0x571a8c, _0xebb50a, _0x4bd293, _0x571a8c >= _0x7f1579);
      const _0x25588d = _0x4ddbe7 || _0x4bd293["has"](_0x571a8c),
        _0xf54100 = _0x571a8c === _0x7f1579,
        _0x4ef1cb = document['createElement']('div');
      _0x4ef1cb["className"] = 'month-block';
      const _0x5f27ec = _0xf54100 ? "<span class=\"acc-current-tag\">· Tháng này</span>" : _0x571a8c < _0x7f1579 ? "<span class=\"acc-muted-tag\"> — đã kết thúc</span>" : '',
        _0x7812a9 = _0x23dc80('level-month', '' + _0x5774bc(_0x571a8c) + _0x5f27ec, _0x2b93a2["length"], _0x25588d);
      _0x7812a9["addEventListener"]('click', () => {
        const _0x5208c7 = _0x4a0d54;
        if (_0x4bd293["has"](_0x571a8c)) _0x4bd293["delete"](_0x571a8c);
        else _0x4bd293["add"](_0x571a8c);
        _0x20ff35();
      });
      const _0x3fb1ec = document["createElement"]('div');
      _0x3fb1ec["className"] = 'acc-body\x20level-month-body' + (_0x25588d ? " open" : ''), _0x3fb1ec["appendChild"](_0x304729(_0x571a8c, _0x2b93a2, ![], _0x4ddbe7)), _0x4ef1cb["appendChild"](_0x7812a9), _0x4ef1cb['appendChild'](_0x3fb1ec), _0x49eb1e["appendChild"](_0x4ef1cb);
    }), _0x49eb1e;
  }

  function _0x20ff35() {
    const _0x732493 = _0x12fda4;
    _0x401a0a(), _0x23d1f2(), _0x329366["innerHTML"] = '';
    const _0x27f545 = _0x2fc8d0['filter'](_0xe34bb0);
    _0x1157ab["textContent"] = _0x27f545["length"] + " content";
    if (_0x27f545["length"] === 0x0) {
      _0x329366["innerHTML"] = "<div class=\"empty-state\">Chưa có content nào phù hợp với bộ lọc hiện tại.</div>";
      return;
    }
    const _0xa7f6f4 = document["getElementById"]("searchBox")["value"]['trim']() !== '',
      _0x52f3e7 = _0xa7f6f4 || _0x3c249["value"] || _0x476524["value"] || _0x504d15["value"] || _0x2e289d["value"] || _0x5058e4["value"],
      _0x5c3232 = new Date(),
      _0x4e1044 = String(_0x5c3232["getFullYear"]()),
      _0x1515d5 = _0x4e1044 + '-' + String(_0x5c3232["getMonth"]() + 0x1)["padStart"](0x2, '0'),
      _0x23e4e0 = [],
      _0x31166e = new Map();
    _0x27f545["forEach"](_0x15b045 => {
      const _0x5bab05 = _0x732493;
      if (!_0x15b045['date'] || _0x15b045['date']["length"] < 0x7) {
        _0x23e4e0['push'](_0x15b045);
        return;
      }
      const _0x55d9f0 = _0x15b045["date"]["slice"](0x0, 0x4),
        _0x4f1f16 = _0x15b045["date"]["slice"](0x0, 0x7);
      if (!_0x31166e['has'](_0x55d9f0)) _0x31166e["set"](_0x55d9f0, new Map());
      const _0x43a626 = _0x31166e["get"](_0x55d9f0);
      if (!_0x43a626["has"](_0x4f1f16)) _0x43a626["set"](_0x4f1f16, []);
      _0x43a626["get"](_0x4f1f16)["push"](_0x15b045);
    });
    if (_0x23e4e0['length']) {
      const _0x1f9c3d = document["createElement"]("div");
      _0x1f9c3d["className"] = "year-block", _0x1f9c3d["innerHTML"] = "<div class=\"month-header\"><span>Chưa có ngày đăng</span><span>" + _0x23e4e0["length"] + " content</span></div>", _0x1f9c3d["appendChild"](_0x304729("nodate", _0x23e4e0, !![], _0x52f3e7)), _0x329366['appendChild'](_0x1f9c3d);
    }
    const _0x108032 = [..._0x31166e["keys"]()]['sort']((_0x13d26d, _0x29d86a) => _0x29d86a["localeCompare"](_0x13d26d));
    _0x108032["forEach"](_0x4aad29 => {
      const _0x290e7d = _0x732493,
        _0x3c4a51 = _0x31166e["get"](_0x4aad29),
        _0x36236f = [..._0x3c4a51["values"]()]['reduce']((_0x72768, _0x3e5c03) => _0x72768 + _0x3e5c03["length"], 0x0);
      _0x5e77d5(_0x4aad29, _0x4e1120, _0x4ec9be, _0x4aad29 === _0x4e1044);
      const _0x49d028 = _0x52f3e7 || _0x4ec9be["has"](_0x4aad29),
        _0x2eadf4 = document["createElement"]("div");
      _0x2eadf4["className"] = "year-block";
      const _0x47dc47 = _0x4aad29 === _0x4e1044 ? "<span class=\"acc-current-tag\">· Năm nay</span>" : '',
        _0x4f48f7 = _0x23dc80("level-year", "Năm " + _0x4aad29 + _0x47dc47, _0x36236f, _0x49d028);
      _0x4f48f7["addEventListener"]('click', () => {
        const _0x43cb93 = _0x290e7d;
        if (_0x4ec9be["has"](_0x4aad29)) _0x4ec9be["delete"](_0x4aad29);
        else _0x4ec9be["add"](_0x4aad29);
        _0x20ff35();
      });
      const _0x2095e7 = document["createElement"]("div");
      _0x2095e7['className'] = "acc-body level-year-body" + (_0x49d028 ? '\x20open' : ''), _0x2095e7["appendChild"](_0x1a5e87(_0x3c4a51, _0x1515d5, _0x52f3e7)), _0x2eadf4["appendChild"](_0x4f48f7), _0x2eadf4["appendChild"](_0x2095e7), _0x329366['appendChild'](_0x2eadf4);
    });
  }

  const __CHANNEL_ICON_MAP = {
    'Facebook': '📘', 'TikTok': '🎵', 'Instagram': '📸', 'Threads': '🧵',
    'YouTube': '▶️', 'Website': '🌐', 'Zalo': '💬'
  };

  function _0x4a8704(_0xb066f0) {
    const _0x14bf33 = _0x12fda4,
      _0x91d828 = document["createElement"]("div");
    _0x91d828['className'] = "card" + ((_0xb066f0["status"] === 'Chờ xuất bản' || _0xb066f0["status"] === 'Xuất bản') ? " card-approved" : '') + (_0xb066f0['feedback'] && _0xb066f0["status"] === 'Đang thực hiện' ? ' card-has-feedback' : '') + (_0xb066f0["status"] === 'Đang xem xét' ? ' card-needs-approval' : ''), _0x91d828["dataset"]['id'] = _0xb066f0['id'];
    const _0x4c057f = _0xb066f0["date"] ? _0x2e9f76(_0xb066f0['date']) : '',
      _0x599a8e = [],
      __secondaryBadges = [];
    if (_0xb066f0["status"]) {
      const _0x1f0c2d = _0x50a568[_0xb066f0["status"]],
        _0x383872 = _0x1f0c2d ? "background:" + _0x1f0c2d['bg'] + ';color:' + _0x1f0c2d["color"] + ';' : '';
      _0x599a8e['push']("<span class=\"badge\" style=\"" + _0x383872 + '\x22>' + _0x5cc9d3(_0xb066f0["status"]) + "</span>");
    }
    if (_0xb066f0["brand"]) {
      const _0x99977 = _0x3090ac[_0xb066f0["brand"]],
        _0xe26ea8 = _0x99977 ? "background:" + _0x99977['bg'] + ";color:" + _0x99977['color'] + ';' : '';
      __secondaryBadges['push']("<span class=\"badge\" style=\"" + _0xe26ea8 + '\x22>' + _0x5cc9d3(_0xb066f0['brand']) + "</span>");
    }
    if (_0xb066f0["format"]) {
      const _0x242168 = _0x4637b3[_0xb066f0["format"]],
        _0x3f4ccc = _0x242168 ? "background:" + _0x242168['bg'] + ";color:" + _0x242168['color'] + ';' : '';
      __secondaryBadges["push"]("<span class=\"badge\" style=\"" + _0x3f4ccc + '\x22>' + _0x5cc9d3(_0xb066f0['format']) + "</span>");
    }
    if (_0xb066f0['pillar']) {
      const _0x1b5cac = _0x46dba2[_0xb066f0["pillar"]],
        _0x238e6f = _0x1b5cac ? "background:" + _0x1b5cac['bg'] + ';color:' + _0x1b5cac["color"] + ';' : '';
      __secondaryBadges["push"]("<span class=\"badge badge-pillar\" style=\"" + _0x238e6f + '\x22>' + _0x5cc9d3(_0xb066f0['pillar']) + "</span>");
    }
    if (_0xb066f0["product"]) {
      const _0x1301ed = _0x26483e[_0xb066f0["product"]],
        _0x2822c5 = _0x1301ed ? "background:" + _0x1301ed['bg'] + ";color:" + _0x1301ed["color"] + ';' : '';
      __secondaryBadges["push"]('<span\x20class=\x22badge\x20badge-product\x22\x20style=\x22' + _0x2822c5 + '\x22>' + _0x5cc9d3(_0xb066f0["product"]) + "</span>");
    }
    if (_0xb066f0["cta"]) __secondaryBadges["push"]("<span class=\"badge badge-cta\">" + _0x5cc9d3(_0xb066f0["cta"]) + "</span>");
    const __channelIconsHtml = (_0xb066f0["channels"] || []).map(function(ch) {
      var icon = __CHANNEL_ICON_MAP[ch] || '📡';
      return '<span class="channel-icon-pill"><span class="ci-emoji">' + icon + '</span>' + _0x5cc9d3(ch) + '</span>';
    }).join('');
    _0x91d828["innerHTML"] = "\n      " + (_0xb066f0["thumb"] ? '<img\x20class=\x22card-thumb\x22\x20src=\x22' + _0x58e44e(_0xb066f0["thumb"]) + "\" onerror=\"this.style.display='none'\">" : '') + '\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22card-meta-top\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span>' + _0x5cc9d3(_0xb066f0["week"] || '') + "</span>\n        <span>" + _0x4c057f + "</span>\n      </div>\n      <div class=\"card-title\">" + _0x5cc9d3(_0xb066f0["content"] || "(Chưa có nội dung)") + '</div>\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22badges\x22>' + _0x599a8e["join"]('') + "</div>" + (__channelIconsHtml ? '<div class="channel-icons">' + __channelIconsHtml + '</div>' : '') + (__secondaryBadges.length ? '<div class="badges-secondary">' + __secondaryBadges.join('') + '</div>' : '') + "\n      <div class=\"card-footer\">\n        <span class=\"assignee\">" + (_0xb066f0['assignee'] ? '<span\x20class=\x22avatar\x22>' + _0x367fc5(_0xb066f0["assignee"]) + "</span>" + _0x5cc9d3(_0xb066f0["assignee"]) : '') + "</span>\n        <span class=\"footer-right\">\n          " + (_0xb066f0["link"] ? '<a\x20href=\x22' + _0x58e44e(_0xb066f0["link"]) + '\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x22\x20onclick=\x22event.stopPropagation()\x22>Xem\x20bài\x20↗</a>' : _0xb066f0["deadline"] ? '<span>Hạn:\x20' + _0x2e9f76(_0xb066f0["deadline"]) + '</span>' : '') + "\n          <button type=\"button\" class=\"card-delete-btn\" title=\"Xóa content\">🗑</button>\n        </span>\n      </div>\n    ";
    _0x91d828["addEventListener"]("click", () => _0xaead22(_0xb066f0['id']));
    _0x91d828["querySelector"](".card-delete-btn")["addEventListener"]("click", _0x598222 => {
      const _0x361bc9 = _0x14bf33;
      _0x598222["stopPropagation"](), _0x5135da(_0xb066f0['id']);
    });
    return _0x91d828;
  }

  function _0x2e9f76(_0x28f1ca) {
    const _0x43b015 = _0x12fda4;
    if (!_0x28f1ca) return '';
    const [_0xdf2e3d, _0x28f5bd, _0x430ad1] = _0x28f1ca["split"]('-');
    if (!_0x430ad1) return _0x28f1ca;
    return _0x430ad1 + '/' + _0x28f5bd;
  }

  function _0x5cc9d3(_0xa17931) {
    const _0x324928 = _0x12fda4;
    return String(_0xa17931)["replace"](/[&<>"']/g, _0x3e5981 => ({
      '&': '&amp;',
      '<': "&lt;",
      '>': "&gt;",
      '\x22': "&quot;",
      '\x27': "&#39;"
    } [_0x3e5981]));
  }

  function _0x58e44e(_0x54b4d6) {
    return _0x5cc9d3(_0x54b4d6);
  }

  function _0xa229ae(_0x1247a8) {
    const _0x2f9940 = _0x12fda4;
    if (!_0x1247a8) return '';
    const [_0x2b299a, _0x3029e6, _0x16dde9] = _0x1247a8["split"]('-');
    if (!_0x16dde9) return '';
    return _0x16dde9 + '/' + _0x3029e6 + '/' + _0x2b299a;
  }

  function _0x36f0ef(_0x2000e5) {
    const _0x50d88b = _0x12fda4,
      _0x417b23 = (_0x2000e5 || '')['trim']();
    if (!_0x417b23) return '';
    const _0x1e33c3 = _0x417b23["match"](/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!_0x1e33c3) return null;
    const _0x443524 = parseInt(_0x1e33c3[0x1], 0xa),
      _0x5bd907 = parseInt(_0x1e33c3[0x2], 0xa),
      _0x299e8d = parseInt(_0x1e33c3[0x3], 0xa),
      _0x1b33f7 = new Date(_0x299e8d, _0x5bd907 - 0x1, _0x443524);
    if (_0x1b33f7["getFullYear"]() !== _0x299e8d || _0x1b33f7['getMonth']() !== _0x5bd907 - 0x1 || _0x1b33f7["getDate"]() !== _0x443524) return null;
    return _0x299e8d + '-' + String(_0x5bd907)["padStart"](0x2, '0') + '-' + String(_0x443524)["padStart"](0x2, '0');
  }

  function _0x3a6892(_0x5c0084) {
    const _0x3c7ebb = _0x12fda4;
    _0x5c0084["addEventListener"]("input", () => {
      const _0x1092fc = _0x3c7ebb,
        _0x700d9f = _0x5c0084["value"]["replace"](/\D/g, '')['slice'](0x0, 0x8);
      let _0x1c8d2a = _0x700d9f;
      if (_0x700d9f['length'] > 0x4) _0x1c8d2a = _0x700d9f["slice"](0x0, 0x2) + '/' + _0x700d9f["slice"](0x2, 0x4) + '/' + _0x700d9f['slice'](0x4);
      else {
        if (_0x700d9f["length"] > 0x2) _0x1c8d2a = _0x700d9f["slice"](0x0, 0x2) + '/' + _0x700d9f["slice"](0x2);
      }
      _0x5c0084["value"] = _0x1c8d2a;
    });
  }
  _0x3a6892(document["getElementById"]('fDate')), _0x3a6892(document['getElementById']("fDeadline"));
  const _0x1e5f57 = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  function _0xf40392(_0x5ec9a7) {
    const _0x2f0973 = _0x12fda4,
      _0x2ea2c1 = document["createElement"]('div');
    _0x2ea2c1["className"] = 'date-field-wrap', _0x5ec9a7['parentNode']["insertBefore"](_0x2ea2c1, _0x5ec9a7), _0x2ea2c1["appendChild"](_0x5ec9a7);
    const _0x555b75 = document["createElement"]("button");
    _0x555b75["type"] = "button", _0x555b75["className"] = "date-cal-btn", _0x555b75["title"] = 'Chọn\x20ngày', _0x555b75["textContent"] = '📅', _0x2ea2c1["appendChild"](_0x555b75);
    const _0x4e7a78 = document["createElement"]('div');
    _0x4e7a78["className"] = 'date-picker-pop', _0x2ea2c1["appendChild"](_0x4e7a78);
    let _0x950d6b, _0x122854;

    function _0x14ed6e() {
      const _0x2b3024 = _0x2f0973,
        _0x308f62 = _0x36f0ef(_0x5ec9a7["value"]);
      return _0x308f62 || null;
    }

    function _0x3c75ed(_0x39142f, _0x24c403, _0x1ef014) {
      const _0x35de4b = _0x2f0973;
      _0x5ec9a7['value'] = String(_0x1ef014)['padStart'](0x2, '0') + '/' + String(_0x24c403 + 0x1)["padStart"](0x2, '0') + '/' + _0x39142f, _0x5ec9a7["dispatchEvent"](new Event("input", {
        'bubbles': !![]
      }));
    }

    function _0x3d4d9b() {
      const _0x234b9c = _0x2f0973,
        _0x404e3b = _0x14ed6e(),
        _0x120880 = new Date(),
        _0x355009 = _0x120880['getFullYear']() + '-' + String(_0x120880["getMonth"]() + 0x1)["padStart"](0x2, '0') + '-' + String(_0x120880["getDate"]())["padStart"](0x2, '0'),
        _0x3ba3b2 = new Date(_0x950d6b, _0x122854, 0x1),
        _0x23a6dc = (_0x3ba3b2['getDay']() + 0x6) % 0x7,
        _0xbb19cc = new Date(_0x950d6b, _0x122854 + 0x1, 0x0)["getDate"](),
        _0xa80108 = new Date(_0x950d6b, _0x122854, 0x0)["getDate"]();
      let _0x4fa52c = '';
      for (let _0x1e698b = _0x23a6dc; _0x1e698b > 0x0; _0x1e698b--) {
        const _0x11b180 = _0xa80108 - _0x1e698b + 0x1,
          _0x114d46 = _0x122854 === 0x0 ? _0x950d6b - 0x1 : _0x950d6b,
          _0x569835 = _0x122854 === 0x0 ? 0xb : _0x122854 - 0x1;
        _0x4fa52c += "<span class=\"dp-day dp-muted\" data-y=\"" + _0x114d46 + "\" data-m=\"" + _0x569835 + "\" data-d=\"" + _0x11b180 + '\x22>' + _0x11b180 + "</span>";
      }
      for (let _0xefc567 = 0x1; _0xefc567 <= _0xbb19cc; _0xefc567++) {
        const _0x4f2320 = _0x950d6b + '-' + String(_0x122854 + 0x1)["padStart"](0x2, '0') + '-' + String(_0xefc567)["padStart"](0x2, '0');
        let _0x429863 = "dp-day";
        if (_0x4f2320 === _0x404e3b) _0x429863 += " dp-selected";
        if (_0x4f2320 === _0x355009) _0x429863 += " dp-today";
        _0x4fa52c += "<span class=\"" + _0x429863 + "\" data-y=\"" + _0x950d6b + '\x22\x20data-m=\x22' + _0x122854 + "\" data-d=\"" + _0xefc567 + '\x22>' + _0xefc567 + "</span>";
      }
      const _0x4a7f3f = (0x7 - (_0x23a6dc + _0xbb19cc) % 0x7) % 0x7;
      for (let _0x34d463 = 0x1; _0x34d463 <= _0x4a7f3f; _0x34d463++) {
        const _0x224244 = _0x122854 === 0xb ? _0x950d6b + 0x1 : _0x950d6b,
          _0x25771a = _0x122854 === 0xb ? 0x0 : _0x122854 + 0x1;
        _0x4fa52c += "<span class=\"dp-day dp-muted\" data-y=\"" + _0x224244 + "\" data-m=\"" + _0x25771a + "\" data-d=\"" + _0x34d463 + '\x22>' + _0x34d463 + "</span>";
      }
      _0x4e7a78["innerHTML"] = "\n        <div class=\"dp-header\">\n          <button type=\"button\" class=\"dp-nav\" data-dir=\"-1\">‹</button>\n          <span class=\"dp-title\">" + _0xbf5673[_0x122854] + '/' + _0x950d6b + "</span>\n          <button type=\"button\" class=\"dp-nav\" data-dir=\"1\">›</button>\n        </div>\n        <div class=\"dp-weekdays\">" + _0x1e5f57["map"](_0x5b3a23 => "<span>" + _0x5b3a23 + "</span>")['join']('') + "</div>\n        <div class=\"dp-days\">" + _0x4fa52c + "</div>\n        <div class=\"dp-footer\">\n          <button type=\"button\" class=\"dp-today-btn\">Hôm nay</button>\n          <button type=\"button\" class=\"dp-clear-btn\">Xóa</button>\n        </div>\n      ", _0x4e7a78["querySelector"](".dp-nav[data-dir=\"-1\"]")["addEventListener"]("click", _0x43d356 => {
        _0x43d356['stopPropagation'](), _0x122854--, _0x122854 < 0x0 && (_0x122854 = 0xb, _0x950d6b--), _0x3d4d9b();
      }), _0x4e7a78["querySelector"](".dp-nav[data-dir=\"1\"]")['addEventListener']("click", _0x4bdb82 => {
        const _0x3b15ff = _0x234b9c;
        _0x4bdb82["stopPropagation"](), _0x122854++, _0x122854 > 0xb && (_0x122854 = 0x0, _0x950d6b++), _0x3d4d9b();
      }), _0x4e7a78["querySelectorAll"](".dp-day")["forEach"](_0x426822 => {
        const _0x177135 = _0x234b9c;
        _0x426822["addEventListener"]('click', _0x37f5ee => {
          const _0x16b63f = _0x177135;
          _0x37f5ee['stopPropagation'](), _0x3c75ed(parseInt(_0x426822["dataset"]['y'], 0xa), parseInt(_0x426822["dataset"]['m'], 0xa), parseInt(_0x426822["dataset"]['d'], 0xa)), _0x6e0fcb();
        });
      }), _0x4e7a78['querySelector'](".dp-today-btn")["addEventListener"]('click', _0x220656 => {
        const _0x5ac91a = _0x234b9c;
        _0x220656["stopPropagation"]();
        const _0x1b1a9c = new Date();
        _0x3c75ed(_0x1b1a9c["getFullYear"](), _0x1b1a9c["getMonth"](), _0x1b1a9c['getDate']()), _0x6e0fcb();
      }), _0x4e7a78["querySelector"]('.dp-clear-btn')["addEventListener"]("click", _0x33fe8b => {
        const _0x7f21ec = _0x234b9c;
        _0x33fe8b['stopPropagation'](), _0x5ec9a7["value"] = '', _0x5ec9a7["dispatchEvent"](new Event('input', {
          'bubbles': !![]
        })), _0x6e0fcb();
      });
    }

    function _0x347a78(_0x1d80d8) {
      const _0x17ef34 = _0x2f0973;
      if (!_0x2ea2c1["contains"](_0x1d80d8['target'])) _0x6e0fcb();
    }

    function _0xc08247() {
      const _0x2a9229 = _0x2f0973,
        _0x401cdf = _0x14ed6e(),
        _0x41eb84 = _0x401cdf ? new Date(_0x401cdf + "T00:00:00") : new Date();
      _0x950d6b = _0x41eb84["getFullYear"](), _0x122854 = _0x41eb84["getMonth"](), _0x3d4d9b(), _0x4e7a78["classList"]["add"]("open"), document["addEventListener"]('click', _0x347a78);
    }

    function _0x6e0fcb() {
      const _0x2f8de1 = _0x2f0973;
      _0x4e7a78["classList"]["remove"]('open'), document["removeEventListener"]("click", _0x347a78);
    }
    _0x555b75["addEventListener"]("click", _0x19c040 => {
      const _0x5c668f = _0x2f0973;
      _0x19c040["stopPropagation"]();
      if (_0x4e7a78["classList"]["contains"]('open')) _0x6e0fcb();
      else _0xc08247();
    });
  }
  _0xf40392(document['getElementById']("fDate")), _0xf40392(document["getElementById"]("fDeadline"));
  const _0x159286 = document["getElementById"]("overlay"),
    _0x4453d4 = document["getElementById"]("cardForm"),
    _0x21d7ec = document["getElementById"]('modalTitle'),
    _0xcbd0a8 = document["getElementById"]("deleteBtn");
  let _0x145caa = null;

  function _0x14af65(_0x56c26c, _0x364e05) {
    const _0x3ad79c = _0x12fda4;
    _0x145caa = _0x56c26c, _0x4453d4['reset'](), document["querySelectorAll"]('#channelChecks\x20input')['forEach'](_0x26cdf5 => _0x26cdf5["checked"] = ![]);
    if (_0x56c26c) {
      const _0x446369 = _0x2fc8d0["find"](_0x49a1fb => _0x49a1fb['id'] === _0x56c26c);
      _0x21d7ec["textContent"] = "Sửa content", _0xcbd0a8["style"]["display"] = 'inline-flex', document["getElementById"]("cardId")["value"] = _0x446369['id'], document["getElementById"]("fWeek")["value"] = _0x446369["week"] || '', document['getElementById']('fDate')["value"] = _0xa229ae(_0x446369['date'] || ''), document["getElementById"]("fContent")["value"] = _0x446369["content"] || '', document["getElementById"]("fBrand")["value"] = _0x446369["brand"] || '', document["getElementById"]("fFormat")["value"] = _0x446369['format'] || '', document["getElementById"]('fPillar')['value'] = _0x446369['pillar'] || '', document["getElementById"]("fStatus")['value'] = _0x446369["status"] || _0x204bfd[0x0], document['getElementById']("fProduct")["value"] = _0x446369["product"] || '', document["getElementById"]('fCta')['value'] = _0x446369["cta"] || '', document["getElementById"]("fAssignee")['value'] = _0x446369['assignee'] || '', document['getElementById']("fDeadline")["value"] = _0xa229ae(_0x446369["deadline"] || ''), document['getElementById']("fLink")["value"] = _0x446369["link"] || '', document["getElementById"]("fThumb")["value"] = _0x446369["thumb"] || '', (_0x446369["channels"] || [])['forEach'](_0xc10235 => {
        const _0x195624 = _0x3ad79c,
          _0x47f5b3 = document["querySelector"]("#channelChecks input[value=\"" + _0xc10235 + '\x22]');
        if (_0x47f5b3) _0x47f5b3["checked"] = !![];
      });
    } else _0x21d7ec['textContent'] = 'Thêm\x20content\x20mới', _0xcbd0a8["style"]["display"] = "none", document["getElementById"]('cardId')['value'] = '', document["getElementById"]('fStatus')['value'] = _0x364e05 || _0x204bfd[0x0];
    // ---- Đồng bộ khung soạn thảo (dùng chung cho nội dung ngắn/dài) khi mở modal thêm/sửa ----
    (function() {
      var blogBody = document.getElementById('fBody');
      var item = _0x56c26c ? _0x2fc8d0.find(function(x) {
        return x['id'] === _0x56c26c;
      }) : null;
      if (!blogBody) return;
      if (item && item.bodyHtml) {
        blogBody.innerHTML = item.bodyHtml;
      } else if (item && item.content) {
        blogBody.innerHTML = '<p>' + _0x5cc9d3(item.content) + '</p>';
      } else {
        blogBody.innerHTML = '';
      }
    })();
    // ---- Khóa trường "Người phụ trách" / "Trạng thái" trên giao diện nếu
    // người đăng nhập là nhân viên (không phải admin) — giúp họ thấy rõ giới
    // hạn thay vì chỉ báo lỗi lúc bấm Lưu. Quyền thật sự vẫn được kiểm tra lại
    // ở submit handler và ở tầng Supabase (RLS + trigger). "Người phụ trách"
    // để TỰ DO nhập tay (không khóa) — vì nhiều người có thể dùng chung 1 tài
    // khoản để nhập content, cần tự gõ đúng tên thật của mình.
    (function() {
      var fStatusEl = document.getElementById('fStatus');
      var isStaff = _0xCurrentUser && _0xCurrentUser.role !== 'admin';
      if (fStatusEl) {
        // Không khóa cả dropdown — nhân viên được tự do chọn mọi trạng thái,
        // CHỈ vô hiệu hóa đúng 2 lựa chọn "Chờ xuất bản"/"Xuất bản" (tương
        // đương hành động duyệt bài, tuyệt đối chỉ admin mới được làm).
        Array.prototype.forEach.call(fStatusEl.options, function(opt) {
          opt.disabled = !!isStaff && (opt.value === 'Chờ xuất bản' || opt.value === 'Xuất bản');
        });
      }
    })();
    _0x159286["classList"]['add']("open");
  }

  function _0x2cd3f2() {
    const _0x101816 = _0x12fda4;
    _0x159286['classList']["remove"]('open'), _0x145caa = null;
  }
  const _0x3c5417 = document["getElementById"]("viewOverlay"),
    _0x1e5db4 = document['getElementById']('viewBody'),
    _0x313786 = document["getElementById"]("viewEditBtn"),
    _0x109761 = document['getElementById']('viewDeleteBtn'),
    _0x421ed2 = document['getElementById']("viewApproveBtn");
  let _0xacfd17 = null;

  function _0x3e9e7c(_0x23c99a, _0xa254ce, _0xd655cd) {
    const _0x51e32e = _0x12fda4;
    _0xd655cd = _0xd655cd || {};
    const _0x2ef6ae = "view-field" + (_0xd655cd["full"] ? " full" : ''),
      _0x2a44c3 = _0xa254ce ? _0xd655cd["html"] ? _0xa254ce : _0x5cc9d3(_0xa254ce) : "<span class=\"value empty\">(chưa có)</span>";
    return "<div class=\"" + _0x2ef6ae + "\"><label>" + _0x23c99a + "</label><div class=\"value\">" + _0x2a44c3 + "</div></div>";
  }

  function _0xaead22(_0x2907e3) {
    const _0xd5a9e1 = _0x12fda4,
      _0x2cf5b6 = _0x2fc8d0['find'](_0x540f98 => _0x540f98['id'] === _0x2907e3);
    if (!_0x2cf5b6) return;
    _0xacfd17 = _0x2907e3;
    const _0x2146bf = [];
    if (_0x2cf5b6["brand"]) {
      const _0x367ade = _0x3090ac[_0x2cf5b6["brand"]];
      _0x2146bf["push"]("<span class=\"badge\" style=\"background:" + (_0x367ade ? _0x367ade['bg'] : '#eee') + ';color:' + (_0x367ade ? _0x367ade["color"] : "#333") + ";\">" + _0x5cc9d3(_0x2cf5b6["brand"]) + '</span>');
    }
    if (_0x2cf5b6['format']) {
      const _0x5896e4 = _0x4637b3[_0x2cf5b6["format"]];
      _0x2146bf["push"]("<span class=\"badge\" style=\"background:" + (_0x5896e4 ? _0x5896e4['bg'] : "#eee") + ';color:' + (_0x5896e4 ? _0x5896e4["color"] : "#333") + ";\">" + _0x5cc9d3(_0x2cf5b6["format"]) + "</span>");
    }
    if (_0x2cf5b6['pillar']) {
      const _0x12baa7 = _0x46dba2[_0x2cf5b6['pillar']];
      _0x2146bf["push"]("<span class=\"badge\" style=\"background:" + (_0x12baa7 ? _0x12baa7['bg'] : "#eee") + ';color:' + (_0x12baa7 ? _0x12baa7['color'] : "#333") + ";\">" + _0x5cc9d3(_0x2cf5b6["pillar"]) + "</span>");
    }
    if (_0x2cf5b6["status"]) {
      const _0x45c28d = _0x50a568[_0x2cf5b6["status"]];
      _0x2146bf["push"]("<span class=\"badge\" style=\"background:" + (_0x45c28d ? _0x45c28d['bg'] : "#eee") + ';color:' + (_0x45c28d ? _0x45c28d["color"] : '#333') + ';\x22>' + _0x5cc9d3(_0x2cf5b6["status"]) + "</span>");
    }
    if (_0x2cf5b6['product']) {
      const _0x559efb = _0x26483e[_0x2cf5b6["product"]];
      _0x2146bf["push"]("<span class=\"badge\" style=\"background:" + (_0x559efb ? _0x559efb['bg'] : '#eee') + ";color:" + (_0x559efb ? _0x559efb["color"] : "#333") + ";\">" + _0x5cc9d3(_0x2cf5b6["product"]) + "</span>");
    }(_0x2cf5b6["channels"] || [])['forEach'](_0x53a649 => _0x2146bf["push"]('<span\x20class=\x22badge\x20badge-channel\x22>' + _0x5cc9d3(_0x53a649) + "</span>")), _0x1e5db4["innerHTML"] = '\x0a\x20\x20\x20\x20\x20\x20' + (_0x2cf5b6["thumb"] ? '<img\x20class=\x22view-thumb\x22\x20src=\x22' + _0x58e44e(_0x2cf5b6["thumb"]) + "\" onerror=\"this.style.display='none'\">" : '') + '\x0a\x20\x20\x20\x20\x20\x20<div\x20class=\x22view-meta-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span>' + _0x5cc9d3(_0x2cf5b6['week'] || '') + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<span>' + (_0x2cf5b6['date'] ? _0x2e9f76(_0x2cf5b6["date"]) : '') + "</span>\n      </div>\n      <div class=\"view-content\">" + (_0x2cf5b6['bodyHtml'] ? '<div class="view-blog-body">' + _0x2cf5b6['bodyHtml'] + '</div>' : _0x5cc9d3(_0x2cf5b6["content"] || '(Chưa\x20có\x20nội\x20dung)')) + "</div>\n      <div class=\"view-badges\">" + (_0x2146bf["join"]('') || "<span class=\"value empty\">(chưa gắn nhãn nào)</span>") + "</div>\n      <div class=\"view-details\">\n        " + _0x3e9e7c("CTA", _0x2cf5b6["cta"]) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20' + _0x3e9e7c("Người phụ trách", _0x2cf5b6["assignee"]) + "\n        " + _0x3e9e7c("Deadline", _0x2cf5b6["deadline"] ? _0x2e9f76(_0x2cf5b6["deadline"]) : '') + "\n        " + _0x3e9e7c("Link bài đăng", _0x2cf5b6['link'] ? "<a href=\"" + _0x58e44e(_0x2cf5b6["link"]) + "\" target=\"_blank\" rel=\"noopener\">" + _0x5cc9d3(_0x2cf5b6['link']) + " ↗</a>" : '', {
      'html': !![],
      'full': !![]
    }) + "\n      </div>\n    ", _0x3c5417['classList']["add"]("open");
    // ---- Luồng trạng thái & feedback (cập nhật bởi Claude) ----
    var __status = _0x2cf5b6["status"];
    var __isAdminUser = !!(_0xCurrentUser && _0xCurrentUser.role === 'admin');
    var __isLoggedIn = !!_0xCurrentUser;
    var __reviewBtn = document.getElementById('viewReviewBtn');
    var __reqChangesBtn = document.getElementById('viewRequestChangesBtn');
    // Gửi duyệt (Đang thực hiện -> Đang xem xét): bất kỳ ai đã đăng nhập, trên
    // mọi bài nháp (không giới hạn theo chủ bài).
    if (__reviewBtn) __reviewBtn.style.display = (__isLoggedIn && __status === 'Đang thực hiện') ? 'inline-flex' : 'none';
    // Yêu cầu chỉnh sửa / Phê duyệt: vẫn chỉ admin.
    if (__reqChangesBtn) __reqChangesBtn.style.display = (__isAdminUser && __status === 'Đang xem xét') ? 'inline-flex' : 'none';
    _0x421ed2["style"]["display"] = (__isAdminUser && __status === 'Đang xem xét') ? 'inline-flex' : 'none';
    var __locked = (__status === 'Xuất bản');
    // Sửa: bất kỳ ai đã đăng nhập đều sửa được mọi bài (chưa xuất bản).
    _0x313786.style.display = (!__locked && __isLoggedIn) ? 'inline-flex' : 'none';
    // Xóa: chỉ admin.
    _0x109761.style.display = (!__locked && __isAdminUser) ? 'inline-flex' : 'none';
    if (_0x2cf5b6.feedback) {
      _0x1e5db4.insertAdjacentHTML('afterbegin', '<div class="feedback-banner"><b>⚠ Admin yêu cầu chỉnh sửa:</b>' + _0x5cc9d3(_0x2cf5b6.feedback) + (_0x2cf5b6.feedbackAt ? '<span class="fb-time">Lúc: ' + _0x5cc9d3(_0x2cf5b6.feedbackAt) + '</span>' : '') + '</div>');
    }
  }

  function _0x5269c2() {
    const _0x534d88 = _0x12fda4;
    _0x3c5417["classList"]["remove"]("open"), _0xacfd17 = null;
  }
  document["getElementById"]("viewCloseBtn")["addEventListener"]("click", _0x5269c2), document['getElementById']("viewModalCloseX")["addEventListener"]("click", _0x5269c2), _0x313786["addEventListener"]("click", () => {
      if (!_0xacfd17) return;
      const __editTargetItem = _0x2fc8d0.find(x => x['id'] === _0xacfd17);
      if (!_0x5ed14e(__editTargetItem && __editTargetItem['assignee'])) return;
      const _0x203a40 = _0xacfd17;
      _0x5269c2(), _0x14af65(_0x203a40);
    }), _0x421ed2["addEventListener"]('click', async () => {
      const _0x28b4d1 = _0x12fda4;
      if (!_0xacfd17) return;
      const _0x4b3143 = _0x2fc8d0["find"](_0x15013f => _0x15013f['id'] === _0xacfd17);
      if (!_0x4b3143) return;
      if (!_0x1d1416()) return;
      _0x4b3143['status'] = "Chờ xuất bản";
      _0x4b3143['feedback'] = '';
      _0x4b3143['feedbackAt'] = '';
      _0x20ff35(), _0xaead22(_0xacfd17), await _0x2dc1ce(_0x4b3143);
    }),
    (function() {
      var reviewBtn = document.getElementById('viewReviewBtn');
      if (reviewBtn) reviewBtn.addEventListener('click', async function() {
        if (!_0xacfd17) return;
        var item = _0x2fc8d0.find(function(x) {
          return x['id'] === _0xacfd17;
        });
        if (!item) return;
        // Bất kỳ ai đã đăng nhập đều gửi duyệt được mọi bài nháp (không giới
        // hạn theo chủ bài) — đây là hành động "gửi duyệt" bình thường, không
        // phải phê duyệt.
        if (!_0xCurrentUser) {
          alert("Bạn cần đăng nhập để gửi bài đi duyệt.");
          return;
        }
        item['status'] = 'Đang xem xét';
        _0x20ff35();
        _0xaead22(_0xacfd17);
        await _0x2dc1ce(item);
      });
      var reqBtn = document.getElementById('viewRequestChangesBtn');
      if (reqBtn) reqBtn.addEventListener('click', async function() {
        if (!_0xacfd17) return;
        var item = _0x2fc8d0.find(function(x) {
          return x['id'] === _0xacfd17;
        });
        if (!item) return;
        if (!_0x1d1416()) return;
        var fb = prompt('Nhập góp ý / yêu cầu chỉnh sửa cho content planner:');
        if (fb === null) return;
        if (!fb.trim()) {
          alert('Vui lòng nhập nội dung góp ý.');
          return;
        }
        item['status'] = 'Đang thực hiện';
        item['feedback'] = fb.trim();
        item['feedbackAt'] = new Date().toLocaleString('vi-VN');
        _0x20ff35();
        _0xaead22(_0xacfd17);
        await _0x2dc1ce(item);
      });
    })(),
    _0x109761["addEventListener"]("click", () => {
      if (!_0xacfd17) return;
      const _0x115d98 = _0xacfd17;
      _0x5269c2(), _0x5135da(_0x115d98);
    }), document['getElementById']("addBtn")["addEventListener"]("click", () => {
      if (!_0xCurrentUser) {
        alert("Bạn cần đăng nhập để thêm content.");
        return;
      }
      _0x14af65(null);
    }), document['getElementById']("cancelBtn")["addEventListener"]("click", _0x2cd3f2), document["getElementById"]("modalCloseX")['addEventListener']('click', _0x2cd3f2), _0x4453d4["addEventListener"]("submit", async _0x43ac48 => {
      const _0x37a6f9 = _0x12fda4;
      _0x43ac48["preventDefault"]();
      const __vinh_body = document.getElementById('fBody');
      const __vinh_bodyHtml = __vinh_body ? __vinh_body.innerHTML : '';
      const __vinh_excerpt = __vinh_body ? __vinh_body.innerText.trim().replace(/\s+/g, ' ').slice(0, 180) : '';
      const _0x73fd12pre = document["getElementById"]("cardId")["value"];
      // ---- Kiểm tra quyền trước khi lưu (khớp với RLS + trigger phía Supabase) ----
      if (!_0xCurrentUser) {
        alert("Bạn cần đăng nhập để lưu content.");
        return;
      }
      const __existingItem = _0x73fd12pre ? _0x2fc8d0.find(x => x['id'] === _0x73fd12pre) : null;
      // Nhân viên được sửa nội dung của BẤT KỲ ai (không còn giới hạn theo chủ
      // bài), và được TỰ DO nhập "Người phụ trách" (không khóa) — chỉ cần đã
      // đăng nhập là đủ để lưu. Xóa/Duyệt vẫn tách riêng, kiểm tra ở các
      // hàm/nút tương ứng.
      let __submittedAssignee = document['getElementById']("fAssignee")["value"]["trim"]();
      let __submittedStatus = document["getElementById"]("fStatus")["value"];
      if (_0xCurrentUser.role !== 'admin') {
        // Nhân viên được tự do chọn MỌI trạng thái, chỉ chặn duy nhất việc tự
        // đưa bài vào trạng thái đã duyệt/xuất bản (hành động duyệt bài).
        if (['Chờ xuất bản', 'Xuất bản'].includes(__submittedStatus)) {
          alert('Chỉ admin mới có quyền đưa content vào trạng thái "' + __submittedStatus + '".');
          return;
        }
      }
      const _0x3b143d = [...document["querySelectorAll"]("#channelChecks input:checked")]['map'](_0x7ea971 => _0x7ea971['value']),
        _0x30f11b = _0x36f0ef(document["getElementById"]("fDate")["value"]);
      if (_0x30f11b === null) {
        alert("Ngày đăng không hợp lệ. Vui lòng nhập theo định dạng dd/mm/yyyy (VD: 25/12/2026).");
        return;
      }
      const _0x1766fa = _0x36f0ef(document["getElementById"]("fDeadline")["value"]);
      if (_0x1766fa === null) {
        alert('Deadline\x20không\x20hợp\x20lệ.\x20Vui\x20lòng\x20nhập\x20theo\x20định\x20dạng\x20dd/mm/yyyy\x20(VD:\x2025/12/2026).');
        return;
      }
      // ---- Các trường bắt buộc: Thương hiệu, Định dạng, Pillar, Sản phẩm,
      // CTA, và ít nhất 1 Kênh đăng — không cho lưu nếu còn thiếu. ----
      const __requiredFieldChecks = [
        ['fBrand', 'Thương hiệu'],
        ['fFormat', 'Định dạng nội dung'],
        ['fPillar', 'Pillar'],
        ['fProduct', 'Sản phẩm']
      ];
      for (const [__fid, __flabel] of __requiredFieldChecks) {
        const __fel = document.getElementById(__fid);
        if (!__fel || !__fel.value.trim()) {
          alert('Vui lòng chọn/nhập "' + __flabel + '" trước khi lưu content.');
          if (__fel) __fel.focus();
          return;
        }
      }
      if (_0x3b143d.length === 0) {
        alert('Vui lòng chọn ít nhất 1 Kênh đăng trước khi lưu content.');
        return;
      }
      const _0x5b1583 = {
          'week': document["getElementById"]("fWeek")["value"]["trim"](),
          'date': _0x30f11b,
          'content': __vinh_excerpt,
          'bodyHtml': __vinh_bodyHtml,
          'brand': document["getElementById"]("fBrand")["value"]['trim'](),
          'format': document['getElementById']("fFormat")["value"]["trim"](),
          'pillar': document["getElementById"]("fPillar")["value"]["trim"](),
          'status': __submittedStatus,
          'product': document["getElementById"]("fProduct")["value"]["trim"](),
          'cta': document["getElementById"]('fCta')['value']["trim"](),
          'channels': _0x3b143d,
          'assignee': __submittedAssignee,
          'deadline': _0x1766fa,
          'link': document["getElementById"]("fLink")["value"]["trim"](),
          'thumb': document['getElementById']('fThumb')["value"]["trim"]()
        },
        _0x73fd12 = document["getElementById"]("cardId")["value"];
      let _0x3705ae;
      _0x73fd12 ? (_0x3705ae = _0x2fc8d0['find'](_0x3ec5ec => _0x3ec5ec['id'] === _0x73fd12), Object['assign'](_0x3705ae, _0x5b1583)) : (_0x3705ae = Object["assign"]({
        'id': _0xe449dc()
      }, _0x5b1583), _0x2fc8d0["push"](_0x3705ae)), _0x2cd3f2(), _0x20ff35(), await _0x2dc1ce(_0x3705ae);
    });
  async function _0x5135da(_0x4f2574) {
    const _0x1b8ae2 = _0x12fda4;
    if (!_0x4ee201('Xóa\x20content\x20này?')) return;
    _0x2fc8d0 = _0x2fc8d0["filter"](_0x3a59b2 => _0x3a59b2['id'] !== _0x4f2574);
    if (_0x145caa === _0x4f2574) _0x2cd3f2();
    _0x20ff35(), await _0x5387a6(_0x4f2574);
  }
  _0xcbd0a8['addEventListener']("click", () => {
    if (!_0x145caa) return;
    _0x5135da(_0x145caa);
  }), document["getElementById"]("searchBox")['addEventListener']("input", _0x20ff35), _0x3c249["addEventListener"]('change', _0x20ff35), _0x476524['addEventListener']("change", _0x20ff35), _0x504d15["addEventListener"]("change", _0x20ff35), _0x2e289d["addEventListener"]("change", _0x20ff35), _0x5058e4["addEventListener"]("change", _0x20ff35);
    _0x2695c1["addEventListener"]('click', () => {
    const _0x3e46df = _0x12fda4;
    _0x313817 ? alert('Đang\x20đồng\x20bộ\x20real-time\x20qua\x20Supabase\x20(project:\x20' + _0x51cd58["projectId"] + ').') : alert('File\x20này\x20chưa\x20được\x20gắn\x20cấu\x20hình\x20Supabase\x20—\x20dữ\x20liệu\x20chỉ\x20đang\x20lưu\x20trên\x20trình\x20duyệt\x20này,\x20không\x20tự\x20đồng\x20bộ\x20với\x20máy\x20khác.');
  }), document["getElementById"]("exportBtn")["addEventListener"]("click", () => {
    const _0x20680b = _0x12fda4,
      _0x18223d = new Blob([JSON['stringify'](_0x2fc8d0, null, 0x2)], {
        'type': 'application/json'
      }),
      _0x1a307c = URL['createObjectURL'](_0x18223d),
      _0x2ae618 = document["createElement"]('a');
    _0x2ae618['href'] = _0x1a307c, _0x2ae618["download"] = "content-planner-" + new Date()["toISOString"]()["slice"](0x0, 0xa) + ".json", _0x2ae618['click'](), URL['revokeObjectURL'](_0x1a307c);
  });
  const _0xe34478 = document["getElementById"]("importFile");
  document['getElementById']("importBtn")["addEventListener"]('click', () => _0xe34478["click"]()), _0xe34478['addEventListener']('change', _0x372c6d => {
    const _0x380fe6 = _0x12fda4,
      _0x2c3bf4 = _0x372c6d["target"]["files"][0x0];
    if (!_0x2c3bf4) return;
    const _0xec9a2e = new FileReader();
    _0xec9a2e["onload"] = async _0x31d9d8 => {
      const _0x2619c1 = _0x380fe6;
      try {
        const _0x4a425a = JSON["parse"](_0x31d9d8["target"]["result"]);
        if (!Array["isArray"](_0x4a425a)) throw new Error("Định dạng không hợp lệ");
        _0x4a425a['forEach'](_0x39d4c8);
        if (confirm("Nhập " + _0x4a425a["length"] + " content? Điều này sẽ thay thế toàn bộ dữ liệu hiện tại.")) {
          _0x2fc8d0 = _0x4a425a, _0x20ff35(), localStorage['setItem'](_0x1d8095, JSON['stringify'](_0x2fc8d0));
          if (_0x2405e1) {
            _0x18665f("syncing", "Đang nhập dữ liệu lên Supabase...");
            try {
              const _0x1a26f8 = await _0x2405e1["collection"]("content")["get"](),
                _0xa34499 = new Set(_0x2fc8d0["map"](_0xe7b128 => _0xe7b128['id'])),
                _0x3d3bc6 = [];
              _0x1a26f8["docs"]["forEach"](_0xc5878d => {
                const _0x2d7752 = _0x2619c1;
                if (!_0xa34499["has"](_0xc5878d['id'])) _0x3d3bc6["push"]({
                  'type': "delete",
                  'id': _0xc5878d['id']
                });
              }), _0x2fc8d0["forEach"](_0x3363e1 => _0x3d3bc6["push"]({
                'type': "set",
                'id': _0x3363e1['id'],
                'item': _0x3363e1
              }));
              for (let _0x4acd74 = 0x0; _0x4acd74 < _0x3d3bc6['length']; _0x4acd74 += 0x190) {
                const _0x4164ed = _0x2405e1["batch"]();
                _0x3d3bc6["slice"](_0x4acd74, _0x4acd74 + 0x190)["forEach"](_0x366604 => {
                  const _0x2729e6 = _0x2619c1,
                    _0x48923 = _0x2405e1["collection"]("content")["doc"](_0x366604['id']);
                  if (_0x366604["type"] === "delete") _0x4164ed['delete'](_0x48923);
                  else _0x4164ed["set"](_0x48923, _0x366604["item"]);
                }), await _0x4164ed["commit"]();
              }
              _0x18665f('ok', "Đã đồng bộ (real-time)");
            } catch (_0x35c518) {
              _0x18665f('error', "Lỗi nhập dữ liệu: " + _0x35c518["message"]);
            }
          }
        }
      } catch (_0x4016fa) {
        alert("File không hợp lệ: " + _0x4016fa["message"]);
      }
      _0xe34478["value"] = '';
    }, _0xec9a2e["readAsText"](_0x2c3bf4);
  });
  _0x20ff35(), _0x5aab46(), setInterval(() => {
    if (_0x42ceb7()) _0x20ff35();
  }, 0x5 * 0x3c * 0x3e8);
}());
