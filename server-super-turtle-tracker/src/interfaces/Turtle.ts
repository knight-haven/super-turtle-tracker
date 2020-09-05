import { Photo } from "./Photo";
import { Sighting } from "./Sighting";

export interface Turtle {
  id: number;
  mark: string;
  number: number;
  sex: string;
  url?: string;
}

export interface TurtleSightingPhoto {
  turtle?: Turtle;
  sightings?: Sighting[];
  photos?: Photo[];
}

export interface ID {
  id: number;
}
