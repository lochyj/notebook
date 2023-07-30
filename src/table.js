
function numberToLetter(number) {
    let result = "";
    const base = 26;

    while (number > 0) {
      // Convert the remainder (0-25) to the corresponding letter (A-Z)
      const remainder = (number - 1) % base;
      result = String.fromCharCode(65 + remainder) + result;

      // Subtract the remainder and divide by 26 to continue the conversion
      number = Math.floor((number - 1) / base);
    }

    return result;
}

function letterToNumber(letter) {
    let result = 0;
    const length = letter.length;

    for (let i = 0; i < length; i++) {
        result += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }

    return result;
}

function createNewTable(width, height) {
    var table = {};

    for (var i = 1; i < width; i++) {
        table[numberToLetter(i)] = {};
        for (var j = 1; j < height; j++) {
            table[numberToLetter(i)][numberToLetter(j)] = {
                value: "",
                formula: "",
                useFormula: false,
                error: false,

                width: 100,
                height: 25,

                selected: false,

                text: {
                    bold: false,
                    italic: false,
                    underline: false,
                    color: 0x000000,
                    size: 12,
                    font: "Arial"
                }
            };
        }
    }

    return table;
}

function createText(content, text) {
    var textObject = new PIXI.Text(content, {
        fontFamily: text.font * 4,
        fontSize: text.size,
        fill: text.color,
        align: "center"
    });

    textObject.scale.x = 0.4;
    textObject.scale.y = 0.4;

    return textObject;
}

function drawCell(cell, x, y, tableContainer) {
    const graphics = new PIXI.Graphics();

    if (cell.selected) {
        graphics.lineStyle(1, 0x201dce, 1);
        graphics.beginFill(0x201dce, 0.1);
    } else {
        graphics.lineStyle(1, 0x000000, 1);
        graphics.beginFill(0xffffff, 1);
    }

    x = x * cell.width;
    y = y * cell.height;


    graphics.drawRect(x + 50, y + 25, cell.width, cell.height);
    graphics.endFill();

    graphics.addChild(createText(cell.value, cell.text));
    tableContainer.addChild(graphics);
}

function drawTable(table, tableContainer) {
    for (var i = 1; i < Object.keys(table).length; i++) {
        for (var j = 1; j < Object.keys(table[numberToLetter(i)]).length; j++) {
            drawCell(table[numberToLetter(i)][numberToLetter(j)], i, j, tableContainer);
        }
    }
}