export class Record {
  public artist: string;
  public album: string;
  public imagePath: string;
  public year: string;
  public id: number;

  constructor(
    artist: string,
    album: string,
    imagePath: string,
    year: string,
    id: number
  ) {
    this.artist = artist;
    this.album = album;
    this.imagePath = imagePath;
    this.year = year;
    this.id = id;
  }
}
