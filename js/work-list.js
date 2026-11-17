/* WORK 목록 썸네일 호버
   - 화면 배경에 작품 배경 이미지(data-bg)를 꽉 차게 (제외 합성 2겹)
   - 썸네일 이미지가 영상으로 바뀌어 재생 (영상은 처음 호버할 때만 불러옴) */
(function () {
  var bgs = document.querySelectorAll('.hover-bg');  // 같은 이미지 2겹
  var canHover = window.matchMedia('(hover: hover)').matches;

  document.querySelectorAll('.work-entry').forEach(function (entry) {
    var bgSrc = entry.getAttribute('data-bg');
    var video = entry.querySelector('video[data-src]');
    if (!bgSrc && !video) return;  // 아직 흰 박스인 상자

    // 배경 이미지는 페이지가 한가해질 때 미리 받아둠 (첫 호버 때 깜빡임 방지)
    // 마우스가 있는 기기만 — 호버가 없는 폰에서는 받지 않음
    if (bgSrc && canHover) {
      var pre = function () { new Image().src = bgSrc; };
      if ('requestIdleCallback' in window) requestIdleCallback(pre); else setTimeout(pre, 1500);
    }

    function show() {
      if (bgSrc) {
        bgs.forEach(function (bg) {
          bg.style.backgroundImage = 'url("' + bgSrc + '")';
          bg.classList.add('is-visible');
        });
      }
      if (video) {
        if (!video.src) video.src = video.getAttribute('data-src');
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
    }

    function hide() {
      bgs.forEach(function (bg) { bg.classList.remove('is-visible'); });
      if (video) {
        video.classList.remove('is-playing');
        video.pause();
        video.currentTime = 0;
      }
    }

    if (video) {
      // 실제로 재생이 시작되면 영상 보이기 (로딩 중엔 이미지 그대로)
      video.addEventListener('playing', function () { video.classList.add('is-playing'); });
    }

    entry.addEventListener('mouseenter', show);
    entry.addEventListener('mouseleave', hide);
    entry.addEventListener('focus', show);
    entry.addEventListener('blur', hide);
  });
})();
