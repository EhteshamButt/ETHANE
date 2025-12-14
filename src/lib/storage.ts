/** 
 * storage.ts
 * Local persistence helpers for profile and country recents.
 * - Uses localStorage with JSON serialization and safe parsing.
 */

export interface SavedProfile {
  email?: string
  withPhoto?: boolean
  plan?: 'student' | 'pro' | 'advanced'
  data?: any // ResumeData shape, kept generic to avoid cross-import
  country?: string
  savedAt?: number
}

export interface SavedDraft {
  data?: any
  withPhoto?: boolean
  plan?: 'student' | 'pro' | 'advanced'
  savedAt?: number
}

/** Get and set JSON safely in localStorage. */
function getJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
function setJSON<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota or disabled storage
  }
}

/** Profile storage */
const PROFILE_KEY = 'mako_profile'

export function loadProfile(): SavedProfile | null {
  return getJSON<SavedProfile>(PROFILE_KEY)
}
export function saveProfile(profile: SavedProfile) {
  setJSON<SavedProfile>(PROFILE_KEY, { ...profile, savedAt: Date.now() })
}
export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY)
  } catch {}
}

/** Draft resume storage */
const DRAFT_KEY = 'mako_resume_draft'
export function loadDraftResume(): SavedDraft | null {
  return getJSON<SavedDraft>(DRAFT_KEY)
}
export function saveDraftResume(draft: SavedDraft) {
  setJSON<SavedDraft>(DRAFT_KEY, { ...draft, savedAt: Date.now() })
}
export function clearDraftResume() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {}
}

/** Recent countries storage */
const RECENT_COUNTRIES_KEY = 'mako_recent_countries'
export function loadRecentCountries(): string[] {
  return getJSON<string[]>(RECENT_COUNTRIES_KEY) ?? []
}
export function pushRecentCountry(codeOrName: string) {
  const list = loadRecentCountries()
  const next = [codeOrName, ...list.filter((c) => c !== codeOrName)].slice(0, 8)
  setJSON(RECENT_COUNTRIES_KEY, next)
}
