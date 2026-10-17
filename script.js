import {fetchSanity} from './js/sanity-config.js'

const SOURCE_ORIGIN = 'https://jeromesicard97.github.io'

const NAV_QUERY = `*[_type == "navigation"][0]{
  title,
  links[]{
    key,
    number,
    label,
    mobileLabel,
    x,
    y,
    position,
    initiallyVisible,
    action,
    behavior,
    reveals,
    destinationType,
    externalUrl,
    href,
    builtInPage,
    openInNewTab,
    customPage->{
      _id,
      title,
      "slug": slug.current
    }
  }
}`

const LEGACY_CENTERS = {
  topLeft: {x: 17, y: 19},
  middleLeft: {x: 27, y: 43},
  bottomLeft: {x: 15, y: 83},
  middleTop: {x: 36.5, y: 27},
  middle: {x: 50, y: 50},
  middleBottom: {x: 39, y: 59},
  leftTopRight: {x: 69, y: 17},
  rightTopRight: {x: 90.5, y: 30},
  middleRight: {x: 82, y: 55.5},
  leftBottomRight: {x: 71, y: 69.5},
  rightBottomRight: {x: 87, y: 86},
}

const ASSETS_QUERY = `*[_type == "assetsSettings"][0]{ urls[]{ url, label } }`

const FALLBACK_NAVIGATION = {
  title: 'Jerome Sicard',
  links: [
    {
      key: 'enter',
      number: 1,
      label: 'ENTER',
      mobileLabel: 'JEROME SICARD',
      position: 'middle',
      action: 'reveal',
      initiallyVisible: true,
      reveals: ['work', 'info'],
    },
    {
      key: 'work',
      number: 2,
      label: 'WORK',
      position: 'middleTop',
      action: 'reveal',
      initiallyVisible: false,
      reveals: [
        'interburden',
        'geologyCamp',
        'noLoveInAlaska',
        'divineTheory',
        'archive',
      ],
    },
    {
      key: 'info',
      number: 3,
      label: 'INFO',
      position: 'rightBottomRight',
      action: 'reveal',
      initiallyVisible: false,
      reveals: ['assets', 'about', 'instagram'],
    },
    {
      key: 'interburden',
      number: 4,
      label: 'INTERBURDEN',
      position: 'middleLeft',
      action: 'link',
      destinationType: 'external',
      externalUrl: 'https://www.placeholdergallery.com/interburden.html',
      openInNewTab: true,
      initiallyVisible: false,
    },
    {
      key: 'geologyCamp',
      number: 5,
      label: 'GEOLOGY CAMP',
      position: 'bottomLeft',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'AssortedGarments.html',
      initiallyVisible: false,
    },
    {
      key: 'noLoveInAlaska',
      number: 6,
      label: 'NO LOVE IN ALASKA',
      position: 'leftBottomRight',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'NoLoveInAlaska.html',
      initiallyVisible: false,
    },
    {
      key: 'divineTheory',
      number: 7,
      label: 'DIVINE THEORY',
      position: 'leftTopRight',
      action: 'link',
      destinationType: 'external',
      externalUrl: 'https://www.placeholdergallery.com/divinetheory.html',
      openInNewTab: true,
      initiallyVisible: false,
    },
    {
      key: 'archive',
      number: 8,
      label: 'ARCHIVE',
      position: 'middleBottom',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'Archive.html',
      initiallyVisible: false,
    },
    {
      key: 'about',
      number: 9,
      label: 'ABOUT',
      position: 'middleRight',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'About.html',
      initiallyVisible: false,
    },
    {
      key: 'instagram',
      number: 10,
      label: 'INSTAGRAM',
      position: 'rightTopRight',
      action: 'link',
      destinationType: 'external',
      externalUrl: 'https://www.instagram.com/closebutnosicard/',
      openInNewTab: true,
      initiallyVisible: false,
    },
    {
      key: 'assets',
      number: 11,
      label: 'ASSETS',
      position: 'topLeft',
      action: 'random',
      initiallyVisible: false,
    },
  ],
}

