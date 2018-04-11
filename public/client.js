var pascalRowNumber = 1

var triangle = function() {
  let canvas = document.getElementById('content');
  let ctx = canvas.getContext('2d');
  //let pascalRowNumber = //Math.floor(Math.random() * 40);
  let binaryRow = binarizeArray(pascalRow(pascalRowNumber));
  let dimension = (binaryRow.length % 2) ? 51 : 50;
  let pixelSize = 16;
  let pixelIndex = 0; // This shouldn't be a global variable
  
  function pascalRow(n) {
    let line = [1];
    for (let i = 0; i < n; i++) {
        line.push(line[i] * (n-i) / (i+1));
    }
    return line
  }
  
  function binarizeArray(row) {
    let binaryRow = [];
    for (let i = 0; i < row.length; i++) {
        binaryRow.push(row[i].toString(2));
    }
    return binaryRow;
  }
  
  function columnContainsBinary(i) {
    let currentColumn = (i % dimension);
    let currentRow = Math.floor(i / dimension);
    if (currentColumn >= (dimension - binaryRow.length)/2 && 
        currentColumn < dimension - (dimension - binaryRow.length)/2) {
      return true;
    }
  }
  
  function rowContainsBinary(i) {
    let longestBinaryString = binaryRow.reduce((r,s) => r > s.length ? r : s.length, 0);
    let currentRow = Math.floor(i / dimension);
    if (dimension - longestBinaryString <= currentRow){
      return true;
    }
  }
  
  function getColorScheme() {
      return [(Math.round(Math.random()* 127) + 127).toString(16), 
              (Math.round(Math.random()* 127) + 127).toString(16)
             ];
  }
  
  function getBinaryStringIndex(currentRow, ix) {
    if (dimension - currentRow <= binaryRow[ix].length) {
      return Math.abs(dimension - currentRow - binaryRow[ix].length)
    } else {
      undefined;
    }
  }
  
  function getPixelColor(i, bi, colors) {
    let color
    if (columnContainsBinary(i) && rowContainsBinary(i)) {
      color = (binaryRow[pixelIndex][bi] == '1')
        ? '#' + colors[0] + (Math.round(Math.random()* 127) + 127).toString(16) + colors[1] 
        : 'black';
      pixelIndex = (pixelIndex == binaryRow.length - 1) ? 0 : pixelIndex + 1;
      } else {
        color = 'black';
      } 
    return color
  }
    
  function drawTriangle() {
    canvas.width = dimension * pixelSize;
    canvas.height = dimension  * pixelSize;
    let baseColors = getColorScheme(); 
    for (let i = 0; i < dimension * dimension; i++) {
      let currentColumn = (i % dimension);
      let currentRow = Math.floor(i / dimension);
      let X = currentColumn * pixelSize;
			let Y = currentRow * pixelSize;
      let bIndex = getBinaryStringIndex(currentRow, pixelIndex)
      
      ctx.fillStyle = getPixelColor(i, bIndex, baseColors);
			ctx.fillRect(X, Y, pixelSize, pixelSize);
		}
  }
  drawTriangle()
  if (pascalRowNumber < 50) {
    pascalRowNumber++
  } else {
    pascalRowNumber = 1;
  }
};

(function(){
  setInterval(triangle, 300);
})();
