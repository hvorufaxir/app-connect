/*
Filename: ImageEditor.js
Description: A sophisticated and elaborate image editing library written in JavaScript.
*/

class ImageEditor {
  constructor(image) {
    this.image = image;
  }

  // Apply grayscale filter to the image
  applyGrayscaleFilter() {
    for (let i = 0; i < this.image.length; i++) {
      for (let j = 0; j < this.image[i].length; j++) {
        const pixel = this.image[i][j];
        const gray = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
        this.image[i][j] = [gray, gray, gray];
      }
    }
  }

  // Apply sepia filter to the image
  applySepiaFilter() {
    for (let i = 0; i < this.image.length; i++) {
      for (let j = 0; j < this.image[i].length; j++) {
        const pixel = this.image[i][j];
        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];

        const newR = (r * 0.393) + (g * 0.769) + (b * 0.189);
        const newG = (r * 0.349) + (g * 0.686) + (b * 0.168);
        const newB = (r * 0.272) + (g * 0.534) + (b * 0.131);

        this.image[i][j] = [newR, newG, newB];
      }
    }
  }

  // Apply blur effect to the image
  applyBlurEffect() {
    const blurredImage = [];

    for (let i = 0; i < this.image.length; i++) {
      blurredImage[i] = [];
      for (let j = 0; j < this.image[i].length; j++) {
        const neighbors = this.getNeighborPixels(i, j);
        const blurredPixel = this.getAveragePixel(neighbors);
        blurredImage[i][j] = blurredPixel;
      }
    }

    this.image = blurredImage;
  }

  // Get neighboring pixels for the given pixel coordinates
  getNeighborPixels(x, y) {
    const neighbors = [];

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < this.image.length && j >= 0 && j < this.image[i].length) {
          neighbors.push(this.image[i][j]);
        }
      }
    }

    return neighbors;
  }

  // Calculate the average pixel from an array of pixels
  getAveragePixel(pixels) {
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;

    for (let i = 0; i < pixels.length; i++) {
      sumR += pixels[i][0];
      sumG += pixels[i][1];
      sumB += pixels[i][2];
    }

    const avgR = Math.floor(sumR / pixels.length);
    const avgG = Math.floor(sumG / pixels.length);
    const avgB = Math.floor(sumB / pixels.length);

    return [avgR, avgG, avgB];
  }

  // Display the image data
  displayImageData() {
    console.log(this.image);
  }
}

// Example usage:

const image = [
  [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
  [[255, 255, 0], [255, 0, 255], [0, 255, 255]],
  [[128, 128, 128], [64, 64, 64], [0, 0, 0]]
];

const editor = new ImageEditor(image);

editor.applyGrayscaleFilter();
editor.applySepiaFilter();
editor.applyBlurEffect();

editor.displayImageData();