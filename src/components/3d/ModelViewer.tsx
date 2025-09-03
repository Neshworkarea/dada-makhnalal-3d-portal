import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, PresentationControls, Text, Box } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';

interface ModelProps {
  url: string;
}

const Model = ({ url }: ModelProps) => {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1.5} />;
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

export const ModelViewer = ({ modelPath, title, className }: ModelViewerProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="h-[500px] md:h-[600px] lg:h-[700px] w-full relative">
        {!hasError ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))' }}
            onError={() => setHasError(true)}
          >
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 1500 }}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 3, Math.PI / 3]}
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <Model url={modelPath} />
              </PresentationControls>
              <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
              <Environment preset="city" />
            </Suspense>
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={3}
              maxDistance={8}
              autoRotate
              autoRotateSpeed={0.5}
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
};

// Preload models for better performance
useGLTF.preload('/models/statue.glb');
useGLTF.preload('/models/main-building.glb');
useGLTF.preload('/models/garden.glb');