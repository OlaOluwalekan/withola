interface LogoProps {
  width?: string
  height?: string
  goBackHome?: () => void
}

const Logo = ({ width = '50', height = '50', goBackHome }: LogoProps) => {
  const strokeWidth = 20
  return (
    <div
      className='flex items-center gap-1.5 cursor-pointer group'
      id='brand-logo'
      onClick={goBackHome}
    >
      <div className='flex items-end text-2xl font-black text-emerald-400 group-hover:scale-105 transition-transform'>
        <svg
          height={height}
          width={width}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 200 200'
        >
          <path
            d='M75 35 Q20 100 75 165'
            fill='transparent'
            strokeWidth={strokeWidth}
            className='stroke-emerald-400'
          />
          <path
            d='M125 35 Q180 100 125 165'
            fill='transparent'
            className='stroke-emerald-400'
            strokeWidth={strokeWidth}
          />
          <path
            d='M130 20 L70 180'
            fill='transparent'
            className='stroke-blue-500'
            strokeWidth={strokeWidth}
          />
        </svg>
        <span className='text-blue-500 -ml-2'>.</span>
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
