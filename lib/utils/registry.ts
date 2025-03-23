import { anthropic } from '@ai-sdk/anthropic'
import { fireworks } from '@ai-sdk/fireworks'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq'
import { mistral } from '@ai-sdk/mistral'
import { openai } from '@ai-sdk/openai'
import { perplexity } from '@ai-sdk/perplexity'
import { createTogetherAI } from '@ai-sdk/togetherai'
import {
  experimental_createProviderRegistry as createProviderRegistry,
  extractReasoningMiddleware,
  wrapLanguageModel
} from 'ai'

export const registry = createProviderRegistry({
  openai,
  anthropic,
  google,
  mistral,
  togetherai: createTogetherAI({
    apiKey: process.env.TOGETHERAI_API_KEY
  }),
  perplexity
})

export function getModel(model: string) {
  const [provider, ...modelNameParts] = model.split(':') ?? []
  const modelName = modelNameParts.join(':')

  // if model is groq and includes deepseek-r1, add reasoning middleware
  if (model.includes('groq') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: groq(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

  // if model is fireworks and includes deepseek-r1, add reasoning middleware
  if (model.includes('fireworks') && model.includes('deepseek-r1')) {
    return wrapLanguageModel({
      model: fireworks(modelName),
      middleware: extractReasoningMiddleware({
        tagName: 'think'
      })
    })
  }

  return registry.languageModel(model)
}

export function isProviderEnabled(providerId: string): boolean {
  switch (providerId) {
    case 'openai':
      return !!process.env.OPENAI_API_KEY
    case 'anthropic':
      return !!process.env.ANTHROPIC_API_KEY
    case 'google':
      return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    case 'mistral':
      return !!process.env.MISTRAL_API_KEY
    case 'togetherai':
      return !!process.env.TOGETHERAI_API_KEY
    case 'perplexity':
      return !!process.env.PERPLEXITY_API_KEY
    default:
      return false
  }
}

export function getToolCallModel(model?: string) {
  const [provider, ...modelNameParts] = model?.split(':') ?? []
  const modelName = modelNameParts.join(':')
  switch (provider) {
    case 'google':
      return getModel('google:gemini-2.0-flash')
    default:
      return getModel('openai:gpt-4o-mini')
  }
}

export function isToolCallSupported(model?: string) {
  const [provider, ...modelNameParts] = model?.split(':') ?? []
  const modelName = modelNameParts.join(':')

  if (provider === 'ollama') {
    return false
  }

  if (provider === 'google') {
    return false
  }

  // Deepseek R1 is not supported
  // Deepseek v3's tool call is unstable, so we include it in the list
  return !modelName?.includes('deepseek')
}

export function isReasoningModel(model: string): boolean {
  if (typeof model !== 'string') {
    return false
  }
  return (
    model.includes('deepseek-r1') ||
    model.includes('deepseek-reasoner') ||
    model.includes('o3-mini')
  )
}
