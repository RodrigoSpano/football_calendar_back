export type TGoogleTokens = {
  refresh_token?: string | null | undefined
  expiry_date?: number | null
  access_token?: string | null
  token_type?: string | null
  id_token?: string | null
  scope?: string
}

type TDatesInf = {
  dateTime?: string
  timeZone?: string
  date?: string
}

export type TEventGoogle = {
  summary: string
  description: string
  location: string
  colorId?: string
  start: TDatesInf
  end: TDatesInf
}

export interface IGoogleModel {
  login(): Promise<string>
  createTokens(code: string): Promise<TGoogleTokens | undefined>
  setCalendarEvent(event: TEventGoogle): Promise<void>
  setCalendarEventQuery(event: TEventGoogle, code: string): Promise<void>
}
