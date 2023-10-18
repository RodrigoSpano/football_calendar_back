import { google } from 'googleapis'
import { IGoogleModel, TEventGoogle, TGoogleTokens } from '../../utils'
import { OAuth2Client } from 'google-auth-library'

import axios from 'axios'

export default class GoogleModel implements IGoogleModel {
  private oauth2Google: OAuth2Client = new google.auth.OAuth2(
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

  async setCalendarEvent(event: TEventGoogle): Promise<void> {
    const calendar = google.calendar('v3')
    const response = calendar.events.insert({
      auth: this.oauth2Google,
      calendarId: 'primary',
      requestBody: {
        summary: '',
        description: '',
        location: '',
        colorId: '9',
        start: event.start,
        end: event.end,
      },
    })
    console.log(response)
  }

  async setCalendarEventQuery(event: any, code: string): Promise<void> {
    this.oauth2Google.setCredentials({ refresh_token: code })
    const calendar = google.calendar('v3')
    // const calendar = google.calendar({ version: 'v3', auth: this.oauth2Google })
    const response = await calendar.events.insert(
      {
        auth: this.oauth2Google,
        calendarId: 'primary',
        requestBody: event,
        // requestBody: {
        //   summary: event.summary,
        //   description: event.description,
        //   location: event.location,
        //   colorId: '9',
        //   start: event.start,
        //   end: event.end,
        // },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
  }
}
