import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRCodeComponentProps {
  value: string;
  title?: string;
  size?: number;
  className?: string;
}

export const QRCodeComponent = ({ 
  value, 
  title = "Scan to view", 
  size = 200,
  className 
}: QRCodeComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: 'hsl(var(--foreground))',
          light: 'hsl(var(--background))'
        }
      });
    }
  }, [value, size]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <Card className={`w-fit ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <QrCode className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="rounded-lg bg-background p-4 shadow-soft">
          <canvas 
            ref={canvasRef}
            className="block"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadQRCode}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
};