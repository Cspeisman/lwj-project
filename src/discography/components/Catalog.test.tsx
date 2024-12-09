import { describe, it } from "vitest";
import {Catalog} from "./Catalog.tsx";
import {Album, CatalogModel} from "../catalogService.ts";
import {render, screen} from "@testing-library/react";

describe('Catalog', () => {
  it('should render the albums and tracks in a catalog', () => {
    const album = new Album('test album', ['track 1', 'track 2', 'track 3']);
    render(<Catalog catalog={new CatalogModel([album])}/>);
    screen.getByText('test album');
    screen.getByText('track 1');
    screen.getByText('track 2');
    screen.getByText('track 3');
  });
});
