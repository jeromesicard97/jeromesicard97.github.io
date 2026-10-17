export const PROJECT_ID = '20myx2jl'
export const DATASET = 'production'
export const API_VERSION = '2025-10-17'

export function sanityQueryUrl(query) {
  const encoded = encodeURIComponent(query)
  return `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encoded}`
}

export async function fetchSanity(query) {
  const response = await fetch(sanityQueryUrl(query))
  if (!response.ok) throw new Error(`Sanity HTTP ${response.status}`)
  const payload = await response.json()
  return payload?.result
}

export function sanityImageUrl(image) {
  const ref = image?.asset?._ref || image?.asset?._id
  if (!ref) return null
  // image-{id}-{w}x{h}-{format}
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!match) return null
  const [, id, dims, format] = match
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dims}.${format}`
}
