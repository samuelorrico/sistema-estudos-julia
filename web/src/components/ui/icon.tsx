import { cn } from "@/lib/utils";

// Ícone no estilo Google (Material Symbols Rounded — carregado no layout).
// Tamanho controlado por font-size (use classes text-* / size via fontSize).
export function Icon({
  name,
  filled = false,
  className,
  ...props
}: {
  name: string;
  filled?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      translate="no"
      className={cn(
        "material-symbols-rounded shrink-0 select-none leading-none",
        filled && "ms-filled",
        className,
      )}
      {...props}
    >
      {name}
    </span>
  );
}
