import {defineField, defineType} from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Index Link',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobileLabel',
      title: 'Mobile Label Override',
      type: 'string',
    }),
    defineField({
      name: 'x',
      title: 'Horizontal Position (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'y',
      title: 'Vertical Position (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'position',
      title: 'Legacy Position Slot',
      type: 'string',
      options: {
        list: [
          {title: 'Center', value: 'middle'},
          {title: 'Middle Top', value: 'middleTop'},
          {title: 'Middle Bottom', value: 'middleBottom'},
          {title: 'Middle Left', value: 'middleLeft'},
          {title: 'Bottom Left', value: 'bottomLeft'},
          {title: 'Top Left', value: 'topLeft'},
          {title: 'Middle Right', value: 'middleRight'},
          {title: 'Left Top Right', value: 'leftTopRight'},
          {title: 'Right Top Right', value: 'rightTopRight'},
          {title: 'Left Bottom Right', value: 'leftBottomRight'},
          {title: 'Right Bottom Right', value: 'rightBottomRight'},
        ],
      },
    }),
    defineField({
      name: 'initiallyVisible',
      title: 'Visible on Landing',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'action',
      title: 'Click Action',
      type: 'string',
      options: {
        list: [
          {title: 'Reveal other index links', value: 'reveal'},
          {title: 'Open a destination', value: 'link'},
          {title: 'Open random Assets URL', value: 'random'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reveals',
      title: 'Keys to Reveal',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => parent?.action !== 'reveal',
    }),
    defineField({
      name: 'destinationType',
      title: 'Destination Type',
      type: 'string',
      options: {
        list: [
          {title: 'Third-party / external URL', value: 'external'},
          {title: 'Built-in site page', value: 'builtIn'},
          {title: 'Custom page (created in Sanity)', value: 'customPage'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent?.action !== 'link',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
      hidden: ({parent}) =>
        parent?.action !== 'link' || parent?.destinationType !== 'external',
    }),
    defineField({
      name: 'builtInPage',
      title: 'Built-in Page',
      type: 'string',
      options: {
        list: [
          {title: 'About', value: 'About.html'},
          {title: 'Archive', value: 'Archive.html'},
          {title: 'Geology Camp', value: 'AssortedGarments.html'},
          {title: 'No Love in Alaska', value: 'NoLoveInAlaska.html'},
        ],
      },
      hidden: ({parent}) =>
        parent?.action !== 'link' || parent?.destinationType !== 'builtIn',
    }),
    defineField({
      name: 'customPage',
      title: 'Custom Page',
      type: 'reference',
      to: [{type: 'customPage'}],
      hidden: ({parent}) =>
        parent?.action !== 'link' || parent?.destinationType !== 'customPage',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.action !== 'link',
    }),
  ],
  preview: {
    select: {title: 'label', number: 'number', x: 'x', y: 'y'},
    prepare({title, number, x, y}) {
      return {
        title: `${number ?? '?'}. ${title || 'Untitled'}`,
        subtitle:
          typeof x === 'number' && typeof y === 'number'
            ? `${x}%, ${y}%`
            : 'Position not set',
      }
    },
  },
})
