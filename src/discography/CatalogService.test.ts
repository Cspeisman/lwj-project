import {describe, expect, it} from "vitest";
import {catalogClientStub, CatalogService} from "./catalogService.ts";


describe('Discography', () => {
  it('should return a catalogModel object for an artist', async () => {
    let catalog = new CatalogService(catalogClientStub);
    let catalogModel = await catalog.getByArtistName('1234');
    expect(catalogModel?.albums).toHaveLength(2);
  });
});
