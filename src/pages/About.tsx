import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, MapPin } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Dada Makhanlal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring the legacy of Makhanlal Chaturvedi through immersive 3D experiences at MCU
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="shadow-cultural">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-cultural-deep-blue" />
                  <Badge className="bg-cultural-gold text-cultural-gold-foreground">Literary Legacy</Badge>
                </div>
                <CardTitle>Makhanlal Chaturvedi</CardTitle>
                <CardDescription>
                  The celebrated Hindi poet and freedom fighter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Pandit Makhanlal Chaturvedi (1889-1968), affectionately known as "Dada Makhanlal," 
                  was a renowned Hindi poet, writer, and freedom fighter. He played a significant role 
                  in India's independence movement and left an indelible mark on Hindi literature.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-cultural">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-cultural-teal" />
                  <Badge variant="outline">Educational Institution</Badge>
                </div>
                <CardTitle>MCU Campus</CardTitle>
                <CardDescription>
                  Makhanlal Chaturvedi University
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Makhanlal Chaturvedi University of Journalism and Mass Communication stands as a 
                  testament to his legacy. The campus houses various monuments and architectural 
                  marvels that celebrate his contributions to literature and journalism.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-cultural mb-12">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-cultural-gold" />
                <Badge className="bg-cultural-deep-blue text-white">3D Heritage Project</Badge>
              </div>
              <CardTitle>Digital Preservation Initiative</CardTitle>
              <CardDescription>
                Bringing cultural heritage to life through technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                This digital platform showcases the architectural and cultural heritage of the MCU campus 
                through interactive 3D models. Each model has been carefully crafted to preserve the 
                essence and details of these important cultural landmarks.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">3D Models</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-cultural-teal mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Interactive</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-cultural-gold mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Accessible</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-cultural">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-cultural-sage" />
                <Badge variant="outline">Visit Information</Badge>
              </div>
              <CardTitle>Experience the Campus</CardTitle>
              <CardDescription>
                Plan your visit to see these monuments in person
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While these 3D models offer a detailed digital experience, we encourage visitors 
                to explore the actual campus to fully appreciate the scale and beauty of these 
                cultural landmarks. The university welcomes visitors during designated hours.
              </p>
              <div className="text-sm text-muted-foreground">
                <p><strong>Address:</strong> Makhanlal Chaturvedi University, Bhopal, Madhya Pradesh</p>
                <p><strong>Visiting Hours:</strong> Contact the university for current visitor guidelines</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};