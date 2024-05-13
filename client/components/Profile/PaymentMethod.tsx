import React from 'react';
import { Field } from 'formik';

interface PaymentMethodProps {
  paymentMethod: string;
  setFieldValue: (field: string, value: any) => void;
}

const paymentOptions = ["Venmo", "Zelle", "PayPal"];

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setFieldValue }) => {
  return (
    <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
      <label className="text-gray-500 font-semibold">Change Preferred Payment</label>
      <Field
        as="select"
        name="paymentMethod"
        className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full appearance-none"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("paymentMethod", e.target.value)}
        value={paymentMethod}
      >
        {paymentOptions.map(method => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default PaymentMethod;
