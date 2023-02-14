// import 'server-only' not working with API routes yet
import { Generated, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface Ressources {
  id: Generated<number>;
  link: string;
  description: string;
}

interface Database {
  ressources: Ressources;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
