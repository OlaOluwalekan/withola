import LogoSVG from './LogoSVG'

interface LogoProps {
  width?: string
  height?: string
  goBackHome?: () => void
}

const Logo = ({ width = '50', height = '50', goBackHome }: LogoProps) => {
  return (
    <div
      className='flex items-center gap-1.5 cursor-pointer group'
      id='brand-logo'
      onClick={goBackHome}
    >
      <div className='flex items-end text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform'>
        <LogoSVG width={width} height={height} />
        <div className='bg-blue-500 flex w-2 rounded-full aspect-square mb-2 animate-bounce'></div>
      </div>

      <div className='border-l border-custom-border pl-2 ml-1 hidden sm:block transition-colors duration-300'>
        <span className='font-display font-semibold text-xs tracking-tight text-custom-heading'>
          WithOla
        </span>
        <p className='text-[9px] font-mono text-custom-secondary leading-none'>
          Remote // Software Engineer
        </p>
      </div>
    </div>
  )
}

export default Logo
