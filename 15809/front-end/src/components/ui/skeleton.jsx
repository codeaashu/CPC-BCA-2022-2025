import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  width,
  height,
  circle = false,
  ...props
}) {
  const styles = {
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {})
  };

  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-800/50", 
        circle ? "rounded-full" : "", 
        className
      )}
      style={styles}
      {...props}
    />
  )
}
