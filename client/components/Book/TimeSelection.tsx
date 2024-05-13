import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Clock, CaretDown } from "@phosphor-icons/react";

interface TimeSelectionProps {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  timeOptions: string[];
  setTimeOptions: (options: string[]) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  setFieldValue: (field: string, value: any) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  selectedOption,
  setSelectedOption,
  timeOptions,
  setTimeOptions,
  selectedTime,
  setSelectedTime,
  setFieldValue
}) => {
  useEffect(() => {
    if (selectedOption === "Later") {
      generateTimeOptions();
    }
  }, [selectedOption]);

  const generateTimeOptions = () => {
    const options: string[] = [];
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    for (
      let time = thirtyMinutesLater;
      time <= twentyFourHoursLater;
      time.setMinutes(time.getMinutes() + 15)
    ) {
      options.push(
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }

    setTimeOptions(options);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "Now") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setFieldValue("pickupTime", currentTime);
      setSelectedTime("");
    } else {
      setFieldValue("pickupTime", "");
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTime(value);
    setFieldValue("pickupTime", value);
  };

  return (
    <div>
      <div className="relative mt-1">
        <Clock
          weight="light"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          size={24}
        />
        <Field
          as="select"
          id="pickupTime"
          name="pickupTime"
          value={selectedOption}
          onChange={handleOptionChange}
          className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
        >
          <option value="Now">Now</option>
          <option value="Later">Later</option>
        </Field>
      </div>
      {selectedOption === "Later" && (
        <div className="pl-11 relative mt-4">
          <Field
            as="select"
            id="selectTime"
            name="selectTime"
            value={selectedTime}
            onChange={handleTimeChange}
            className="p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
          >
            <option value="" disabled>
              Select a time
            </option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Field>
          <CaretDown
            weight="light"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
            size={24}
          />
        </div>
      )}
      <ErrorMessage
        name="pickupTime"
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default TimeSelection;
