import { Photo } from "./Photo";
import { Sighting } from "./Sighting";

export interface Turtle {
  id: number;
  mark: string;
  number: number;
  sex: string;
  url: string;
}

export interface TurtleSightingPhoto {
  photos: Photo[];
  sightings: Sighting[];
  turtle: Turtle;
}
