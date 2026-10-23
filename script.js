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
      x: 55,
      y: 14,
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
 * ASSETS (number 12) — random open list.
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
  'https://www.h-r.la/event/smog-check-carlos-agredano/',
  'http://www.gutenberg.org/files/45229/45229-h/45229-h.htm',
  'https://www.artforum.com/print/197510/the-instrumental-image-steichen-at-war-36049',
  'https://bunkerprojects.org/representation-display-and-displacement/',
  'https://static.wixstatic.com/media/fb1283_959bf6f2b7d04f7e82d7fbb80c906f71~mv2.jpg/v1/crop/x_151,y_156,w_1791,h_2636/fill/w_808,h_1180,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Zachary_Johnson_StereoSerenade.jpg',
  'https://www.jstor.org/stable/40932362',
  'http://www.gutenberg.org/files/9071/9071-h/9071-h.htm',
  'http://www.gutenberg.org/files/44638/44638-h/44638-h.htm',
  'https://bonner-kunstverein.de/en/exhibitions/anna-sophie-berger-duel/',
  'https://www.sciencedirect.com/science/article/pii/S2090447914001610',
  'https://americanhistory.si.edu/collections/search/object/nmah_556193',
  'https://femalesymbol.bandcamp.com/releases',
  'https://www.youtube.com/watch?v=lJ0wfobjdPA',
  'https://www.contemporaryartlibrary.org/project/craig-jun-li-at-chapter-ny-new-york-62626?from=%2Fartist%2Fcraig-jun-li-42042',
  'https://www.sourcetype.com/editorial/629/all-at-once-samuel-r-delany-s-simultaneity-mark',
  'http://brycewilner.com/pdfs/wilner_the_describer.pdf',
  'http://ghebaly.com/wp-content/uploads/2017/06/Ghebaly_CL_Master-Press.pdf',
  'https://goldinsenneby.com/practice/headless/',
  'https://www.jackie-inhalt.net/reh/bilder/edouard-glissant-for-opacity.pdf',
  'http://danieljglendening.com/',
  'http://bixarcher.com/',
  'http://cargocollective.com/matthewreiner',
  'http://www.mollyzuckermanhartung.com/',
  'https://bombmagazine.org/articles/halsey-rodman/',
  'http://etuby.info/',
  'http://dariolanzardo.it/spaventapasseri-straccione-divino.html',
  'https://bozdeseogarden.com/',
  'https://www.jstor.org/stable/778312',
  'https://www.pierogi2000.com/artists/mark-lombardi/',
  'https://youtu.be/ixgbtOcEgXg',
  'https://tjshinstudio.com/',
  'https://www.jstor.org/stable/43918668?seq=1',
  'https://www.youtube.com/watch?v=K_Pc1GZlUgQ',
  'https://www.mollbrinks.se/images/page_content/PDF/zorn-2020---frode-b-henriksen-collection---mollbrinks.pdf',
  'https://www.poetryfoundation.org/poems/147467/wade-in-the-water',
  'https://www.poetryfoundation.org/poems/55519/my-god-its-full-of-stars',
  'https://hirshhorn.si.edu/exhibitions/message-new-media-works/',
  'https://www.google.com/books/edition/Forrest_Bess/XFKpBAAAQBAJ?hl=en&gbpv=1&dq=forrest+bess&pg=PA4&printsec=frontcover',
  'https://nicolaslamas.net/',
  'https://americanhistory.si.edu/collections/search/object/nmah_311372',
  'https://www.softopening.london/artists/maren-karlson',
  'https://maxwellgraham.biz/exhibitions/two-works-from-the-1980s/',
  'http://www.angharad-williams.com/01_integrated.jpg',
  'https://www.tandfonline.com/doi/pdf/10.1080/13534645.2014.927623?casa_token=FBb2nDhG8NIAAAAA:gj6Aqnb-Vyn8jxi7ioRCcnQCde3ppSYK8ZEB2x5_QMGZJIp3EO7M5AyvSErbnEJKw_EHaG79v0QR',
  'https://books.google.com/books?id=J0RVAwAAQBAJ&printsec=frontcover&source=gbs_ge_summary_r&cad=0#v=onepage&q&f=false',
  'https://www.carlosishikawa.com/artists/rosesalane/',
  'https://bombmagazine.org/articles/cherry-river-where-the-rivers-mix/',
  'https://vimeo.com/155656717',
  'https://www.rauschenbergfoundation.org/art/series/jammer',
  'http://www.carolynlazard.com/',
  'https://mitpress.mit.edu/9781635900026/carceral-capitalism/',
  'https://www.instagram.com/p/CXrwXOwsXdK/',
  'https://www.devinkenny.info/Do-You-Even-Talk-To-Your-Neighbors',
  'https://pennlawreview.com/2021/05/11/veil-peeking-the-corporation-as-a-nexus-for-regulation/',
  'https://darkforesttheory.com/',
  'https://sophiefriedmanpappas.com/',
  'https://www.artforum.com/events/gozie-ojini-249950/',
  'https://astudygroup.files.wordpress.com/2016/04/the-democracy-project.pdf',
  'https://warwick.ac.uk/fac/arts/english/currentstudents/undergraduate/modules/fulllist/special/statesofdamage/syllabus201516/graeber-debt_the_first_5000_years.pdf',
  'https://www.airgunnation.com/threads/diy-hunting-blind.225923/',
  'https://jonocoles.com/',
  'https://harrisonksmith.com/',
  'https://www.placeholdergallery.com/',
  'https://jonocoles.com/projects/Room%201000/Coles_Latent%20Space_Room1000%20Issue11.pdf',
  'https://www.contemporaryartlibrary.org/project/bailey-connolly-isabelle-frances-mcguire-at-scherben-berlin-24314',
  'https://companygallery.us/exhibitions/hold-on-let-me-take-the-safety-off',
  'https://www.are.na/block/6819517',
  'https://baudrillardstudies.ubishops.ca/objecthood-and-disappearance-the-art-of-cady-noland/',
  'https://youtu.be/avKJ2w1mhng?feature=shared',
  'https://mitpress.mit.edu/9781584351153/the-making-of-the-indebted-man/',
  'http://www.andrewkreps.com/artists/michael-e-smith',
  'https://www.youtube.com/watch?v=E-OFnHwuTBg',
  'https://kubaparis.com/archive/wrecking-ball',
  'https://archive.org/details/in.ernet.dli.2015.503949/mode/2up',
  'https://www.wkv-stuttgart.de/uploads/media/butler-judith-precarious-life.pdf',
  'https://www.centerforethnography.org/sites/default/files/artifacts/media/pdf/katherine-mckittrick-demonic-grounds.pdf',
  'https://www.artforum.com/features/procedural-matters-the-art-of-michael-asher-188414/',
  'https://artviewer.org/mira-mann-at-drei/',
  'https://www.ubu.com/media/text/Asher-Michael_Writings1973-1983OnWorks1969-1979_1973-1983.pdf',
  'https://archive.org/details/trickstermakesth00hyde',
  'https://timurnovikov.com/en',
  'https://www.harkawik.com/works-on-paper/18-extra',
  'https://static1.squarespace.com/static/655a68b08d1efb52180c0dfc/t/65655543687a68039470ae72/1701139780953/2021_Phases_FullMoon_1.jpg',
  'http://www.adamdthompson.net/',
  'https://www.derosia.nyc/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhlVEpuYnpkck5HbHdlak0yWlRGeGNtcG1jMmRuTjNOcmJIRTVkUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUVdsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SWt0VE1ESTNMV0V1YW5Cbklqc2dabWxzWlc1aGJXVXFQVlZVUmkwNEp5ZExVekF5TnkxaExtcHdad1k3QmxRNkVXTnZiblJsYm5SZmRIbHdaVWtpRDJsdFlXZGxMMnB3WldjR093WlVPaEZ6WlhKMmFXTmxYMjVoYldVNkNteHZZMkZzIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2tleSJ9fQ==--c82ebc89583bcd9a9d786a5cbd835eb67f98c21a/KS027-a.jpg',
  'https://www.galeriecapitain.de/wp-content/uploads/02.jpg',
  'https://jessvaughn.com/home.html',
  'https://www.moma.org/collection/works/35196',
  'https://www.contemporaryartlibrary.org/project/park-mcarthur-at-lars-friedrich-berlin-8682',
  'http://www.theunmanned.com/',
  'https://kubaparis.com/submission/295655',
  'https://www.militaryimagesmagazine-digital.com/2015/12/03/riding-the-rail-revisited-winter-2016/',
  'https://payload.cargocollective.com/1/23/738020/14648361/MR-2514_2693.jpg',
  'https://archive.org/details/wehaveneverbeenm0000lato',
  'https://www.contemporaryartlibrary.org/project/brandon-ndife-at-the-ezra-and-cecile-zilkha-gallery-wesleyan-university-22067',
  'https://regardsgallery.com/exhibitions/nick-raffel/',
  'https://vimeo.com/85250039',
  'https://auctionet.com/en/1829706-sjalvportratt-i-vargskinnspals-signerad-i-platen-daterad-1916-etsning/images#image_1',
  'https://www.ttnews.com/articles/stemco-ceases-production-trailertail-other-products',
  'https://bplus.xyz/en/projects/0116-embassy',
  'https://www.santafeopera.org/whats-on/the-righteous-2024/',
  'https://romance-gal.com/',
  'https://valiz.nl/en/publications/unlicensed',
  'https://static1.squarespace.com/static/655a68b08d1efb52180c0dfc/t/6565558b9537da6632591739/1701139853679/2021_The-Other-Dark-Side-of-the-Moon_1.jpg',
  'https://static1.squarespace.com/static/655a68b08d1efb52180c0dfc/t/656555c643ba840398925102/1701139913276/2021_Phases_SunVisor_1_sm.jpg',
  'https://msresearchcenter.com/',
  'https://www.youtube.com/watch?v=oL0XZIblfZo',
  'https://archive.org/details/bim_early-english-books-1641-1700_the-pen-mans-paradise-_seddon-john_1695',
  'https://www.e-flux.com/journal/164/6776911/architectures-of-amnesia-donald-judd-and-america-s-forgotten-war-in-korea',
  'https://aurora.tech/',
  'https://www.alcoa.com/global/en/home/',
  'https://www.worthpoint.com/worthopedia/unused-sets-scarce-art-deco-alcoa-237259030',
  'https://www.anna-sophie-berger.com/',
  'https://upload.wikimedia.org/wikipedia/commons/a/a1/Shuttle_profiles.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled',
  'https://assets.publishing.service.gov.uk/media/66d82294a399e0dcf5200b2f/Grenfell_Tower_Inquiry_-_Phase_1_report_Executive_Summary.pdf?utm_source=chatgpt.com',
  'https://upload.wikimedia.org/wikipedia/commons/e/e0/Grenfell_Tower_fire_%28wider_view%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original'
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
