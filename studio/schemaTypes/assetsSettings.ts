import {defineArrayMember, defineField, defineType} from 'sanity'

export const assetsSettings = defineType({
  name: 'assetsSettings',
  title: 'Assets Randomizer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Assets Randomizer',
    }),
    defineField({
      name: 'urls',
      title: 'Random URLs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'assetLink',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
            defineField({name: 'label', title: 'Note (optional)', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'url'},
            prepare({title, subtitle}) {
              return {title: title || subtitle || 'URL', subtitle}
            },
          },
        }),
      ],
    }),
  ],
})
