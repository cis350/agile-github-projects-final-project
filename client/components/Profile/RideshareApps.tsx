import React from 'react';
import { Field } from 'formik';

interface RideshareAppsProps {
  rideshareApps: string[];
  addRideshareApp: (app: string) => void;
  setFieldValue: (field: string, value: any) => void;
}

const rideshareOptions = ["Curb", "Uber", "Lyft"];

const RideshareApps: React.FC<RideshareAppsProps> = ({ rideshareApps, addRideshareApp, setFieldValue }) => {
  return (
    <>
    
    <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
      <label className="text-gray-500 font-semibold">Change Preferred Rideshare Apps</label>
      <div className="ml-4 flex flex-wrap space-x-2">
        {rideshareApps.map((app, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center space-x-1">
            <span>{app}</span>
            <button
              type="button"
              onClick={() => {
                console.log(`Removing app at index ${index}: ${app}`);
                setFieldValue('rideshareApps', rideshareApps.filter((_, i) => i !== index));
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </span>
        ))}
        {rideshareApps.length < 3 && (
          <Field
            as="select"
            name="rideshareApp"
            className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 appearance-none"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedApp = e.target.value;
              console.log(`Adding app: ${selectedApp}`);
              console.log(`Adding app: ${selectedApp}`);
              if (selectedApp && !rideshareApps.includes(selectedApp)) {
                addRideshareApp(selectedApp);
                setFieldValue("rideshareApps", [...rideshareApps, selectedApp]);
              }
            }}
            value=""
          >
            <option value="" disabled>
              Add +
            </option>
            {rideshareOptions.filter(app => !rideshareApps.includes(app)).map(app => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </Field>
        )}
      </div>
    </div>
    </>
  );
};

export default RideshareApps;
