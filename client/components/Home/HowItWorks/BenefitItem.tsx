import React from 'react';

interface BenefitItemProps {
  percentage: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ percentage, description }) => (
  <div className="flex flex-col items-center space-y-2 w-40 justify-center">
    <div className="text-3xl font-semibold text-center text-stone-800">{percentage}</div>
    <p className="text-xl text-center text-stone-800">{description}</p>
  </div>
);

export default BenefitItem;
