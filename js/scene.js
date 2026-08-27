// 메인 히어로 3D 오브젝트 (Three.js)
import * as THREE from 'three';

const canvas = document.getElementById('scene-canvas');
if (canvas && window.WebGLRenderingContext) {
  initScene(canvas);
}

function initScene(canvas) {
  const hero = canvas.closest('.hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, hero.clientWidth / hero.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return; // WebGL 미지원 브라우저는 흰 배경만 표시
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(hero.clientWidth, hero.clientHeight);

  // 조명
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
  keyLight.position.set(4, 5, 6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x8899ff, 0.5);
  rimLight.position.set(-5, -3, -4);
  scene.add(rimLight);

  // 오브젝트: 미니멀한 와이어프레임 + 솔리드 이중 구조
  const geometry = new THREE.IcosahedronGeometry(1.8, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.15,
    roughness: 0.35,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const wireGeometry = new THREE.IcosahedronGeometry(2.02, 1);
  const wireMaterial = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, transparent: true, opacity: 0.12 });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  scene.add(wireMesh);

  const group = new THREE.Group();
  group.add(mesh, wireMesh);
  scene.add(group);

  // 마우스 패럴랙스
  let targetX = 0;
  let targetY = 0;
  window.addEventListener('pointermove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
  });

  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', resize);

  let rafId;
  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible) animate();
  });

  const clock = new THREE.Clock();
  function animate() {
    if (!visible) return;
    rafId = requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (!prefersReducedMotion) {
      group.rotation.y += delta * 0.25;
      group.rotation.x += delta * 0.08;
    }
    // 마우스 위치를 향해 부드럽게 추가 회전 (패럴랙스)
    group.rotation.x += (targetY * 0.4 - group.rotation.x * 0.4) * delta * 2;
    group.rotation.y += targetX * 0.4 * delta * 2;

    renderer.render(scene, camera);
  }
  animate();

  // 탭이 백그라운드일 때 프레임 낭비 방지
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
}
