import { supabase } from './supabase.ts'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')

export class ApiError extends Error {
  readonly status: number
  readonly data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function createUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${apiBaseUrl}${normalizedPath}`
}

function parseResponseBody(body: string): unknown {
  if (!body) return undefined

  try {
    return JSON.parse(body)
  } catch {
    return body
  }
}

function getErrorMessage(data: unknown, response: Response) {
  if (typeof data === 'string' && data.trim()) return data

  if (data && typeof data === 'object') {
    const errorData = data as Record<string, unknown>
    for (const key of ['message', 'error', 'detail']) {
      if (typeof errorData[key] === 'string' && errorData[key]) {
        return errorData[key]
      }
    }
  }

  return `Request failed with ${response.status} ${response.statusText || 'HTTP error'}.`
}

/**
 * Sends a JSON API request and attaches the current Supabase access token.
 */
export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const { data, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    throw new Error(`Unable to read the current authentication session: ${sessionError.message}`)
  }

  const headers = new Headers(options.headers)
  if (!headers.has('Accept')) headers.set('Accept', 'application/json')
  const hasBody = options.body !== undefined && options.body !== null
  if (hasBody && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  const accessToken = data.session?.access_token
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

  const response = await fetch(createUrl(path), { ...options, headers })
  const responseData = parseResponseBody(await response.text())

  if (!response.ok) {
    throw new ApiError(getErrorMessage(responseData, response), response.status, responseData)
  }

  return responseData as T
}

export const fetchApi = apiRequest

