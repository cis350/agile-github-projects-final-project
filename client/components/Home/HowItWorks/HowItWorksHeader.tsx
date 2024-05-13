// HowItWorksHeader.tsx
import React from 'react';

interface HowItWorksHeaderProps {
  title: string;
}

const HowItWorksHeader: React.FC<HowItWorksHeaderProps> = ({ title }) => (
  <h2 className="text-3xl text-center font-semibold mb-10 text-stone-800">
    {title}
  </h2>
);

export default HowItWorksHeader;
