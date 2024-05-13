// RideBookingForm.tsx
import React from 'react';
import InputField from './InputField';
import BookRideButton from './BookRideButton';

const RideBookingForm: React.FC = () => (
  <div>
    <form className="flex justify-left items-center space-x-4 mt-4 w-fit">
      <InputField
        placeholder="Enter pick up location"
        iconColor="text-gray-500"
        autoComplete="address-line1"
      />
      <InputField
        placeholder="Enter drop off location"
        iconColor="text-gray-600"
        autoComplete="address-line1"
      />
    </form>
    <BookRideButton />
  </div>
);

export default RideBookingForm;
