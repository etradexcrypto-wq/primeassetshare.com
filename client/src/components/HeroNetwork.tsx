import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 7.8;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    const world = new THREE.Group();
    world.rotation.z = 0.25;
    scene.add(world);
    const globe = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.5, 2)), new THREE.LineBasicMaterial({ color: 0xd6e87d, transparent: true, opacity: 0.13 }));
    world.add(globe);
    const nodes = new THREE.Group();
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xd6e87d, transparent: true, opacity: 0.8 });
    for (let i = 0; i < 34; i++) { const phi = Math.acos(2 * Math.random() - 1); const theta = Math.random() * Math.PI * 2; const node = new THREE.Mesh(new THREE.SphereGeometry(i % 7 === 0 ? 0.045 : 0.025, 6, 6), nodeMaterial); node.position.set(2.54 * Math.sin(phi) * Math.cos(theta), 2.54 * Math.cos(phi), 2.54 * Math.sin(phi) * Math.sin(theta)); nodes.add(node); }
    world.add(nodes);
    const routeMaterial = new THREE.LineBasicMaterial({ color: 0x87b98a, transparent: true, opacity: 0.3 });
    for (let i = 0; i < 5; i++) { const start = new THREE.Vector3(-2.1 + Math.random() * 4.2, -1.4 + Math.random() * 2.8, 2.25); const end = new THREE.Vector3(-2.1 + Math.random() * 4.2, -1.4 + Math.random() * 2.8, 2.25); const curve = new THREE.QuadraticBezierCurve3(start, new THREE.Vector3((start.x + end.x) / 2, 1.6 + Math.random(), 2.7), end); world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)), routeMaterial)); }
    const resize = () => { const rect = host.getBoundingClientRect(); renderer.setSize(rect.width, rect.height, false); camera.aspect = rect.width / rect.height; camera.updateProjectionMatrix(); };
    resize(); window.addEventListener("resize", resize);
    let frame = 0; const animate = () => { frame = requestAnimationFrame(animate); if (!reduced) { world.rotation.y += 0.0009; world.rotation.x = Math.sin(Date.now() * 0.00018) * 0.06; } renderer.render(scene, camera); }; animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); renderer.dispose(); globe.geometry.dispose(); (globe.material as THREE.Material).dispose(); };
  }, []);
  return <canvas ref={canvasRef} className="hero-network" aria-hidden="true" />;
}
