export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location; // {lat: 37.7749, lng: -122.4194}
    this.id = new Date().toString() + Math.random().toString();
  }
}
