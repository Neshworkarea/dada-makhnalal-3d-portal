import React, { Suspense, useState, useRef } from 'react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingIntensity, setLightingIntensity] = useState([0.6]);
  const [modelScale, setModelScale] = useState([1]);
  const [environment, setEnvironment] = useState<'city' | 'studio' | 'sunset' | 'dawn'>('city');
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const resetView = () => {
    setAutoRotate(true);
    setLightingIntensity([0.6]);
    setModelScale([1]);
    setEnvironment('city');
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div 
        ref={containerRef}
        className={`relative ${isFullscreen ? 'h-screen w-screen' : 'h-[500px] md:h-[600px] lg:h-[700px]'} w-full`}
      >
        {/* Control Panel */}
        <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm rounded-lg p-4 space-y-4 shadow-lg max-w-xs">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex-1"
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Fullscreen
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetView}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Auto Rotate
              </label>
              <Button
                variant={autoRotate ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRotate(!autoRotate)}
                className="w-full"
              >
                {autoRotate ? 'On' : 'Off'}
              </Button>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Lighting: {lightingIntensity[0].toFixed(1)}
              </label>
              <Slider
                value={lightingIntensity}
                onValueChange={setLightingIntensity}
                max={2}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Scale: {modelScale[0].toFixed(1)}x
              </label>
              <Slider
                value={modelScale}
                onValueChange={setModelScale}
                max={3}
                min={0.5}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Environment
              </label>
              <div className="grid grid-cols-2 gap-1">
                {(['city', 'studio', 'sunset', 'dawn'] as const).map((env) => (
                  <Button
                    key={env}
                    variant={environment === env ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEnvironment(env)}
                    className="text-xs capitalize"
                  >
                    {env}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!hasError ? (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))' }}
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
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={4}
              maxDistance={15}
              autoRotate={autoRotate}
              autoRotateSpeed={0.3}
              panSpeed={0.8}
              rotateSpeed={0.8}
              zoomSpeed={1.2}
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