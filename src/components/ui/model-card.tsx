import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  location: string;
  onClick: () => void;
  className?: string;
}

export const ModelCard = ({
  title,
  description,
  thumbnail,
  category,
  location,
  onClick,
  className
}: ModelCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300",
        "hover:shadow-cultural hover:-translate-y-2 hover:scale-[1.02]",
        "bg-gradient-to-br from-card to-card/50 border-border/50",
        "backdrop-blur-sm",
        className
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm">
            <Eye className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
        <Badge className="absolute top-3 left-3 bg-cultural-gold text-cultural-gold-foreground font-medium">
          {category}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};