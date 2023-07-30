
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

    for (var i = 1; i < width + 1; i++) {
        table[numberToLetter(i)] = {};
        for (var j = 1; j < height + 1; j++) {

            // This is handy for reference. If you dont know what goes into a cell, look here. also stuff js for not having data structures.
            table[numberToLetter(i)][numberToLetter(j)] = {
                value: "test",
                formula: "=SUM(A1:A2)",
                useFormula: false,
                error: false,

                position: [numberToLetter(i), numberToLetter(j)],

                width: 100,
                height: 25,

                selected: false,

                font: {
                    bold: false,
                    italic: false,
                    underline: false,
                    color: 0x000000,
                    size: 25,
                    font: "Arial",
                },

                border: {
                    top: 1,
                    bottom: 1,
                    left: 1,
                    right: 1,
                    color: 0x000000,
                    style: "solid",
                },

                textObject: null,
                cellObject: null,

            };
        }
    }

    return table;
}

function hoverCallback(position) {
    var cell = table[position[0]][position[1]];

    cell.cellObject.opacity = 0.5;
    console.log("E")
}

function createText(content, cell, text, x, y) {
    var textObject = new PIXI.Text(content, {
        fontFamily: text.font,
        fontSize: text.size * 3,
        fill: text.color,
        align: "center"
    });

    textObject.scale.x = 0.4;
    textObject.scale.y = 0.4;

    textObject.anchor.x = 0;
    textObject.anchor.y = 0.5;

    textObject.x = x + 10;
    textObject.y = y + cell.height / 2;

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

    graphics.eventMode = "dynamic";

    graphics.hitArea = new PIXI.Rectangle(x + 50, y + 25, cell.width, cell.height);

    graphics.data = cell.position;

    graphics.mouseover = function(mouseData) {
        hoverCallback(mouseData.target.data);
    }

    graphics.addChild(createText(cell.value, cell, cell.font, x + 50, y + 25));
    tableContainer.addChild(graphics);

    return [graphics.children[0], graphics];
}

function drawBorders(column, row) {
    // Draw the ruler / border for the table, like the 1, 2, 3 rows and the A, B, C columns
}

function drawTable(table, tableContainer) {
    for (var i = 1; i < Object.keys(table).length; i++) {
        for (var j = 1; j < Object.keys(table[numberToLetter(i)]).length; j++) {
            var objects = drawCell(table[numberToLetter(i)][numberToLetter(j)], i - 1, j - 1, tableContainer);
            table[numberToLetter(i)][numberToLetter(j)].textObject = objects[0];
            table[numberToLetter(i)][numberToLetter(j)].cellObject = objects[1];
        }
    }
}