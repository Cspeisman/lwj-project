
export const catalogClientStub: CatalogClient = {
  getAlbums: function (id: string): Promise<CatalogModel> {
    let album1 = new Album('album1', ['track 1', 'track 2', 'track 3']);
    let album2 = new Album('album2', ['track 1', 'track 2', 'track 3']);
    return Promise.resolve(new CatalogModel([album1, album2]))
  }
}
export class Album {
  title: string;
  tracks: string[];

  constructor(title: string, tracks: string[]) {
    this.title = title;
    this.tracks = tracks;
  }
}

export class CatalogModel {
  albums: Album[];

  constructor(albums: Album[]) {
    this.albums = albums;
  }
}

export interface CatalogClient {
  getAlbums(id: string): Promise<CatalogModel>;
}

export class CatalogService {
  client: CatalogClient;

  constructor(client: CatalogClient) {
    this.client = client;
  }

  async getByArtistName(id: string) {
    return await this.client.getAlbums(id);
  }
}
