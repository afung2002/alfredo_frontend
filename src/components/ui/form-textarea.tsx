import { Textarea } from "./textarea";
import { Control, useController } from "react-hook-form";

import { cn } from "@src/utils/uiUtils";
import { Label } from "./label";

interface FormTextAreaProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  rows?: number;
  error?: boolean;
}

export function FormTextArea({
  name,
  control,
  placeholder,
  className,
  label,
  labelClassName,
  rows = 4,
  error,
}: FormTextAreaProps) {
  const {
    field: { onChange, value },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}
      <Textarea
        id={name}
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "mt-1",
          (error || fieldError) &&
            "border-destructive focus-visible:ring-destructive"
        )}
      />
      {fieldError?.message && (
        <p className="text-sm text-destructive mt-1">{fieldError.message}</p>
      )}
    </div>
  );
}
