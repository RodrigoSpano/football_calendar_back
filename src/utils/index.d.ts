export interface IGoogleModel {
  login(): Promise<string>
  createTokens(code: string): Promise<TGoogleTokens | undefined>
}

export type TGoogleTokens = {
  refresh_token?: string | null | undefined

  expiry_date?: number | null

  access_token?: string | null

  token_type?: string | null

  id_token?: string | null

  scope?: string
}
