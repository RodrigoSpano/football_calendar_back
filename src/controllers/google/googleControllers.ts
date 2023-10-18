import { Request, Response } from 'express'
import GoogleModel from '../../models/google/googleModel'

const mock = {
  summary: 'Arsenal vs Manchester City',
  description: 'Fecha 8 de la premier league',
  location: 'casa de los gunners',
  start: {
    // dateTime: '2023-10-12T12:15:00-07:00',
    // timeZone: 'America/Los_Angeles',
    dateTime: new Date('2023-10-10T19:00:00').toISOString(),
  },
  end: {
    // dateTime: '2023-10-12T14:30:00-07:00',
    // timeZone: 'America/Los_Angeles',
    dateTime: new Date('2023-10-10T21:00:00').toISOString(),
  },
}

export default class GoogleControllers {
  private googleModel: GoogleModel = new GoogleModel()

  async login(req: Request, res: Response) {
    try {
      const uri = await this.googleModel.login()
      return res.redirect(uri)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async createTokens(req: { query: { code: string } }, res: Response) {
    try {
      const { code } = req.query
      const tokens = await this.googleModel.createTokens(code)
      return res.status(201).json({ tokens })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async setCalendarEvent(req: Request, res: Response) {
    try {
      await this.googleModel.setCalendarEvent(req.body)
      return res.status(201).json({ success: true, message: 'Event Scheduled' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async setCalendarEventQuery(req: { query: { code: string } }, res: Response) {
    try {
      await this.googleModel.setCalendarEventQuery(mock, req.query.code)
      return res.status(201).json({ success: true, message: 'Event Scheduled' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
