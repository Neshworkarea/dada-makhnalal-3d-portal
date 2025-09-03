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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="lg:flex-1">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-cultural-gold text-cultural-gold-foreground">
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
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {model.description}
                </p>
              </div>

              <ModelViewer 
                modelPath={model.modelPath}
                title={model.title}
                className="shadow-cultural"
              />
            </div>

            <div className="lg:w-80 lg:shrink-0">
              <div className="sticky top-24">
                <QRCodeComponent 
                  value={currentUrl}
                  title="Share this model"
                  className="w-full"
                />
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Model Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-1">
                        3D Features
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Interactive 3D viewing</li>
                        <li>• Zoom and rotate controls</li>
                        <li>• Auto-rotation enabled</li>
                        <li>• Mobile friendly</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};