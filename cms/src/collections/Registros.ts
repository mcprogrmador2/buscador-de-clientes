import { CollectionConfig } from 'payload/types';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Registros: CollectionConfig = {
  slug: 'registros',
  admin: {
    useAsTitle: 'someField',
  },
  fields: [
    {
      name: 'tiempo',
      type: 'date',
    },
    {
      name: 'autor',
      type: 'relationship',
      relationTo: 'trabajadores',
    },
    {
      name: 'tipoDocumento',
      type: 'text',
    },
    {
      name: 'numeroDocumento',
      type: 'text',
    }
  ],
}

export default Registros;