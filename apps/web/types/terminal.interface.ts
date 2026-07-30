export interface LogLine {
  text: string
  type: 'input' | 'output' | 'error' | 'success'
}
