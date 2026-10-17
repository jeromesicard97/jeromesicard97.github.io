/*
 * =============================================================================
 * INDEX LINKS — how to edit (desktop + mobile)
 * =============================================================================
 *
 * All index numbers/labels live in SITE.links below. script.js builds the DOM;
 * styles.css places them on desktop. Mobile reuses the same list (stacked).
 *
 * -----------------------------------------------------------------------------
 * ADD A NEW NUMBERED LINK
 * -----------------------------------------------------------------------------
 * 1) Copy an existing object in SITE.links and give it a unique `key`
 *    (e.g. 'myProject'). Use the next free `number`.
 * 2) Set `label` (desktop hover text) and optional `mobileLabel` (if omitted,
 *    mobile shows "N. LABEL").
 * 3) Choose placement:
 *      - `position: 'middleLeft'` etc. → named slot in styles.css, OR
 *      - `x: 40, y: 55` (percentages) → free placement (omit `position`).
 * 4) Set what it does (`action`):
 *      - 'link'   → opens a page/URL (set destinationType + URL/page below)
 *      - 'reveal' → shows other links listed in `reveals: ['key1','key2']`
 *      - 'random' → opens a random entry from ASSET_URLS
 * 5) Set `initiallyVisible: false` for everything except ENTER.
 * 6) Put the new link’s `key` into the right reveal group (Work vs Info):
 *
 *    WORK group — appears after clicking WORK (number 2):
 *      Add your key to work.reveals (array below).
 *      Example: reveals: [..., 'myProject']
 *
 *    INFO group — appears after clicking INFO (number 3):
 *      Add your key to info.reveals.
 *      Example: reveals: [..., 'myProject']
 *
 *    Landing — after ENTER (number 1):
 *      Only keys in enter.reveals show (default: work + info).
 *
 * 7) Destination for action: 'link':
 *      External site:
 *        destinationType: 'external',
 *        externalUrl: 'https://…',
 *        openInNewTab: true
 *      Page in this repo:
 *        destinationType: 'builtIn',
 *        builtInPage: 'MyPage.html'   // file next to index.html
 *
 * 8) Desktop position: if using `position`, edit the matching rule in
 *    styles.css under .slot[data-position="…"]. If using x/y, no CSS change.
 * 9) Mobile: no separate list. Links stack in SITE.links array order among
 *    currently visible items. Order the array if you care about mobile order.
 * 10) Push with GitHub Desktop (or git) so GitHub Pages updates.
 *
 * -----------------------------------------------------------------------------
 * MOVE AN EXISTING LINK (desktop)
 * -----------------------------------------------------------------------------
 * - Named slot: change `position` and/or tweak left/top in styles.css.
 * - Free: set `x` / `y` (0–100) and remove `position`.
 * Mobile ignores left/top; only visibility + array order matter.
 *
 * -----------------------------------------------------------------------------
 * CHANGE WORK vs INFO MEMBERSHIP
 * -----------------------------------------------------------------------------
 * - To show after WORK: key must be in work.reveals (and usually NOT in
 *   info.reveals). Remove from the other group if moving.
 * - To show after INFO: key must be in info.reveals.
 * - Keys not listed in any reveals array never appear after a reveal click.
 *
 * =============================================================================
 */

const SITE = {
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
      // After ENTER: only these keys become visible (WORK + INFO).
      reveals: ['work', 'info'],
    },
    {
      key: 'work',
      number: 2,
      label: 'WORK',
      position: 'middleTop',
      action: 'reveal',
      initiallyVisible: false,
      // WORK group — add new project keys here so they appear after WORK.
      reveals: [
        'interburden',
        'geologyCamp',
        'noLoveInAlaska',
        'divineTheory',
        'archive',
        'aurora'
      ],
    },
    {
      key: 'info',
      number: 3,
      label: 'INFO',
      position: 'rightBottomRight',
      action: 'reveal',
      initiallyVisible: false,
      // INFO group — add about/social/assets-style keys here.
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
      key: 'aurora',
      number: 8,
      label: 'AURORA',
      // Free placement: use x/y (not `position: x: …` — that is invalid JS)
      x: 38,
      y: 30,
      action: 'link',
      destinationType: 'external',
      externalUrl: 'https://www.contemporaryartlibrary.org/project/jerome-sicard-at-weatherproof-chicago-105263?from=%2Fartist%2Fjerome-sicard-62406',
      openInNewTab: true,
      initiallyVisible: false,
    },


    {
      key: 'archive',
      number: 9,
      label: 'ARCHIVE',
      position: 'middleBottom',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'Archive.html',
      initiallyVisible: false,
    },


    {
      key: 'about',
      number: 10,
      label: 'ABOUT',
      position: 'middleRight',
      action: 'link',
      destinationType: 'builtIn',
      builtInPage: 'About.html',
      initiallyVisible: false,
    },
    {
      key: 'instagram',
      number: 11,
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
      number: 12,
      label: 'ASSETS',
      position: 'topLeft',
      action: 'random',
      initiallyVisible: false,
    },
  ],
}

