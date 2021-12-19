import { Controller, UseFormReturn } from 'react-hook-form';

interface InputFieldProps {
  form: UseFormReturn<{ title: string; description: string }>;
  name: any;
  label: string;
  defaultValue: string;
  disabled: boolean;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  form,
  name,
  defaultValue = '',
  disabled = false,
  placeholder = '',
}) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <input
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className="p-1 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-dark text-blue-dark font-medium"
          // error={!!hasError}
          // helperText={errors[name]?.message}
        />
      )}
    />
  );
};

export default InputField;
