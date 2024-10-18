import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Sphere } from "../Model/Sphere";

type props = {
  focusRoot: React.RefObject<HTMLElement>;
  updateRoot: React.RefObject<HTMLElement>;
};

const Render: React.FC<props> = ({ focusRoot, updateRoot }) => {
  return (
    <Canvas camera={{ fov: 30 }}>
      <directionalLight intensity={2} position={[0, 2, 4]} />
      <ambientLight intensity={0.8} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <Sphere focusRoot={focusRoot} updateRoot={updateRoot} />
      </Suspense>
    </Canvas>
  );
};

export default Render;
