import React from 'react';

interface ProfileViewProps {
  email: string;
  rideshareApps: string[];
  paymentMethod: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ email, rideshareApps, paymentMethod }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
        <span className="text-gray-500 w-32 font-semibold">Email</span>
        <span className="ml-4 text-right">{email}</span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
        <span className="text-gray-500 w-32 font-semibold">Stars</span>
        <span className="ml-4 flex items-center">
          5.0
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.175c.969 0 1.371 1.24.588 1.81l-3.373 2.448 1.287 3.966c.3.921-.755 1.688-1.54 1.116L10 13.011l-3.374 2.447c-.785.572-1.84-.195-1.54-1.116l1.287-3.966L3 8.703c-.783-.57-.38-1.81.588-1.81h4.175l1.286-3.966z" />
              </svg>
            ))}
          </div>
        </span>
      </div>
      <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
        <span className="text-gray-500 w-32 font-semibold">Rideshare Apps</span>
        <div className="ml-4 flex space-x-2">
          {rideshareApps.map((app, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
              {app}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
        <span className="text-gray-500 font-semibold">Payment Method</span>
        <span className="ml-4 text-blue-500 font-semibold">{paymentMethod}</span>
      </div>
    </div>
  );
};

export default ProfileView;
