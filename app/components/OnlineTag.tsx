import type { HTMLAttributes } from "react";

type OnlineTagProps = HTMLAttributes<HTMLSpanElement> & {
  label?: string;
};

export default function OnlineTag({
  label = "Available",
  className,
  ...props
}: OnlineTagProps) {
  return (
    <span
      role="status"
      className={[
        "inline-flex h-[30px] items-center gap-2 rounded-full",
        "border border-white/10 bg-[#121212]",
        "py-1 pr-3 pl-2.5",
        "font-sans text-[13px] leading-none font-medium tracking-[-0.01em]",
        "text-[#3DDC84]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="relative grid size-2 place-items-center" aria-hidden="true">
        <span className="absolute size-2 animate-online-ping rounded-full bg-[#3DDC84] motion-reduce:animate-none" />
        <span className="absolute size-3.5 rounded-full bg-[#3DDC84]/25 blur-[3px]" />
        <span className="relative size-2 rounded-full bg-[#3DDC84] shadow-[0_0_8px_1px_rgba(61,220,132,0.8)]" />
      </span>
      {label}
    </span>
  );
}
