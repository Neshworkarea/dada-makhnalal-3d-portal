import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModelViewer } from '@/components/3d/ModelViewer';
import { QRCodeComponent } from '@/components/ui/qr-code';
import modelsData from '@/data/models.json';

export const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = modelsData.models.find(m => m.slug === slug);

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

  return (
    <div className="min-h-screen bg-gradient-subtle">
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
            <Badge className="bg-cultural-gold text-cultural-gold-foreground">
              <Tag className="mr-1 h-3 w-3" />
              {model.category}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {model.location}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {model.title}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {model.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 3D Viewer - Takes up most space */}
          <div className="xl:col-span-3">
            <ModelViewer 
              modelPath={model.modelPath}
              title={model.title}
              className="shadow-cultural h-[600px] md:h-[700px]"
            />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* QR Code */}
            <QRCodeComponent 
              value={currentUrl}
              title="Model QR Code"
              className="w-full"
            />
            
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About this Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Explore the detailed 3D representation of {model.title} with interactive viewing capabilities and comprehensive information.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      Category
                    </h4>
                    <p className="text-foreground">{model.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-1">
                      Location
                    </h4>
                    <p className="text-foreground">{model.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interactive Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Rotate the model by dragging with your mouse or swiping on touch devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Zoom in or out using the scroll wheel or pinch gestures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Use the controls panel to toggle visibility of different components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Adjust lighting and environment settings for optimal viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Enter fullscreen mode for immersive experience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};