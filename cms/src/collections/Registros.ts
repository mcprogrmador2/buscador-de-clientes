import { CollectionConfig } from 'payload/types';

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