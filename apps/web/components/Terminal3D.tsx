'use client'

import {
  HelpCircle,
  Maximize,
  Minimize,
  Play,
  Shield,
  Terminal,
} from 'lucide-react'
import { useRef, useState } from 'react'
import {
  aboutResponse,
  contactResponse,
  errorResponse,
  getProjectsCommandResponse,
  getSkillsCommandResponse,
  getWorkExperienceCommandResponse,
  helpResponse,
  neoFetchResponse,
  quickCommands,
} from '../data/terminal'
import { LogLine } from '../types/terminal.interface'
import { useGlobalContext } from '../providers/store'
import { useRouter } from 'next/navigation'

interface TerminalProps {
  isFullScreen?: boolean
}

const Terminal3D = ({ isFullScreen = false }: TerminalProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [history, setHistory] = useState<LogLine[]>([
    {
      text: 'System initialized. Welcome to my developer shell.',
      type: 'success',
    },
    {
      text: 'Type "help" or click one of the quick commands below to begin.',
      type: 'output',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { storeProjects, storeSkills, storeWorkExperiences } =
    useGlobalContext()
  const router = useRouter()

  const runCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    if (!cleanCmd) return

    const newLogs: LogLine[] = [
      ...history,
      { text: `olalekan@withola-dev:~$ ${cmd}`, type: 'input' },
    ]

    switch (cleanCmd) {
      case 'help':
        newLogs.push(helpResponse)
        break
      case 'neofetch':
        newLogs.push(neoFetchResponse)
        break
      case 'about':
        newLogs.push(aboutResponse)
        break
      case 'contact':
        newLogs.push(contactResponse)
        break
      case 'projects':
        newLogs.push(getProjectsCommandResponse(storeProjects))
        break
      case 'skills':
        newLogs.push(getSkillsCommandResponse(storeSkills))
        break
      case 'experience':
        newLogs.push(getWorkExperienceCommandResponse(storeWorkExperiences))
        break
      case 'clear':
        setHistory([
          {
            text: 'Type "help" or click one of the quick commands below to begin.',
            type: 'output',
          },
        ])
        setInputValue('')
        return
      default:
        newLogs.push(errorResponse(cmd))
    }

    setHistory(newLogs)
    setInputValue('')
  }

  const handleMouseLeave = () => {}

  const handleMouseMove = () => {}

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(inputValue)
    }
  }

  return (
    <div
      className={`w-full flex flex-col items-center justify-center overflow-hidden ${isFullScreen ? 'px-0 py-0' : 'py-12 px-4'}`}
      id='terminal-root'
    >
      {!isFullScreen && (
        <div className='max-w-3xl w-full text-center mb-8'>
          <div className='inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-3'>
            <Terminal className='w-3.5 h-3.5 animate-pulse' />
            <span>Interactive Shell Workspace</span>
          </div>
          <h2 className='text-3xl font-sans font-bold text-custom-heading tracking-tight transition-colors duration-300'>
            Developer Core Interface
          </h2>
          <p className='text-xs font-mono text-custom-secondary mt-2'>
            Experience my resume natively inside a persistent 3D-angled
            workstation.
          </p>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full border border-custom-border bg-custom-card shadow-2xl overflow-hidden transition-all duration-200 ease-out ${isFullScreen ? ' rounded-none' : 'max-w-3xl rounded-2xl'}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
        id='terminal-3d-skew-container'
      >
        {/* Title Bar */}
        <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between gap-2 px-4 py-3 bg-custom-inner border-b border-custom-border relative'>
          <div className='flex items-center gap-2'>
            <span className='w-2.5 h-2.5 rounded-full bg-rose-500/80 block' />
            <span className='w-2.5 h-2.5 rounded-full bg-amber-500/80 block' />
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-500/80 block' />
          </div>
          <div className='flex items-center gap-2 text-xs font-mono text-custom-secondary'>
            <Shield className='w-3.5 h-3.5 text-emerald-400' />
            <span>olalekan@withola-dev-core: ~ (bash)</span>
          </div>
          <button
            className='absolute right-2 md:relative cursor-pointer'
            onClick={() =>
              router.push(isFullScreen ? `/?section=terminal` : '/terminal')
            }
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>

        {/* Terminal Body */}
        <div
          className={`p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm text-custom-primary space-y-3 bg-custom-inner/90 scrollbar-thin transition-colors duration-300 ${isFullScreen ? 'h-[calc(100vh-200px)]' : 'h-80 sm:h-100'}`}
        >
          {history.map((log, index) => (
            <div
              key={index}
              className='whitespace-pre-wrap leading-relaxed'
              id={`terminal-line-${index}`}
            >
              {log.type === 'input' && (
                <span className='text-emerald-400 font-bold'>{log.text}</span>
              )}
              {log.type === 'output' && (
                <span className='text-custom-primary'>{log.text}</span>
              )}
              {log.type === 'success' && (
                <span className='text-emerald-400 font-medium'>{log.text}</span>
              )}
              {log.type === 'error' && (
                <span className='text-rose-400 font-bold'>{log.text}</span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* CLI Input line */}
        <div className='flex items-center gap-2 px-4 py-3 bg-custom-inner border-t border-custom-border'>
          <span className='text-emerald-400 font-mono font-bold text-xs sm:text-sm'>
            olalekan@withola:~$
          </span>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1 bg-transparent border-none outline-none focus:ring-0 text-custom-primary font-mono text-xs sm:text-sm placeholder-custom-secondary/40'
            placeholder='Type command and hit Enter...'
            aria-label='Terminal Input'
            id='terminal-input-field'
          />
          <button
            onClick={() => runCommand(inputValue)}
            className='p-1 px-3 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-mono text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer'
            id='btn-terminal-submit'
          >
            <Play className='w-3 h-3 fill-slate-900 stroke-slate-900' />
            <span>EXEC</span>
          </button>
        </div>
      </div>

      {/* Quick Click Commands Panel */}
      <div
        className='flex flex-wrap items-center justify-center gap-2 mt-4 max-w-2xl'
        id='terminal-shortcuts'
      >
        <span className='text-xs font-mono text-slate-500 flex items-center gap-1 mr-1'>
          <HelpCircle className='w-3.5 h-3.5 text-slate-600' />
          <span>Quick Commands:</span>
        </span>

        {quickCommands.map((qc) => (
          <button
            key={qc}
            onClick={() => runCommand(qc)}
            className='px-3 py-1 rounded border border-custom-border bg-custom-inner text-custom-secondary hover:text-emerald-400 hover:border-emerald-500/20 text-xs font-mono transition-all duration-150 cursor-pointer'
            id={`btn-shortcut-${qc}`}
          >
            {qc}
          </button>
        ))}
        <button
          onClick={() => runCommand('clear')}
          className='px-3 py-1 rounded border border-custom-border bg-custom-inner text-custom-muted hover:text-custom-primary text-xs font-mono transition-all duration-150 cursor-pointer'
          id='btn-shortcut-clear'
        >
          clear
        </button>
      </div>
    </div>
  )
}

export default Terminal3D
