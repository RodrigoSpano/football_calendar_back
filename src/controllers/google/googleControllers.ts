import { Request, Response } from 'express'
import GoogleModel from '../../models/google/googleModel'

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
}
