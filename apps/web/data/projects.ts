const borderStyles: Record<string, string> = {
  emerald:
    'border-emerald-500/30 group-hover:border-emerald-500/60 bg-emerald-950/20 shadow-emerald-500/5',
  blue: 'border-blue-500/30 group-hover:border-blue-500/60 bg-blue-950/20 shadow-blue-500/5',
  violet:
    'border-violet-500/30 group-hover:border-violet-500/60 bg-violet-950/20 shadow-violet-500/5',
  amber:
    'border-amber-500/30 group-hover:border-amber-500/60 bg-amber-950/20 shadow-amber-500/5',
  rose: 'border-rose-500/30 group-hover:border-rose-500/60 bg-rose-950/20 shadow-rose-500/5',
  cyan: 'border-cyan-500/30 group-hover:border-cyan-500/60 bg-cyan-950/20 shadow-cyan-500/5',
}

export const borderStylesList = Object.values(borderStyles)

const glowStyles: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

export const glowStylesList = Object.values(glowStyles)