const FALLBACK_ASSETS = [
  'https://www.youtube.com/watch?v=FBlnrRUVfo0',
  'https://cielo-saucedo.com/',
  'https://sadiecornettecook.com/',
  'https://nickdrain.com/',
  'https://www.zakziebell.com/',
  'https://charlottezhang.xyz/',
  'https://kevinhernandezrosa.com/',
  'https://coopercampbell.info/',
  'https://www.jumanamanna.com/',
  'https://williamwiebe.com/',
  'https://dakotahiggins.com/',
  'https://emmelines.biz/',
  `${SOURCE_ORIGIN}/WebImages/PDFs/1994-Stryker.pdf`,
  `${SOURCE_ORIGIN}/WebImages/PDFs/DEmilio,%20Capitalism%20and%20Gay%20Identity.pdf`,
]

/** Map root-level PDF paths (removed in rebuild) to WebImages/PDFs/ */
function rewriteAssetUrl(url) {
  if (!url || typeof url !== 'string') return url
  const localPdfs = {
    '1994-Stryker.pdf': 'WebImages/PDFs/1994-Stryker.pdf',
    'NoLoveinAlaska.pdf': 'WebImages/PDFs/NoLoveinAlaska.pdf',
    'DEmilio, Capitalism and Gay Identity.pdf':
      'WebImages/PDFs/DEmilio,%20Capitalism%20and%20Gay%20Identity.pdf',
  }
  try {
    const parsed = new URL(url, typeof location !== 'undefined' ? location.href : SOURCE_ORIGIN)
    const file = decodeURIComponent(parsed.pathname.split('/').pop() || '')
    if (localPdfs[file]) {
      const base =
        typeof location !== 'undefined' ? `${location.origin}/` : `${SOURCE_ORIGIN}/`
      return `${base}${localPdfs[file]}`
    }
  } catch {
    /* keep original */
  }
  return url
}

const app = document.getElementById('app')
const linkElements = new Map()
const linksByKey = new Map()
let assetUrls = FALLBACK_ASSETS

function normalizeLabel(label) {
  return String(label || '').trim().toUpperCase()
}

function linkAction(link) {
  return link.action || link.behavior || 'link'
}

function desktopLabel(link) {
  return normalizeLabel(link.label)
}

function mobileLabel(link) {
  const base = link.mobileLabel
    ? normalizeLabel(link.mobileLabel)
    : link.key === 'enter'
      ? 'JEROME SICARD'
      : normalizeLabel(link.label)
  const number = link.number ?? ''
  return number === '' ? base : `${number}. ${base}`
}

