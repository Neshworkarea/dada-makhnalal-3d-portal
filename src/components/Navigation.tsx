import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Info, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Box className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Dada Makhnalal
              </h1>
              <p className="text-xs text-muted-foreground">
                MCU Prisar
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "default" : "ghost"}
                size="sm"
                asChild
                className={cn(
                  "gap-2 transition-all duration-200",
                  location.pathname === path && "shadow-soft"
                )}
              >
                <Link to={path}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};