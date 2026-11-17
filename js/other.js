/* OTHER 페이지: 모니터 속 사이트 영상 넘기기 */
(function () {
  // 영상 목록 (파일을 assets/other/ 에 넣으면 됩니다)
  var videos = [
    'assets/other/site-01.mp4',
    'assets/other/site-02.mp4',
    'assets/other/site-03.mp4',
    'assets/other/site-04.mp4',
    'assets/other/site-05.mp4',
    'assets/other/site-06.mp4',
    'assets/other/site-07.mp4'
  ];

  var video = document.getElementById('siteVideo');
  var placeholder = document.getElementById('screenPlaceholder');
  var dotsWrap = document.getElementById('dots');
  var current = 0;

  // 동그라미 만들기
  var dots = videos.map(function (_, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', (i + 1) + '번 영상');
    dot.addEventListener('click', function () { show(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function show(i) {
    current = (i + videos.length) % videos.length;

    dots.forEach(function (dot, j) {
      dot.classList.toggle('is-active', j === current);
      dot.setAttribute('aria-selected', j === current);
    });

    // 영상이 아직 없으면 흰 화면 + 번호 표시
    placeholder.textContent = pad(current + 1) + ' / ' + pad(videos.length);
    placeholder.hidden = false;
    video.classList.remove('is-ready');

    video.src = videos[current];
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  video.addEventListener('loadeddata', function () {
    placeholder.hidden = true;
    video.classList.add('is-ready');
  });

  document.getElementById('prevBtn').addEventListener('click', function () { show(current - 1); });
  document.getElementById('nextBtn').addEventListener('click', function () { show(current + 1); });

  // 키보드 ← → 로도 넘기기
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  show(0);
})();
