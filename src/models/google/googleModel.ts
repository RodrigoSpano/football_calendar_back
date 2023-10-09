import { google } from 'googleapis'
import { IGoogleModel, TGoogleTokens } from '../../utils'

export default class GoogleModel implements IGoogleModel {
  private oauth2Google = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )

  async login(): Promise<string> {
    const redirectAuthUrl = await this.oauth2Google.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar',
    })
    return redirectAuthUrl
  }
  async createTokens(code: string): Promise<TGoogleTokens | undefined> {
    const { tokens }: { tokens: TGoogleTokens } =
      await this.oauth2Google.getToken(code)
    if (tokens) {
      this.oauth2Google.setCredentials(tokens)
      return tokens
    }
  }
}
