import { Slider } from "@/components/ui/slider";

interface PrioritySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

export const PrioritySlider = ({ label, value, onChange, description }: PrioritySliderProps) => {
  const getPriorityLabel = (val: number) => {
    if (val <= 2) return "Not Important";
    if (val <= 4) return "Somewhat Important";
    if (val <= 7) return "Important";
    return "Very Important";
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <label className="text-sm font-medium text-foreground">{label}</label>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>
        <span className="text-sm font-semibold text-primary">{getPriorityLabel(value)}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={0}
        max={10}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Not Important</span>
        <span>Very Important</span>
      </div>
    </div>
  );
};
