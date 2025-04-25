import { Input } from "./input";
import { Control, useController } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  type?: string;
}

export function FormInput({
  name,
  control,
  placeholder,
  className,
  type = "text",
}: FormInputProps) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <Input
      type={type}
      onChange={onChange}
      value={value || ""}
      placeholder={placeholder}
      className={className}
    />
  );
}
