import type {StructureResolver} from 'sanity/structure'

const HIDDEN_FROM_AUTO = [
  'navigation',
  'assetsSettings',
  'archivePage',
  'customPage',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Index Page (Visual)')
        .id('navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('siteNavigation')
            .title('Index Page'),
        ),
      S.listItem()
        .title('Assets Randomizer')
        .id('assetsSettings')
        .child(
          S.document()
            .schemaType('assetsSettings')
            .documentId('assetsSettings')
            .title('Assets Randomizer'),
        ),
      S.listItem()
        .title('Archive Page')
        .id('archivePage')
        .child(
          S.document()
            .schemaType('archivePage')
            .documentId('archivePage')
            .title('Archive Page'),
        ),
      S.divider(),
      S.documentTypeListItem('customPage').title('Custom Pages'),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_FROM_AUTO.includes(item.getId() || ''),
      ),
    ])
