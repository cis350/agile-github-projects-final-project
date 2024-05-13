// HowItWorksSection.tsx
import React from 'react';
import HowItWorksHeader from './HowItWorksHeader';
import BenefitItem from './BenefitItem';
import GraphicDisplay from './GraphicDisplay';
import PebbleCar from './PebbleCar';

const HowItWorksSection: React.FC = () => (
  <div className="my-20 mt-56">
    <HowItWorksHeader title="How It Works" />
    <GraphicDisplay />
    <div className="flex flex-row items-start justify-evenly">
      <BenefitItem percentage="50%" description="savings on all rides" />
      <BenefitItem percentage="50%" description="wait time decreased on all rides" />
      <BenefitItem percentage="100%" description="friendship guaranteed" />
    </div>
    <div className="h-[80vh] mt-20 flex flex-row">
      <PebbleCar />
      <div className="w-1/2"></div>
      <div className="w-1/2 mt-20">
        <div className="text-4xl text-stone-800 font-bold">
          Save Money.
        </div>
        <div className="text-4xl text-stone-800 font-bold mt-2">
          Make Friends.
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorksSection;
