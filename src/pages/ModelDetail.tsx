import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, RotateCcw, ZoomIn, ZoomOut, RotateCw, Share2, Eye, Check, Palette, Maximize2, X, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelViewer } from '@/components/3d/ModelViewer';
import { QRCodeComponent } from '@/components/ui/qr-code';
import modelsData from '@/data/models.json';

export const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = modelsData.models.find(m => m.slug === slug);
  const [darkBackground, setDarkBackground] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightingIntensity, setLightingIntensity] = useState(0.6);
  const [environment, setEnvironment] = useState<'city' | 'studio' | 'sunset' | 'dawn'>('city');
  const modelViewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get related models (all models except current one)
  const relatedModels = modelsData.models.filter(m => m.slug !== slug);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Model not found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  const handleShare = () => {
    navigator.share?.({
      title: model.title,
      text: model.description,
      url: currentUrl,
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentUrl);
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleRotate = () => {
    modelViewerRef.current?.rotate();
  };

  const handleZoomIn = () => {
    modelViewerRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    modelViewerRef.current?.zoomOut();
  };

  const handleReset = () => {
    modelViewerRef.current?.resetView();
  };

  const handleFrontView = () => {
    modelViewerRef.current?.setFrontView();
  };

  const handleLightingChange = () => {
    const newIntensity = lightingIntensity === 0.6 ? 1.0 : lightingIntensity === 1.0 ? 0.3 : 0.6;
    setLightingIntensity(newIntensity);
    modelViewerRef.current?.setLightingIntensity(newIntensity);
  };

  const handleEnvironmentChange = () => {
    const environments: Array<'city' | 'studio' | 'sunset' | 'dawn'> = ['city', 'studio', 'sunset', 'dawn'];
    const currentIndex = environments.indexOf(environment);
    const nextEnvironment = environments[(currentIndex + 1) % environments.length];
    setEnvironment(nextEnvironment);
    modelViewerRef.current?.setEnvironment(nextEnvironment);
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      <div className={`container mx-auto px-4 py-6 ${isFullscreen ? 'h-full flex flex-col' : ''}`}>
        {!isFullscreen && (
          <>
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all models
              </Link>
            </Button>
            
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {model.title}
              </h1>
            </div>
          </>
        )}

        {isFullscreen && (
          <div className="absolute top-4 right-4 z-50">
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Main Layout */}
        <div className={`${isFullscreen ? 'h-full flex flex-col' : 'grid grid-cols-1 lg:grid-cols-4 gap-6'}`}>
          {/* Left Column - 3D Viewer and Controls */}
          <div className={`${isFullscreen ? 'flex-1 flex flex-col' : 'lg:col-span-3'} space-y-4`}>
            {/* 3D Model Viewer */}
            <div className={`relative ${isFullscreen ? 'flex-1' : ''}`}>
              <Card className="rounded-xl shadow-lg border-0 bg-card h-full">
                <CardContent className="p-0 h-full">
                  <ModelViewer 
                    ref={modelViewerRef}
                    modelPath={model.modelPath}
                    title={model.title}
                    darkBackground={darkBackground}
                    className={`rounded-xl ${isFullscreen ? 'h-full' : 'h-[500px] md:h-[600px]'}`}
                  />
                </CardContent>
              </Card>
              
              {/* Fullscreen Toggle Button */}
              {!isFullscreen && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Control Toolbar */}
            {!isFullscreen && (
              <Card className="rounded-xl shadow-md border-0 bg-card">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleRotate}>
                      <RotateCw className="mr-2 h-4 w-4" />
                      0
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleZoomIn}>
                      <ZoomIn className="mr-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleZoomOut}>
                      <ZoomOut className="mr-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleReset}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-lg"
                      onClick={() => setDarkBackground(!darkBackground)}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      {darkBackground ? 'White' : 'Dark'}
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleLightingChange}>
                      {lightingIntensity}
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleEnvironmentChange}>
                      BG: {environment}
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleFrontView}>
                      <Eye className="mr-2 h-4 w-4" />
                      Front
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About this Model */}
            {!isFullscreen && (
              <Card className="rounded-xl shadow-md border-0 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-primary">About this Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {model.description}
                  </p>
                  
                  <Button onClick={handleShare} className="rounded-lg bg-primary hover:bg-primary/90">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Model
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Interactive Features */}
            {!isFullscreen && (
              <Card className="rounded-xl shadow-md border-0 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-primary">Interactive Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Rotate the model by dragging with your mouse or swiping on touch devices
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Zoom in or out using the scroll wheel or pinch gestures
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Click on labeled parts to view detailed information
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Use the controls panel to toggle visibility of different components
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          {!isFullscreen && (
            <div className="lg:col-span-1 space-y-4 order-first lg:order-last">
              {/* Model Title and Description at Top */}
              <div className="space-y-3">
                <div className="text-right">
                  <h2 className="text-xl font-bold text-foreground">{model.title}</h2>
                  <p className="text-sm text-muted-foreground">Interactive 3D Model</p>
                </div>
              </div>

              {/* QR Code */}
              <Card className="rounded-xl shadow-md border-0 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    Model QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <QRCodeComponent 
                    value={currentUrl}
                    title=""
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Scan this QR code to access this 3D model directly on another device
                  </p>
                </CardContent>
              </Card>
              
              {/* Related Models */}
              <Card className="rounded-xl shadow-md border-0 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary">Related Models</CardTitle>
                </CardHeader>
                <CardContent>
                  {relatedModels.length > 0 ? (
                    <div className="space-y-3">
                      {relatedModels.slice(0, 2).map((relatedModel) => (
                        <Link 
                          key={relatedModel.id} 
                          to={`/model/${relatedModel.slug}`}
                          className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <h4 className="font-medium text-sm text-foreground mb-1">
                            {relatedModel.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {relatedModel.category}
                          </p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No related models found
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};