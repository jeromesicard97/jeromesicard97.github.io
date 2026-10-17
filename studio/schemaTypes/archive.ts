import {defineArrayMember, defineField, defineType} from 'sanity'

export const archiveImage = defineType({
  name: 'archiveImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imageUrl',
      title: 'Fallback Image Path/URL',
      type: 'string',
    }),
    defineField({name: 'alt', type: 'string'}),
    defineField({
      name: 'linkUrl',
      type: 'url',
      validation: (rule) =>
        rule.uri({allowRelative: true, scheme: ['http', 'https']}),
    }),
  ],
})

export const archiveText = defineType({
  name: 'archiveText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Justified', value: 'justify'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
      initialValue: 'justify',
    }),
  ],
})

export const archiveSeparator = defineType({
  name: 'archiveSeparator',
  title: 'Separator (* * *)',
  type: 'object',
  fields: [
    defineField({
      name: 'note',
      type: 'string',
      initialValue: 'Separator',
      readOnly: true,
    }),
  ],
})

export const archivePage = defineType({
  name: 'archivePage',
  title: 'Archive Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'Archive'}),
    defineField({
      name: 'blocks',
      title: 'Archive Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'archiveImage'}),
        defineArrayMember({type: 'archiveText'}),
        defineArrayMember({type: 'archiveSeparator'}),
      ],
    }),
  ],
})
