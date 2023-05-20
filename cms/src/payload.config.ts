import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Registros from './collections/Registros';
import Trabajadores from './collections/Trabajadores';

export default buildConfig({
  serverURL: 'http://localhost:4000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Registros,
    Users,
    Trabajadores,
    // Add Collections here
    // Examples,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
