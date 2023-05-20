import { CollectionConfig } from 'payload/types';

const Trabajadores: CollectionConfig = {
  slug: 'trabajadores',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Trabajadores;