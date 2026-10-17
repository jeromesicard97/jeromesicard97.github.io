import {defineArrayMember, defineField, defineType} from 'sanity'
import {IndexMapInput} from '../components/IndexMapInput'

export const navigation = defineType({
  name: 'navigation',
  title: 'Index Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Index Links',
      description: 'Drag numbers on the map to place links. Click empty space to add one.',
      type: 'array',
      of: [defineArrayMember({type: 'navLink'})],
      components: {
        input: IndexMapInput,
      },
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
