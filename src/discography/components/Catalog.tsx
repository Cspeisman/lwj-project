import React from "react";
import type {CatalogModel} from "../catalogService.ts";

interface Props {
  catalog: CatalogModel;
}

export const Catalog = (props: Props) => {
  return <div>{props.catalog.albums.map(album => {
    return (<React.Fragment key={album.title}>
      <div>{album.title}</div>
      <ul>{album.tracks.map(t => <li key={t}>{t}</li>)}</ul>
    </React.Fragment>)
  })}</div>
}
