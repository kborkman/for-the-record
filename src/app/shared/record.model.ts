export class Record {
  public artist: string;
  public album: string;
  public imagePath: string;
  public year: string;

  constructor(
    artist: string,
    album: string,
    imagePath: string,
    year: string
  ) {
    this.artist = artist;
    this.album = album;
    this.imagePath = imagePath;
    this.year = year;
  }
}
