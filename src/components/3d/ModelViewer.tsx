import React, { Suspense, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, PresentationControls, Text, Box } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Loader2, AlertCircle, Maximize2, RotateCcw, Sun, Moon } from 'lucide-react';

interface ModelProps {
  url: string;
  scale?: number;
}

const Model = ({ url, scale = 1 }: ModelProps) => {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} />;
  } catch (error) {
    // Fallback placeholder when model fails to load
    return (
      <group>
        <Box args={[2, 3, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8B5CF6" />
        </Box>
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color="#64748B"
          anchorX="center"
          anchorY="middle"
        >
          3D Model Preview
        </Text>
      </group>
    );
  }
};

interface ModelViewerProps {
  modelPath: string;
  title: string;
  className?: string;
  darkBackground?: boolean;
}

export interface ModelViewerRef {
  rotate: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  setFrontView: () => void;
  setLightingIntensity: (intensity: number) => void;
  setEnvironment: (env: 'city' | 'studio' | 'sunset' | 'dawn') => void;
}

const LoadingSpinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading 3D model...</p>
    </div>
  </div>
);

const ModelError = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4 text-center">
      <AlertCircle className="h-12 w-12 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium text-foreground">3D Model Preview</p>
        <p className="text-xs text-muted-foreground">Interactive model will be available soon</p>
      </div>
    </div>
  </div>
);

export const ModelViewer = forwardRef<ModelViewerRef, ModelViewerProps>(({ modelPath, title, className, darkBackground = false }, ref) => {
  const [hasError, setHasError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingIntensity, setLightingIntensity] = useState([0.6]);
  const [modelScale, setModelScale] = useState([1]);
  const [environment, setEnvironment] = useState<'city' | 'studio' | 'sunset' | 'dawn'>('city');
  const controlsRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    rotate: () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
        setAutoRotate(!autoRotate);
      }
    },
    zoomIn: () => {
      if (controlsRef.current) {
        controlsRef.current.dollyIn(0.9);
        controlsRef.current.update();
      }
    },
    zoomOut: () => {
      if (controlsRef.current) {
        controlsRef.current.dollyOut(0.9);
        controlsRef.current.update();
      }
    },
    resetView: () => {
      setAutoRotate(true);
      setLightingIntensity([0.6]);
      setModelScale([1]);
      setEnvironment('city');
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    },
    setFrontView: () => {
      if (controlsRef.current) {
        controlsRef.current.object.position.set(0, 0, 8);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    },
    setLightingIntensity: (intensity: number) => {
      setLightingIntensity([intensity]);
    },
    setEnvironment: (env: 'city' | 'studio' | 'sunset' | 'dawn') => {
      setEnvironment(env);
    }
  }));

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative w-full h-full">
        {!hasError ? (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ 
              background: darkBackground 
                ? 'linear-gradient(135deg, hsl(220, 13%, 18%), hsl(220, 13%, 28%))' 
                : 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))' 
            }}
            onError={() => setHasError(true)}
          >
            <ambientLight intensity={lightingIntensity[0] * 0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={lightingIntensity[0]} />
            <pointLight position={[-10, -10, -10]} intensity={lightingIntensity[0] * 0.5} />
            <directionalLight position={[5, 5, 5]} intensity={lightingIntensity[0] * 0.8} />
            
            <Suspense fallback={null}>
              <Model url={modelPath} scale={modelScale[0]} />
              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <Environment preset={environment} />
            </Suspense>
            
            <OrbitControls 
              ref={controlsRef}
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={5}
              maxDistance={15}
              autoRotate={autoRotate}
              autoRotateSpeed={0.3}
              panSpeed={0.8}
              rotateSpeed={0.8}
              zoomSpeed={1.2}
              target={[0, 0, 0]}
            />
          </Canvas>
        ) : (
          <ModelError />
        )}
        
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={<LoadingSpinner />}>
            <div />
          </Suspense>
        </div>
      </div>
    </Card>
  );
});

// Preload models for better performance
useGLTF.preload('/models/statue.glb');
useGLTF.preload('/models/main-building.glb');
useGLTF.preload('/models/garden.glb');