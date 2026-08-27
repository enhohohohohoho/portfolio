# Portfolio

3D 오브젝트가 있는 개인 포트폴리오 사이트. 빌드 도구 없이 순수 HTML/CSS/JS + Three.js(CDN)로 제작.

## 구조

```
index.html      메인 페이지 (3D 히어로)
work.html       작업물 목록
about.html      소개
css/style.css   전체 스타일 (반응형: 모바일/태블릿/데스크톱)
js/nav.js       상단 메뉴 (모바일 햄버거 토글)
js/scene.js     3D 오브젝트 (Three.js)
assets/         이미지 등 리소스
```

## 로컬에서 미리보기

`index.html`은 3D 스크립트를 모듈(`type="module"`)로 불러오기 때문에, 파일을 더블클릭해서
바로 여는 것보다 **간단한 로컬 서버**로 여는 것을 추천합니다.

터미널에서:

```bash
cd 2027_Portfolio
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속. (`work.html`, `about.html`은 그냥 더블클릭해도 됩니다.)

또는 VS Code를 쓴다면 "Live Server" 확장 프로그램을 설치해서 우클릭 → "Open with Live Server"도 편합니다.

## 커스터마이징

- **이름/문구**: `index.html`의 `YOUR NAME`, `hero-subtitle` 텍스트를 교체하세요.
- **프로젝트 카드**: `work.html`, `index.html`의 `.work-card` 반복 블록을 복사해서 늘리고, 이미지를 넣으려면
  `<a class="work-card">` 안에 `<img src="assets/파일명.jpg" alt="설명">`을 추가하세요.
- **프로필 사진**: `about.html`의 안내 문구가 있는 `.about-photo` div를 `<img class="about-photo" src="assets/profile.jpg" alt="프로필 사진">`으로 교체하세요.
- **3D 오브젝트 모양/색상**: `js/scene.js`의 `IcosahedronGeometry`, `color` 값을 바꾸면 됩니다.
- **색상 테마**: `css/style.css` 맨 위 `:root` 변수(`--color-bg`, `--color-text`, `--color-accent` 등)를 수정하세요.

## 배포

빌드 과정이 필요 없는 정적 사이트라 아래 서비스에 폴더를 그대로 올리면 바로 배포됩니다.

- **Netlify / Cloudflare Pages**: 이 폴더를 드래그 앤 드롭하거나 Git 저장소를 연결
- **GitHub Pages**: 저장소 Settings → Pages에서 브랜치 지정

## 성능 & 접근성 메모

- 3D 애니메이션은 `prefers-reduced-motion` 설정을 존중하고, 탭이 백그라운드일 때 렌더링을 멈춥니다.
- 모바일에서는 햄버거 메뉴로 전환되고, 태블릿은 2열, 데스크톱은 3열 그리드로 자동 조정됩니다.
- Three.js는 CDN(jsDelivr)에서 고정 버전(0.160.0)으로 불러와 안정성을 확보했습니다.
