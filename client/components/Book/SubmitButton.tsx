import React from 'react';

const SubmitButton: React.FC = () => (
  <button
    type="submit"
    className="w-full bg-black text-white py-3 px-4 rounded-3xl shadow hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Request a Ride
  </button>
);

export default SubmitButton;
