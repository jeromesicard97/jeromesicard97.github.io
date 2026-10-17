import {fetchSanity, sanityImageUrl} from './sanity-config.js'

const QUERY = `*[_type == "archivePage"][0]{
  title,
  blocks[]{
    _key,
    _type,
    text,
    alignment,
    alt,
    imageUrl,
    linkUrl,
    image{
      asset->{_id, _ref, url}
    }
  }
}`

const main = document.querySelector('.archive-main')
const titleEl = document.querySelector('title')

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function renderBlocks(blocks) {
  if (!main) return
  main.replaceChildren()

  for (const block of blocks || []) {
    if (block._type === 'archiveSeparator') {
      const sep = document.createElement('div')
      sep.className = 'archive-sep'
      sep.setAttribute('aria-hidden', 'true')
      sep.textContent = '*   *   *'
      main.appendChild(sep)
      continue
    }

    if (block._type === 'archiveText') {
      const wrap = document.createElement('div')
      wrap.className = 'archive-copy'
      wrap.dataset.align = block.alignment === 'center' ? 'center' : 'justify'
      const p = document.createElement('p')
      p.style.textAlign = block.alignment === 'center' ? 'center' : 'justify'
      p.innerHTML = escapeHtml(block.text || '').replace(/\n/g, '<br>')
      wrap.appendChild(p)
      main.appendChild(wrap)
      continue
    }

    if (block._type === 'archiveImage') {
      const src =
        block.image?.asset?.url ||
        sanityImageUrl(block.image) ||
        block.imageUrl
      if (!src) continue

      const link = document.createElement('a')
      link.className = 'archive-image-link'
      link.href = block.linkUrl || src
      if (/^https?:\/\//i.test(link.href)) {
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
      }

      const img = document.createElement('img')
      img.loading = 'lazy'
      img.src = src
      img.alt = block.alt || ''
      link.appendChild(img)
      main.appendChild(link)
    }
  }
}

async function loadArchive() {
  try {
    const data = await fetchSanity(QUERY)
    if (!data?.blocks?.length) throw new Error('No archive content')
    if (data.title && titleEl) titleEl.textContent = data.title
    renderBlocks(data.blocks)
  } catch (error) {
    console.warn('Archive Sanity fetch failed; keeping static markup.', error)
  }
}

loadArchive()
