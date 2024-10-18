import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

type GLTFResult = GLTF & {
  nodes: {
    Curve001: THREE.Mesh;
  };
  materials: {
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

type props = {
  focusRoot: React.RefObject<HTMLElement>;
  updateRoot: React.RefObject<HTMLElement>;
};

export const Sphere: React.FC<props> = ({ focusRoot, updateRoot }) => {
  const { nodes, materials } = useGLTF("/sphere.glb") as unknown as GLTFResult;
  const modelRef = useRef<THREE.Group>(null);
  const modelCoverRef = useRef<THREE.Group>(null);
  useFrame(() => (modelRef.current!.rotation.x -= 0.005));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (innerWidth > 640) {
      gsap.to(modelRef.current!.scale, {
        x: 0.009,
        y: 0.009,
        z: 0.009,
        delay: 1.2,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: focusRoot.current,
            toggleActions: "play none none reverse",
          },
        })
        .to(modelCoverRef.current!.position, { x: -2.46 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: updateRoot.current,
            toggleActions: "play none none reverse",
          },
        })
        .to(modelCoverRef.current!.position, { x: 2.46 });
    } else {
      gsap.timeline().to(modelRef.current!.scale, {
        x: 0.007,
        y: 0.007,
        z: 0.007,
        delay: 1.2,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: focusRoot.current,
            toggleActions: "play none none reverse",
            start: "center bottom",
          },
        })
        .to(modelCoverRef.current!.position, { x: -0.8 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: updateRoot.current,
            toggleActions: "play none none reverse",
            start: "70% bottom",
          },
        })
        .to(modelCoverRef.current!.position, { x: 0.8 });
    }
  }, [focusRoot, updateRoot]);

  return (
    <group rotation={[-0.07, 0, -1.77]} ref={modelCoverRef}>
      <group
        ref={modelRef}
        rotation={[-1.56, 0, 0.09]}
        scale={0}
        dispose={null}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve001.geometry}
          material={materials["Material.003"]}
          material-metalness={0.95}
          material-roughness={0.01}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/sphere.glb");
