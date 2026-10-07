"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronUp, Music, UserCheck, Flame } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface ThreeGateSceneProps {
  onOpen: () => void;
  isOpen: boolean;
  guestName?: string;
}

export default function ThreeGateScene({ onOpen, isOpen, guestName = "Honored Guest" }: ThreeGateSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openingProgress, setOpeningProgress] = useState(0);

  useEffect(() => {
    if (isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a030a, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xffd700, 3.5, 20);
    goldPointLight.position.set(0, 0, 4);
    scene.add(goldPointLight);

    const rubyLight = new THREE.PointLight(0xff1744, 2, 15);
    rubyLight.position.set(0, -3, 3);
    scene.add(rubyLight);

    // 3. 3D FLOATING MARIGOLD & ROSE PETALS
    const petalCount = 45;
    const petalGeometry = new THREE.PlaneGeometry(0.35, 0.5, 4, 4);
    
    // Deform petal slightly for realistic curvature
    const pos = petalGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 4) * 0.08 + Math.cos(y * 4) * 0.08);
    }
    petalGeometry.computeVertexNormals();

    const roseMaterial = new THREE.MeshStandardMaterial({
      color: 0xd81b60,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const goldPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa000,
      roughness: 0.3,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });

    const petalsGroup = new THREE.Group();
    const petalData: { mesh: THREE.Mesh; speedY: number; rotX: number; rotY: number; rotZ: number }[] = [];

    for (let i = 0; i < petalCount; i++) {
      const mat = i % 2 === 0 ? roseMaterial : goldPetalMaterial;
      const mesh = new THREE.Mesh(petalGeometry, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.6 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);

      petalsGroup.add(mesh);
      petalData.push({
        mesh,
        speedY: 0.015 + Math.random() * 0.025,
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
        rotZ: (Math.random() - 0.5) * 0.02,
      });
    }
    scene.add(petalsGroup);

    // 4. 3D GOLDEN ROYAL ENVELOPE / GATE PANELS
    const doorGroup = new THREE.Group();

    // Gold Foil Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Deep Velvet Wood Panel Material
    const velvetMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d0614,
      roughness: 0.7,
      metalness: 0.1,
    });

    // Left Door Mesh
    const leftDoorGeo = new THREE.BoxGeometry(2.4, 6.2, 0.15);
    const leftDoor = new THREE.Mesh(leftDoorGeo, velvetMaterial);
    leftDoor.position.set(-1.25, 0, 0);

    // Left Door Gold Border
    const leftBorderGeo = new THREE.BoxGeometry(2.45, 6.25, 0.1);
    const leftBorder = new THREE.Mesh(leftBorderGeo, goldMaterial);
    leftBorder.position.set(-1.25, 0, -0.05);

    // Right Door Mesh
    const rightDoorGeo = new THREE.BoxGeometry(2.4, 6.2, 0.15);
    const rightDoor = new THREE.Mesh(rightDoorGeo, velvetMaterial);
    rightDoor.position.set(1.25, 0, 0);

    const rightBorder = new THREE.Mesh(leftBorderGeo, goldMaterial);
    rightBorder.position.set(1.25, 0, -0.05);

    // Auspicious 3D Center Seal (Royal Crest Disc)
    const sealGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xe5a922,
      metalness: 0.9,
      roughness: 0.2,
    });
    const seal = new THREE.Mesh(sealGeo, sealMat);
    seal.rotation.x = Math.PI / 2;
    seal.position.set(0, 0, 0.2);

    doorGroup.add(leftDoor, leftBorder, rightDoor, rightBorder, seal);
    scene.add(doorGroup);

    // 5. ANIMATION LOOP WITH INTERACTION
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;

      // Float petals gently down
      petalData.forEach((p) => {
        p.mesh.position.y -= p.speedY;
        p.mesh.position.x += Math.sin(elapsedTime + p.mesh.position.y) * 0.005;
        p.mesh.rotation.x += p.rotX;
        p.mesh.rotation.y += p.rotY;
        p.mesh.rotation.z += p.rotZ;

        if (p.mesh.position.y < -5) {
          p.mesh.position.y = 5;
          p.mesh.position.x = (Math.random() - 0.5) * 10;
        }
      });

      // Subtle breath / rotation on seal
      seal.rotation.z = Math.sin(elapsedTime * 0.8) * 0.08;
      goldPointLight.intensity = 3 + Math.sin(elapsedTime * 2.5) * 0.8;

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
  }, [isOpen]);

  const handleOpenClick = () => {
    if (!isOpen) {
      if (audioEngine) {
        audioEngine.start();
      }
      onOpen();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#120206] select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Three.js Canvas Container */}
          <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Ambient Lighting Layers */}
          <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-[#100104]/90 pointer-events-none" />

          {/* OVERLAY UI: Royal Indian Wedding Invitation Cover */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-md mx-auto">
            {/* Auspicious Shlok Pill */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/50 backdrop-blur-md shadow-lg"
            >
              <p className="text-amber-300 text-xs sm:text-sm font-hindi tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "7s" }} />
                <span>॥ ॐ श्री गणेशाय नमः ॥</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "7s" }} />
              </p>
            </motion.div>

            {/* Personalized Guest Welcome */}
            {guestName && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-3 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-serif backdrop-blur-sm"
              >
                <span>सादर आमंत्रण: <strong className="text-amber-100 font-semibold">{guestName}</strong></span>
              </motion.div>
            )}

            {/* 3D Wax Seal Monogram */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpenClick}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-amber-600 to-yellow-800 shadow-2xl cursor-pointer my-2"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#3D0614] to-[#1F0209] border-2 border-amber-400/90 flex flex-col items-center justify-center shadow-inner">
                <span className="font-decor text-amber-300 text-2xl sm:text-3xl font-bold tracking-tighter">
                  S & A
                </span>
                <span className="text-[9px] text-amber-400/90 tracking-widest uppercase font-serif mt-0.5">
                  14 Dec 2026
                </span>
              </div>
            </motion.div>

            {/* Couple Typography */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 space-y-1"
            >
              <h1 className="font-editorial text-3xl sm:text-4xl text-amber-100 font-bold tracking-wide drop-shadow-lg">
                Sajal & Aaradhya
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/80 font-hindi tracking-wider">
                शुभ परिणय संस्कार • उदयपुर (राजस्थान)
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={handleOpenClick}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 group relative px-8 py-3.5 rounded-full overflow-hidden shadow-2xl border border-amber-400/80 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-stone-950 font-royal font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-amber-500/60"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                <span>Unfold Royal Patrika</span>
                <ChevronUp className="w-4 h-4 animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 opacity-90 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* Audio Tip */}
            <p className="mt-3 text-[11px] text-amber-300/70 flex items-center gap-1.5 tracking-wider font-sans">
              <Music className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Tap to experience with sacred Shehnai & Sitar melodies</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