function resolveDestination(link) {
  const action = linkAction(link)
  if (action !== 'link') return null

  if (link.destinationType === 'customPage' && link.customPage?.slug) {
    return {
      href: `page.html?slug=${encodeURIComponent(link.customPage.slug)}`,
      newTab: false,
    }
  }

  if (link.destinationType === 'builtIn' && link.builtInPage) {
    return {href: link.builtInPage, newTab: Boolean(link.openInNewTab)}
  }

  const external = link.externalUrl || link.href
  if (external) {
    if (/^https?:\/\//i.test(external) || external.startsWith('mailto:')) {
      return {href: external, newTab: Boolean(link.openInNewTab)}
    }
    if (/\.html(?:[?#].*)?$/i.test(external)) {
      return {href: external, newTab: Boolean(link.openInNewTab)}
    }
    return {
      href: `${SOURCE_ORIGIN}/${external.replace(/^\.\//, '')}`,
      newTab: Boolean(link.openInNewTab),
    }
  }

  return null
}

function coordsFor(link) {
  if (typeof link.x === 'number' && typeof link.y === 'number') {
    return {x: link.x, y: link.y, free: true}
  }
  if (link.position && LEGACY_CENTERS[link.position]) {
    return {...LEGACY_CENTERS[link.position], free: true}
  }
  return null
}

function createSlot(link) {
  const slot = document.createElement('div')
  slot.className = 'slot'
  const coords = coordsFor(link)
  if (coords) {
    slot.dataset.free = 'true'
    slot.style.left = `${coords.x}%`
    slot.style.top = `${coords.y}%`
  } else if (link.position) {
    slot.dataset.position = link.position
  }
  return slot
}

function revealKeys(keys) {
  for (const key of keys || []) {
    const el = linkElements.get(key)
    if (el) el.hidden = false
  }
}

function hideKeys(keys) {
  for (const key of keys || []) {
    const el = linkElements.get(key)
    if (el) el.hidden = true
  }
}

function openRandom() {
  const pool = (assetUrls || []).filter(Boolean)
  if (!pool.length) return
  const pick = pool[Math.floor(Math.random() * pool.length)]
  window.open(pick, '_blank', 'noopener,noreferrer')
}

function handleActivate(link) {
  const action = linkAction(link)

  if (action === 'reveal') {
    if (link.key === 'work') {
      hideKeys(linksByKey.get('info')?.reveals)
      revealKeys(link.reveals)
      return
    }
    if (link.key === 'info') {
      hideKeys(linksByKey.get('work')?.reveals)
      revealKeys(link.reveals)
      return
    }
    revealKeys(link.reveals)
    return
  }

  if (action === 'random') {
    openRandom()
    return
  }

  const dest = resolveDestination(link)
  if (!dest?.href) return
  if (dest.newTab) window.open(dest.href, '_blank', 'noopener,noreferrer')
  else window.location.href = dest.href
}

function normalizeLinks(links) {
  return (links || []).map((link) => {
    const action = linkAction(link)
    // Migrate legacy navigate + href documents
    if (!link.action && link.behavior === 'navigate' && link.href) {
      const isHtml = /\.html(?:[?#].*)?$/i.test(link.href) && !link.href.includes('://')
      return {
        ...link,
        action: 'link',
        destinationType: isHtml ? 'builtIn' : 'external',
        builtInPage: isHtml ? link.href : undefined,
        externalUrl: isHtml ? undefined : link.href,
      }
    }
    if (!link.action && link.behavior === 'reveal') {
      return {...link, action: 'reveal'}
    }
    if (!link.action && link.behavior === 'random') {
      return {...link, action: 'random'}
    }
    return {...link, action}
  })
}

function renderNavigation(data) {
  const title = data?.title || FALLBACK_NAVIGATION.title
  document.title = title

  const links = normalizeLinks(
    Array.isArray(data?.links) && data.links.length
      ? data.links
      : FALLBACK_NAVIGATION.links,
  )

  app.replaceChildren()
  linkElements.clear()
  linksByKey.clear()

  for (const link of links) {
    if (!link?.key) continue
    if (!link.position && typeof link.x !== 'number') continue
    linksByKey.set(link.key, link)

    const slot = createSlot(link)
    app.appendChild(slot)

    const action = linkAction(link)
    const dest = action === 'link' ? resolveDestination(link) : null
    const el = document.createElement(dest?.href ? 'a' : 'button')
    el.className = 'nav-link'
    el.dataset.key = link.key
    el.hidden = !link.initiallyVisible

    if (dest?.href) {
      el.href = dest.href
      if (dest.newTab) {
        el.target = '_blank'
        el.rel = 'noopener noreferrer'
      }
    } else {
      el.type = 'button'
    }

    const number = document.createElement('span')
    number.className = 'nav-number'
    number.textContent = String(link.number ?? '')
    number.setAttribute('aria-hidden', 'true')

    const label = document.createElement('span')
    label.className = 'nav-label'
    label.textContent = desktopLabel(link)

    const mobile = document.createElement('span')
    mobile.className = 'nav-label-mobile'
    mobile.textContent = mobileLabel(link)

    el.append(number, label, mobile)
    el.setAttribute('aria-label', mobileLabel(link))

    el.addEventListener('click', (event) => {
      if (action === 'link' && dest?.href && !dest.newTab) return
      if (action === 'link' && dest?.href && dest.newTab) return
      event.preventDefault()
      handleActivate(link)
    })

    slot.appendChild(el)
    linkElements.set(link.key, el)
  }
}

async function loadSite() {
  try {
    const [nav, assets] = await Promise.all([
      fetchSanity(NAV_QUERY),
      fetchSanity(ASSETS_QUERY),
    ])

    const urls = (assets?.urls || [])
      .map((item) => (typeof item === 'string' ? item : item?.url))
      .filter(Boolean)
      .map(rewriteAssetUrl)
    if (urls.length) assetUrls = urls

    if (!nav?.links?.length) throw new Error('No navigation published')
    renderNavigation(nav)
  } catch (error) {
    console.warn('Sanity fetch failed; using local fallback.', error)
    assetUrls = FALLBACK_ASSETS.map(rewriteAssetUrl)
    renderNavigation(FALLBACK_NAVIGATION)
  }
}

loadSite()
