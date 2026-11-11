import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [glReady, setGlReady] = useState(false);
  const [glError, setGlError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch (e) {
      console.warn('WebGL init failed, using CSS fallback', e);
      setGlError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.5);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x3b82f6, 3, 12);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const cardGeo = new THREE.BoxGeometry(2.3, 3.1, 0.06);

    const createProceduralCardTexture = (
      title: string,
      tag: string,
      codeColor: string,
      accentColor: string
    ) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 680;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#141416';
      ctx.fillRect(0, 0, 512, 680);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 680);
        ctx.stroke();
      }
      for (let y = 0; y < 680; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      ctx.fillStyle = accentColor;
      ctx.font = 'bold 24px monospace';
      ctx.fillText(tag, 36, 60);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText(title, 36, 110);

      ctx.strokeStyle = codeColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 140, 440, 260);

      ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.fillRect(36, 140, 440, 260);

      for (let i = 0; i < 6; i++) {
        const nx = 70 + (i % 3) * 160;
        const ny = 190 + Math.floor(i / 3) * 120;
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nx + 100, ny + (i % 2 === 0 ? 30 : -30));
        ctx.stroke();
      }

      ctx.fillStyle = '#A0A0A0';
      ctx.font = '16px monospace';
      ctx.fillText('0x7A08 >> CAN_BUS_STREAM', 36, 440);
      ctx.fillText('STATUS: SYNCHRONIZED', 36, 470);
      ctx.fillText('LATENCY: 0.12ms | V_ENG', 36, 500);

      ctx.fillStyle = '#262626';
      ctx.fillRect(36, 580, 440, 4);
      ctx.fillStyle = accentColor;
      ctx.fillRect(36, 580, 260, 4);

      ctx.fillStyle = '#6B7280';
      ctx.font = '14px monospace';
      ctx.fillText('CHERUVU KARTHIKEYA · 2026', 36, 620);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const cardConfigs = [
      {
        title: 'About Me',
        tag: 'PROFILE & STORY',
        code: '#38BDF8',
        accent: '#60A5FA',
        pos: new THREE.Vector3(-1.4, 0.3, -0.6),
        rot: new THREE.Euler(0.08, 0.35, -0.06),
      },
      {
        title: 'Internship',
        tag: 'OLA ELECTRIC',
        code: '#3B82F6',
        accent: '#60A5FA',
        pos: new THREE.Vector3(0.0, 0.5, -0.2),
        rot: new THREE.Euler(-0.04, 0.08, 0.02),
      },
      {
        title: 'Experience',
        tag: 'PROJECTS & SKILLS',
        code: '#818CF8',
        accent: '#A78BFA',
        pos: new THREE.Vector3(1.4, 0.2, -0.7),
        rot: new THREE.Euler(0.06, -0.32, 0.05),
      },
    ];

    const cardMeshes: THREE.Mesh[] = [];

    cardConfigs.forEach((cfg) => {
      const tex = createProceduralCardTexture(cfg.title, cfg.tag, cfg.code, cfg.accent);
      const mat = new THREE.MeshPhysicalMaterial({
        map: tex,
        transparent: true,
        opacity: 0.78,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.12,
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.position.copy(cfg.pos);
      mesh.rotation.copy(cfg.rot);
      mainGroup.add(mesh);
      cardMeshes.push(mesh);
    });

    // Central Frosted Accent Plane
    const glassGeo = new THREE.PlaneGeometry(3.6, 2.4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.28,
      roughness: 0.1,
      metalness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.6,
      ior: 1.4,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.set(0, -0.3, 0.5);
    glassMesh.rotation.set(-0.06, 0.02, -0.02);
    mainGroup.add(glassMesh);

    const wireGeo = new THREE.EdgesGeometry(glassGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.7,
      linewidth: 2,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    glassMesh.add(wireMesh);

    // Floating particles
    const particleCount = isSoftwareGl ? 60 : 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 16;
      particlePos[i + 1] = (Math.random() - 0.5) * 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 4);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 64, 0, 128, 64, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -2.6, 0);
    shadowMesh.rotation.x = -Math.PI / 2;
    scene.add(shadowMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = mouseX * 0.25;
      targetRotX = -mouseY * 0.18;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    function renderLoop() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      mainGroup.rotation.y = THREE.MathUtils.damp(mainGroup.rotation.y, targetRotY, 4, delta);
      mainGroup.rotation.x = THREE.MathUtils.damp(mainGroup.rotation.x, targetRotX, 4, delta);

      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

      cardMeshes.forEach((mesh, idx) => {
        mesh.position.y = cardConfigs[idx].pos.y + Math.sin(elapsedTime * 1.5 + idx * 1.3) * 0.04;
      });

      particleField.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();
    setGlReady(true);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      cardGeo.dispose();
      glassGeo.dispose();
      wireGeo.dispose();
      particleGeo.dispose();
      shadowGeo.dispose();

      cardMeshes.forEach((m) => {
        (m.material as THREE.Material).dispose();
      });
      glassMat.dispose();
      wireMat.dispose();
      particleMat.dispose();
      shadowMat.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (glError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-72 h-96 rounded-2xl border border-blue-500/20 bg-blue-950/20 p-6 flex flex-col justify-between">
          <div className="text-xs font-mono text-blue-400">OLA ELECTRIC · 2026</div>
          <div className="text-2xl font-bold font-sans">Vehicle Engineering Telemetry</div>
          <div className="text-xs text-neutral-400 font-mono">SQL Optimization & Sensors</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-full transition-opacity duration-1000 ${
        glReady ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: 'none' }}
    />
  );
};
