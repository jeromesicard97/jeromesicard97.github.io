import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageText = defineType({
  name: 'pageText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
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

export const pageImage = defineType({
  name: 'pageImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt', type: 'string'}),
  ],
})

export const customPage = defineType({
  name: 'customPage',
  title: 'Custom Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'pageText'}),
        defineArrayMember({type: 'pageImage'}),
      ],
    }),
  ],
})
