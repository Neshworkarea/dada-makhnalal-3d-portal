import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, RotateCcw, ZoomIn, ZoomOut, RotateCw, Share2, Eye, Check, Palette } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-primary text-primary-foreground">
              <Tag className="mr-1 h-3 w-3" />
              {model.category}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {model.location}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {model.title}
          </h1>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - 3D Viewer and Controls */}
          <div className="lg:col-span-3 space-y-4">
            {/* 3D Model Viewer */}
            <Card className="rounded-xl shadow-lg border-0 bg-card">
              <CardContent className="p-0">
                <ModelViewer 
                  modelPath={model.modelPath}
                  title={model.title}
                  className="rounded-xl h-[500px] md:h-[600px]"
                />
              </CardContent>
            </Card>

            {/* Control Toolbar */}
            <Card className="rounded-xl shadow-md border-0 bg-card">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <RotateCw className="mr-2 h-4 w-4" />
                    Rotate
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <ZoomIn className="mr-2 h-4 w-4" />
                    Zoom In
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <ZoomOut className="mr-2 h-4 w-4" />
                    Zoom Out
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
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
                    {darkBackground ? 'Light' : 'Dark'} BG
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Eye className="mr-2 h-4 w-4" />
                    Front View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* About this Model */}
            <Card className="rounded-xl shadow-md border-0 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">About this Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {model.description}
                </p>
                
                <Button onClick={handleShare} className="w-full rounded-lg bg-primary hover:bg-primary/90">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Model
                </Button>
              </CardContent>
            </Card>

            {/* Interactive Features */}
            <Card className="rounded-xl shadow-md border-0 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary">Interactive Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Rotate the model by dragging with your mouse or swiping on touch devices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Zoom in or out using the scroll wheel or pinch gestures
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Use the control toolbar for quick actions and view adjustments
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Toggle between light and dark backgrounds for optimal viewing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Reset view to return to the original perspective
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 order-first lg:order-last">
            {/* QR Code - moves below on mobile */}
            <div className="block lg:block">
              <QRCodeComponent 
                value={currentUrl}
                title="Scan QR Code"
                className="w-full"
              />
            </div>
            
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
                    No related models available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Model Details */}
            <Card className="rounded-xl shadow-md border-0 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">Model Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Category
                  </h4>
                  <p className="text-sm text-foreground">{model.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Location
                  </h4>
                  <p className="text-sm text-foreground">{model.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};