/*
 * ASSETS (number 11) — random open list.
 * Add any https:// URL or site-relative path (e.g. WebImages/PDFs/file.pdf).
 * Used when action: 'random' is clicked. Same list on mobile and desktop.
 */
const ASSET_URLS = [
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
  'WebImages/PDFs/1994-Stryker.pdf',
  'WebImages/PDFs/DEmilio,%20Capitalism%20and%20Gay%20Identity.pdf',
]

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

const app = document.getElementById('app')
if (!app) {
  throw new Error('index.html is missing <main id="app"> — cannot render links.')
}
const linkElements = new Map()
const linksByKey = new Map()
let assetUrls = ASSET_URLS

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
    : normalizeLabel(link.label)
  if (link.number != null) return `${link.number}. ${base}`
  return base
}

function resolveDestination(link) {
  if (link.destinationType === 'external' || link.externalUrl || link.href) {
    return {
      href: link.externalUrl || link.href,
      newTab: Boolean(link.openInNewTab ?? true),
    }
  }
  if (link.destinationType === 'builtIn' || link.builtInPage) {
    return {href: link.builtInPage, newTab: Boolean(link.openInNewTab)}
  }
  if (link.customPage?.slug) {
    return {href: `page.html?slug=${encodeURIComponent(link.customPage.slug)}`, newTab: false}
  }
  return null
}

function coordsFor(link) {
  if (typeof link.x === 'number' && typeof link.y === 'number') {
    return {x: link.x, y: link.y, free: true}
  }
  if (link.position && LEGACY_CENTERS[link.position]) {
    return {...LEGACY_CENTERS[link.position], free: false}
  }
  return null
}

function createSlot(link) {
  const coords = coordsFor(link)
  const slot = document.createElement('div')
  slot.className = 'slot'
  if (coords?.free) {
    slot.dataset.free = 'true'
    slot.style.left = `${coords.x}%`
    slot.style.top = `${coords.y}%`
  } else if (link.position) {
    slot.dataset.position = link.position
  }
  return slot
}

// ENTER (1) is never hidden. After ENTER is used, WORK (2) and INFO (3) stay visible
// when either is clicked; only their child groups swap.
const PERSISTENT_KEYS = ['enter', 'work', 'info']

function hideAllExcept(keepKeys) {
  const keep = new Set(keepKeys)
  for (const [key, el] of linkElements) {
    el.hidden = !keep.has(key)
  }
}

function handleActivate(link) {
  const action = linkAction(link)
  if (action === 'reveal') {
    const revealed = Array.isArray(link.reveals) ? link.reveals : []
    if (link.key === 'enter') {
      // Landing → show ENTER + WORK + INFO
      hideAllExcept(['enter', ...revealed])
    } else {
      // WORK or INFO → keep 1/2/3, show that group's children
      hideAllExcept([...PERSISTENT_KEYS, ...revealed])
    }
    return
  }
  if (action === 'random') {
    if (!assetUrls.length) return
    const url = assetUrls[Math.floor(Math.random() * assetUrls.length)]
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

function normalizeLinks(links) {
  return links.map((link) => {
    let action = link.action
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
  const title = data?.title || SITE.title
  document.title = title

  const links = normalizeLinks(
    Array.isArray(data?.links) && data.links.length ? data.links : SITE.links,
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

renderNavigation(SITE)
