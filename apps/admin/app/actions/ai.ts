'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateAiSummary(
  readme: string,
): Promise<{ summary?: string; error?: string }> {
  try {
    if (!readme || readme.length < 200) {
      return { error: 'Readme content is too short to generate a summary.' }
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set.')
      return { error: 'AI summary unavailable' }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' })

    const prompt = `
      Please provide a plain text architecture summary of the following project README content.
      The summary must be between 200 and 400 characters long.
      Do NOT use any markdown formatting or rich text (no asterisks, no bolding, no lists, just plain text).

      README CONTENT:
      """
      ${readme}
      """
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text().trim()

    // Remove markdown asterisks just in case
    text = text.replace(/[*_#]/g, '')

    return { summary: text }
  } catch (error: any) {
    console.error('Error generating AI summary:', error)
    return { error: error.message || 'Failed to generate AI summary.' }
  }
}
