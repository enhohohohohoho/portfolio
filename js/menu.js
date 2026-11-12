/* 터치 기기(호버가 없는 폰/태블릿)에서 메뉴 버튼을 탭하면 하위 버튼 열기/닫기 */
(function () {
  if (!window.matchMedia('(hover: none)').matches) return;

  var items = document.querySelectorAll('.menu-item');

  function closeAll(except) {
    items.forEach(function (item) {
      if (item !== except) item.classList.remove('is-open');
    });
  }

  items.forEach(function (item) {
    var btn = item.querySelector('button.menu-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll(item);
      item.classList.toggle('is-open');
    });
  });

  // 메뉴 바깥을 탭하면 닫기
  document.addEventListener('click', function () { closeAll(null); });
})();
