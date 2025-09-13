import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AuthIllustration = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl" />
      <div className="relative z-10 max-w-sm w-full">
        <div className="aspect-[4/3] w-full rounded-2xl bg-white/70 backdrop-blur-therapeutic shadow-prominent p-6">
          <div className="h-full w-full flex flex-col items-center justify-between">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <div className="w-full rounded-xl border border-border/50 bg-background p-3">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets%2F9a77089a1d9440a79d59f2447a465d11%2F640fae7316624c7ba0a82ce63a20d2fb?format=webp&width=800"
                alt="Login illustration"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Your privacy is protected
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-secondary/20 blur-2xl" />
    </div>
  );
};

export default AuthIllustration;
