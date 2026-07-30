export interface ResponseStructure<T> {
  success: boolean
  error: string | null
  data: Record<string, T | null> | null
}
