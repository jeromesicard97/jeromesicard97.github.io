/**
 * Sync Sanity content to match the GitHub site (Archive + Assets PDF paths).
 * Requires: sanity login  OR  SANITY_AUTH_TOKEN
 *
 * Usage (from studio/):
 *   node scripts/sync-from-github.mjs
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blocks = JSON.parse(readFileSync(join(__dirname, 'archive-blocks.json'), 'utf8'))

const projectId = '20myx2jl'
const dataset = 'production'
const token = process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-10-17',
  token,
  useCdn: false,
})

const ARCHIVE_ID = 'archivePage'
const ASSETS_ID = 'assetsSettings'

const fixedPdf = 'https://jeromesicard97.github.io/WebImages/PDFs/1994-Stryker.pdf'
const demilio =
  'https://jeromesicard97.github.io/WebImages/PDFs/DEmilio,%20Capitalism%20and%20Gay%20Identity.pdf'

async function main() {
  if (!token) {
    console.error('Set SANITY_AUTH_TOKEN (Editor or Admin) or run: npx sanity debug --secrets')
    process.exit(1)
  }

  console.log(`Patching ${ARCHIVE_ID} with ${blocks.length} blocks...`)
  await client
    .patch(ARCHIVE_ID)
    .set({title: 'Archive', blocks})
    .commit({autoGenerateArrayKeys: false})

  const assets = await client.fetch(`*[_id == $id][0]{urls}`, {id: ASSETS_ID})
  const urls = (assets?.urls || []).map((item) => {
    const url = typeof item === 'string' ? item : item?.url
    if (!url) return item
    if (url.includes('1994-Stryker.pdf') && !url.includes('WebImages/PDFs')) {
      return {...(typeof item === 'object' ? item : {_type: 'assetLink'}), url: fixedPdf}
    }
    return item
  })

  const hasDemilio = urls.some((u) => String(u?.url || u).includes('DEmilio'))
  if (!hasDemilio) {
    urls.push({_type: 'assetLink', _key: 'pdf-demilio', url: demilio})
  }

  console.log(`Patching ${ASSETS_ID} PDF URLs...`)
  await client.patch(ASSETS_ID).set({urls}).commit()

  // Publish drafts if present
  for (const id of [ARCHIVE_ID, ASSETS_ID]) {
    try {
      await client.action({
        actionType: 'sanity.action.document.publish',
        publishedId: id,
        remoteId: `drafts.${id}`,
      })
    } catch {
      try {
        await client.createOrReplace({
          ...(await client.getDocument(id)),
          _id: id,
        })
      } catch (e) {
        console.warn(`Publish note for ${id}:`, e.message)
      }
    }
  }

  console.log('Done. Archive + Assets updated to match GitHub.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
