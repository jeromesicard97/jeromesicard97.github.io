import {fetchSanity, sanityImageUrl} from './sanity-config.js'

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')
const main = document.querySelector('.custom-page-main')
const status = document.getElementById('status')

const QUERY = `*[_type == "customPage" && slug.current == $slug][0]{
  title,
  blocks[]{
    _key,
    _type,
    text,
    alignment,
    alt,
    image{ asset->{_id, url} }
  }
}`

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function render(page) {
  if (!main) return
  document.title = page.title || 'Page'
  main.replaceChildren()

  const heading = document.createElement('h1')
  heading.className = 'custom-page-title'
  heading.textContent = page.title || ''
  main.appendChild(heading)

  for (const block of page.blocks || []) {
    if (block._type === 'pageText') {
      const p = document.createElement('p')
      p.className = 'custom-page-text'
      p.style.textAlign = block.alignment === 'center' ? 'center' : 'justify'
      p.innerHTML = escapeHtml(block.text || '').replace(/\n/g, '<br>')
      main.appendChild(p)
      continue
    }

    if (block._type === 'pageImage') {
      const src = block.image?.asset?.url || sanityImageUrl(block.image)
      if (!src) continue
      const img = document.createElement('img')
      img.src = src
      img.alt = block.alt || ''
      img.className = 'custom-page-image'
      main.appendChild(img)
    }
  }
}

async function load() {
  if (!slug) {
    if (status) status.textContent = 'Missing page slug.'
    return
  }

  try {
    // Sanity CDN HTTP API does not accept GROQ params the same way — inline safely
    const safe = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    const data = await fetchSanity(
      `*[_type == "customPage" && slug.current == "${safe}"][0]{
        title,
        blocks[]{
          _key,
          _type,
          text,
          alignment,
          alt,
          image{ asset->{_id, url} }
        }
      }`,
    )
    if (!data) {
      if (status) status.textContent = 'Page not found.'
      return
    }
    render(data)
  } catch (error) {
    console.error(error)
    if (status) status.textContent = 'Could not load page.'
  }
}

load()
