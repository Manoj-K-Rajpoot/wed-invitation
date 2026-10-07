"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Flame, Sparkles, Heart, HandHeart, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function ThreeAashirwaadDiya() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [blessingCount, setBlessingCount] = useState(1428);
  const [hasBlessed, setHasBlessed] = useState(false);

  // References to dynamic Three.js objects
  const flameLightRef = useRef<THREE.PointLight | null>(null);
  const flameMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffecd2, 1.2);
    scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xffd700, 1.5);
    goldLight.position.set(2, 4, 3);
    scene.add(goldLight);

    const flameLight = new THREE.PointLight(0xff7700, isDiyaLit ? 3.5 : 0.2, 10);
    flameLight.position.set(0, 0.7, 0);
    scene.add(flameLight);
    flameLightRef.current = flameLight;

    // 2. 3D BRASS DIYA (Traditional Indian Clay/Brass Oil Lamp)
    const diyaGroup = new THREE.Group();

    // Brass Material
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Diya Base Bowl
    const baseGeo = new THREE.CylinderGeometry(0.8, 0.3, 0.4, 32);
    const baseMesh = new THREE.Mesh(baseGeo, brassMaterial);
    baseMesh.position.y = 0.2;
    diyaGroup.add(baseMesh);

    // Diya Spout Lip
    const lipGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 32);
    const lipMesh = new THREE.Mesh(lipGeo, brassMaterial);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = 0.4;
    diyaGroup.add(lipMesh);

    // Auspicious Base Plate
    const plateGeo = new THREE.CylinderGeometry(1.4, 1.3, 0.08, 32);
    const plateMesh = new THREE.Mesh(plateGeo, brassMaterial);
    plateMesh.position.y = 0;
    diyaGroup.add(plateMesh);

    // Ghee / Oil Surface
    const oilGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.05, 32);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0x8a5200,
      roughness: 0.1,
      metalness: 0.6,
    });
    const oilMesh = new THREE.Mesh(oilGeo, oilMat);
    oilMesh.position.y = 0.38;
    diyaGroup.add(oilMesh);

    // 3D FLICKERING FLAME MESH
    const flameGeo = new THREE.ConeGeometry(0.18, 0.55, 16);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 0.65, 0);
    flameMesh.scale.set(isDiyaLit ? 1 : 0.01, isDiyaLit ? 1 : 0.01, isDiyaLit ? 1 : 0.01);
    diyaGroup.add(flameMesh);
    flameMeshRef.current = flameMesh;

    scene.add(diyaGroup);

    // 3. ANIMATION LOOP
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = performance.now() * 0.001;

      // Gentle rotation of brass plate
      diyaGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.25;

      // Flame flicker
      if (flameMeshRef.current && isDiyaLit) {
        const flicker = Math.sin(elapsed * 12) * 0.08 + Math.cos(elapsed * 18) * 0.05;
        flameMeshRef.current.scale.set(1 + flicker, 1 + flicker * 1.5, 1 + flicker);
        flameMeshRef.current.position.y = 0.65 + Math.sin(elapsed * 15) * 0.02;
        if (flameLightRef.current) {
          flameLightRef.current.intensity = 3.2 + Math.sin(elapsed * 14) * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDiyaLit]);

  const handleLightDiya = () => {
    setIsDiyaLit(true);
    if (!hasBlessed) {
      setBlessingCount((prev) => prev + 1);
      setHasBlessed(true);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#FFD700", "#FFA500", "#FF4500", "#FFF8DC"],
    });
  };

  const handleShowerAkshat = () => {
    if (!hasBlessed) {
      setBlessingCount((prev) => prev + 1);
      setHasBlessed(true);
    }

    // Sacred Akshat (Golden Rice) & Marigold petal shower
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FFD700", "#FFA000", "#E8A598", "#D81B60", "#FFFDE7"],
      shapes: ["circle"],
      scalar: 1.1,
    });
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>शुभ आशीर्वाद अनुष्ठान</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-[#580B1E] font-bold">
          Bestow Divine Blessings
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 font-sans">
          Light an auspicious sacred Diya or shower golden Akshat & petals for the eternal happiness of Sajal & Aaradhya.
        </p>
      </div>

      {/* Interactive 3D Diya Altar Box */}
      <div className="relative max-w-lg mx-auto deckle-edge-card p-6 rounded-3xl border-2 border-amber-500/40 shadow-2xl text-center">
        {/* Three.js 3D Diya Canvas */}
        <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-radial from-[#3A0614] via-[#20020A] to-[#120105] flex items-center justify-center">
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />

          {/* Diya Status Pill */}
          <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
            <div className="px-3.5 py-1 rounded-full bg-black/60 border border-amber-400/40 text-[11px] font-hindi text-amber-300 backdrop-blur-md">
              {isDiyaLit ? "✨ अखंड मंगल दीप प्रज्वलित ✨" : "दीप प्रज्वलन हेतु नीचे स्पर्श करें"}
            </div>
          </div>
        </div>

        {/* Live Blessings Counter */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-serif text-amber-900 font-bold">
          <Heart className="w-4 h-4 text-red-600 fill-red-600 animate-pulse" />
          <span>{blessingCount.toLocaleString()} Sacred Blessings Bestowed</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleLightDiya}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-royal font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              isDiyaLit
                ? "bg-amber-100 text-amber-900 border border-amber-400"
                : "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 hover:shadow-amber-500/40"
            }`}
          >
            <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span>{isDiyaLit ? "Diya is Glowing" : "Light Sacred Diya"}</span>
          </button>

          <button
            onClick={handleShowerAkshat}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#580B1E] hover:bg-[#430816] text-amber-200 border border-amber-400/40 font-royal font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <HandHeart className="w-4 h-4 text-amber-300" />
            <span>Shower Akshat & Flowers</span>
          </button>
        </div>

        {hasBlessed && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-xs font-editorial text-amber-900 italic flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>“May the divine couple be blessed with seven lifetimes of prosperity & bliss.”</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
