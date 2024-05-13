import React from 'react';
import Image from 'next/image';
import HowItWorksGraphic from '@/public/HowItWorksGraphic.svg';

const GraphicDisplay: React.FC = () => (
  <div className="h-[100vh] w-full">
    <Image
      src={HowItWorksGraphic}
      alt="How It Works"
      className="absolute left-0"
    />
  </div>
);

export default GraphicDisplay;
