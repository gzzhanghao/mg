import { wx } from 'global/wx'

export const canvas = wx.createCanvas()

export const context = canvas.getContext('2d')
