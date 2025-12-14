import type { ResumeData, ResumePlan } from '../types/resume'

export interface UserCvRecord {
  id: string
  title: string
  plan: ResumePlan
  withPhoto: boolean
  updatedAt: number
  data: ResumeData
}

const API_BASE = 'http://127.0.0.1:8080'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body?.error || 'Request failed')
  return body as T
}

export function listUserCvs(token: string) {
  return request<{ cvs: UserCvRecord[] }>('/api/cv', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function saveUserCv(token: string, payload: { data: ResumeData; withPhoto: boolean; plan: ResumePlan; title?: string; id?: string }) {
  return request<{ cv: UserCvRecord }>('/api/cv', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
}

