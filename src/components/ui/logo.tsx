import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative w-8 h-8 flex flex-col justify-center gap-[3px]">
                {/* Top Pill - Blue */}
                <div className="w-full h-[6px] rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                {/* Middle Pill - Indigo (Primary) */}
                <div className="w-full h-[6px] rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                {/* Bottom Pill - Purple (Secondary) */}
                <div className="w-full h-[6px] rounded-full bg-secondary shadow-[0_0_10px_rgba(124,58,237,0.3)]" />
            </div>

            {showText && (
                <span className="text-xl font-bold font-heading tracking-tight text-foreground">
                    Batch <span className="text-muted-foreground">Sourcing</span>
                </span>
            )}
        </div>
    )
}
