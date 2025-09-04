import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelCard } from '@/components/ui/model-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
import modelsData from '@/data/models.json';
import heroImage from '@/assets/statue-hero.jpg';
import statueThumb from '@/assets/statue-thumb.jpg';
import buildingThumb from '@/assets/building-thumb.jpg';
import gardenThumb from '@/assets/garden-thumb.jpg';

const thumbnailMap: Record<string, string> = {
  '/src/assets/statue-thumb.jpg': statueThumb,
  '/src/assets/building-thumb.jpg': buildingThumb,
  '/src/assets/garden-thumb.jpg': gardenThumb,
};

const Index = () => {
  const navigate = useNavigate();

  const handleModelClick = (slug: string) => {
    navigate(`/model/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-cultural-gold text-cultural-gold-foreground font-medium px-4 py-2">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Cultural Heritage in 3D
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Dada Makhanlal <br />
                  <span className="bg-gradient-cultural bg-clip-text text-transparent">
                    in MCU Prisar
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Explore the architectural and cultural heritage of Makhanlal Chaturvedi University 
                  through immersive 3D models and interactive experiences.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 shadow-soft bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Eye className="h-5 w-5" />
                  Explore Models
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/about')}
                  className="gap-2"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cultural-gold"></div>
                  Interactive 3D Models
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cultural-teal"></div>
                  QR Code Sharing
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cultural-sage"></div>
                  Mobile Friendly
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-cultural opacity-10 rounded-2xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Dada Makhanlal statue in MCU campus"
                className="relative rounded-2xl shadow-cultural w-full h-auto max-w-lg mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cultural-deep-blue text-white font-medium px-4 py-2 mb-6">
              3D Model Gallery
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore the Rich Legacy of 30 years
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step into the world of MCU campus with our immersive collection of detailed 3D models.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {modelsData.models.map((model, index) => (
              <div
                key={model.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ModelCard
                  title={model.title}
                  description={model.description}
                  thumbnail={thumbnailMap[model.thumbnail] || model.thumbnail}
                  category={model.category}
                  location={model.location}
                  onClick={() => handleModelClick(model.slug)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cultural">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience Heritage Like Never Before
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Each model offers an immersive 3D experience with interactive controls, 
              detailed views, and shareable QR codes for easy access.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="gap-2 shadow-soft bg-white text-cultural-deep-blue hover:bg-white/90"
              onClick={() => navigate('/about')}
            >
              Learn About Our Mission
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
