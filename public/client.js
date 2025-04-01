function generatePascalTriangle(canvasId, interval = 500) {
  let pascalRowNumber = 1;

  function pascalRow(n) {
    let line = [1];
    for (let i = 0; i < n; i++) {
      line.push(Math.floor(line[i] * (n - i) / (i + 1)));
    }
    return line;
  }

  function binarizeArray(row) {
    return row.map(num => num.toString(2));
  }

  function getColorScheme() {
    return [
      (Math.round(Math.random() * 127) + 127).toString(16),
      (Math.round(Math.random() * 127) + 127).toString(16),
    ];
  }

  function drawTriangle() {
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    let binaryRow = binarizeArray(pascalRow(pascalRowNumber));
    let dimension = (binaryRow.length % 2) ? 51 : 50;
    let pixelSize = 16;
    let pixelIndex = 0;

    canvas.width = dimension * pixelSize;
    canvas.height = dimension * pixelSize;
    let baseColors = getColorScheme();

    function columnContainsBinary(i) {
      let currentColumn = i % dimension;
      return currentColumn >= (dimension - binaryRow.length) / 2 &&
        currentColumn < dimension - (dimension - binaryRow.length) / 2;
    }

    function rowContainsBinary(i) {
      let longestBinaryString = binaryRow.reduce((r, s) => Math.max(r, s.length), 0);
      let currentRow = Math.floor(i / dimension);
      return dimension - longestBinaryString <= currentRow;
    }

    function getBinaryStringIndex(currentRow, index) {
      return dimension - currentRow <= binaryRow[index].length ?
        Math.abs(dimension - currentRow - binaryRow[index].length) :
        undefined;
    }

    function getPixelColor(i, binaryIndex) {
      if (columnContainsBinary(i) && rowContainsBinary(i)) {
        let color = binaryRow[pixelIndex][binaryIndex] === '1' ?
          '#' + baseColors[0] + (Math.round(Math.random() * 127) + 127).toString(16) + baseColors[1] :
          'black';
        pixelIndex = (pixelIndex + 1) % binaryRow.length;
        return color;
      }
      return 'black';
    }

    for (let i = 0; i < dimension * dimension; i++) {
      let currentColumn = i % dimension;
      let currentRow = Math.floor(i / dimension);
      let x = currentColumn * pixelSize;
      let y = currentRow * pixelSize;
      let binaryIndex = getBinaryStringIndex(currentRow, pixelIndex);
      ctx.fillStyle = getPixelColor(i, binaryIndex);
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }

    pascalRowNumber = (pascalRowNumber < 50) ? pascalRowNumber + 1 : 1;
  }

  setInterval(drawTriangle, interval);
}

generatePascalTriangle('content');