import {column, defineDb, defineTable} from 'astro:db';

// https://astro.build/db/config
const MenuItem = defineTable({
  columns: {
    name: column.text(),
  }
});

export default defineDb({
  tables: {MenuItem}
});
