let moves = 0;
let backMoves = 0;
let time, milliseconds, startTime;
let x, y
let body = document.getElementsByTagName("body")[0];
let table = document.createElement("table");
let goalTiles = []; //Used for function 'alertFinished'
let mapGrid = tileMap.mapGrid;
let spaceOrGoal = [Tiles.Goal, Tiles.Space]; //Used to shorten if-expressions in move functions
let blockDoneOrBlock = [Entities.Block, Entities.BlockDone]; //Used to shorten if-expressions in move functions
let movesMaps = [mapGrid]; //Used for rewinding/forwarding moves
let currentMap = JSON.parse(JSON.stringify(mapGrid)); //Used for rewinding/forwarding moves
let timerVar;

document.getElementById("time").innerHTML = "Time: 00:00";
document.getElementById("moves").innerHTML = "Number of moves: 0";
body.appendChild(table);

loadMap(mapGrid);
arrowKeysEventListener();
addEventListener('keyup', alertFinished);
setTimer();

function loadMap(map) {
    for (var i = 0; i < map.length; i++) {
        var row = document.createElement("tr");
        table.appendChild(row);
        for (var j = 0; j < map[i].length; j++) {
            var cell = document.createElement("td");
            switch (map[i][j][0]) {
                case 'P':
                    cell.className = Entities.Character;
                    y = i;
                    x = j;
                    break;
                case 'B':
                    if (mapGrid[i][j][0] == 'G') {
                        cell.className = Entities.BlockDone;
                    } else {
                        cell.className = Entities.Block;
                    }
                    break;
                case 'G':
                    cell.className = Tiles.Goal;
                    goalTiles.push({ yCoordinate: i, xCoordinate: j });
                    break;
                case 'W':
                    cell.className = Tiles.Wall;
                    break;
                default:
                    cell.className = Tiles.Space;
            }
            row.appendChild(cell);
        }
    }
}

var rows = document.getElementsByTagName("tr");

function moveDown() {
    if (spaceOrGoal.includes(rows[y + 1].childNodes[x].className) || (blockDoneOrBlock.includes(rows[y + 1].childNodes[x].className) && spaceOrGoal.includes(rows[y + 2].childNodes[x].className))) {
        y++;
        moves++;

        for (var i = 0; i < backMoves * 2; i++) {
            movesMaps.pop();
        }

        backMoves = 0;

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;
        if (blockDoneOrBlock.includes(rows[y].childNodes[x].className)) {
            if (mapGrid[y + 1][x].includes('G')) {
                rows[y + 1].childNodes[x].className = Entities.BlockDone;
            } else {
                rows[y + 1].childNodes[x].className = Entities.Block;
            }
            currentMap[y + 1][x][0] = 'B';//
        }

        rows[y].childNodes[x].className = Entities.Character;
        currentMap[y][x][0] = 'P';

        if (mapGrid[y - 1][x].includes('G')) {
            rows[y - 1].childNodes[x].className = Tiles.Goal;
            currentMap[y - 1][x][0] = 'G';//
        } else {
            rows[y - 1].childNodes[x].className = Tiles.Space;
            currentMap[y - 1][x][0] = ' ';//
        }

        let downMap = JSON.parse(JSON.stringify(currentMap));
        movesMaps.push(downMap);//

    }
}

function moveUp() {
    if (spaceOrGoal.includes(rows[y - 1].childNodes[x].className) || (blockDoneOrBlock.includes(rows[y - 1].childNodes[x].className) && spaceOrGoal.includes(rows[y - 2].childNodes[x].className))) {
        y--;
        moves++;

        for (var i = 0; i < backMoves * 2; i++) {
            movesMaps.pop();
        }

        backMoves = 0;

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;
        if (blockDoneOrBlock.includes(rows[y].childNodes[x].className)) {
            if (mapGrid[y - 1][x].includes('G')) {
                rows[y - 1].childNodes[x].className = Entities.BlockDone;
            } else {
                rows[y - 1].childNodes[x].className = Entities.Block;
            }
            currentMap[y - 1][x][0] = 'B';//
        }

        rows[y].childNodes[x].className = Entities.Character;
        currentMap[y][x][0] = 'P';

        if (mapGrid[y + 1][x].includes('G')) {
            rows[y + 1].childNodes[x].className = Tiles.Goal;
            currentMap[y + 1][x][0] = 'G';//

        } else {
            rows[y + 1].childNodes[x].className = Tiles.Space;
            currentMap[y + 1][x][0] = ' ';//
        }

        let upMap = JSON.parse(JSON.stringify(currentMap));
        movesMaps.push(upMap);//

    }
}

function moveLeft() {
    if (spaceOrGoal.includes(rows[y].childNodes[x - 1].className) || (blockDoneOrBlock.includes(rows[y].childNodes[x - 1].className) && spaceOrGoal.includes(rows[y].childNodes[x - 2].className))) {
        x--;
        moves++;

        for (var i = 0; i < backMoves * 2; i++) {
            movesMaps.pop();
        }

        backMoves = 0;

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;
        if (blockDoneOrBlock.includes(rows[y].childNodes[x].className)) {
            if (mapGrid[y][x - 1].includes('G')) {
                rows[y].childNodes[x - 1].className = Entities.BlockDone;
            } else {
                rows[y].childNodes[x - 1].className = Entities.Block;
            }
            currentMap[y][x - 1][0] = 'B';//
        }

        rows[y].childNodes[x].className = Entities.Character;
        currentMap[y][x][0] = 'P';

        if (mapGrid[y][x + 1].includes('G')) {
            rows[y].childNodes[x + 1].className = Tiles.Goal;
            currentMap[y][x + 1][0] = 'G';//

        } else {
            rows[y].childNodes[x + 1].className = Tiles.Space;
            currentMap[y][x + 1][0] = ' ';//

        }

        let leftMap = JSON.parse(JSON.stringify(currentMap));
        movesMaps.push(leftMap);//

    }
}

function moveRight() {

    if (spaceOrGoal.includes(rows[y].childNodes[x + 1].className) || (blockDoneOrBlock.includes(rows[y].childNodes[x + 1].className) && spaceOrGoal.includes(rows[y].childNodes[x + 2].className))) {
        x++;
        moves++;

        for (var i = 0; i < backMoves * 2; i++) {
            movesMaps.pop();
        }

        backMoves = 0;

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;

        if (blockDoneOrBlock.includes(rows[y].childNodes[x].className)) {
            if (mapGrid[y][x + 1].includes('G')) {
                rows[y].childNodes[x + 1].className = Entities.BlockDone;
            } else {
                rows[y].childNodes[x + 1].className = Entities.Block;
            }
            currentMap[y][x + 1][0] = 'B';//
        }

        rows[y].childNodes[x].className = Entities.Character;
        currentMap[y][x][0] = 'P';

        if (mapGrid[y][x - 1].includes('G')) {
            rows[y].childNodes[x - 1].className = Tiles.Goal;
            currentMap[y][x - 1][0] = 'G';//
        } else {
            rows[y].childNodes[x - 1].className = Tiles.Space;
            currentMap[y][x - 1][0] = ' ';//
        }

        let rightMap = JSON.parse(JSON.stringify(currentMap));
        movesMaps.push(rightMap);//

    }
}

function alertFinished() {
    let isFinished = goalTiles.every(function (value) {
        return rows[value.yCoordinate].childNodes[value.xCoordinate].className == Entities.BlockDone;
    })

    if (isFinished) {
        alert("Game completed!")
        removeEventListener('keyup', alertFinished);
        clearInterval(timerVar);
    }
}

function arrowKeysEventListener() {
    addEventListener('keydown', function (event) {
        event.preventDefault();

        switch (event.key) {
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }
    });
}

function setTimer() {
    startTime = new Date();
    timerVar = setInterval(function () {
        milliseconds = new Date() - startTime;
        time = new Date(milliseconds).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });

        if (time == "59:59") {
            clearInterval(timerVar);
        }

        document.getElementById("time").innerHTML = `Time: ${time}`;
    }, 1000);
}

function restart() {
    backMoves = 0;

    table.remove();
    table = document.createElement("table");
    body.appendChild(table);

    movesMaps = [mapGrid];

    currentMap = JSON.parse(JSON.stringify(mapGrid));
    loadMap(mapGrid);

    setTimer();

    document.getElementById("moves").innerHTML = `Number of moves: ${moves = 0}`;

    forwardMoves = 0;
}

function goBack() {
    if (moves > 0) {
        moves--;
        backMoves++;

        table.remove();
        table = document.createElement("table");
        body.appendChild(table);

        let backMap = JSON.parse(JSON.stringify(movesMaps[moves]));
        currentMap = JSON.parse(JSON.stringify(movesMaps[moves]));
        loadMap(currentMap);
        movesMaps.push(backMap);

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;
    }
}

function goForward() {
    if (backMoves > 0) {
        moves++;
        backMoves--;

        movesMaps.pop();

        table.remove();
        table = document.createElement("table");
        body.appendChild(table);

        currentMap = JSON.parse(JSON.stringify(movesMaps[moves]));
        loadMap(currentMap);

        document.getElementById("moves").innerHTML = `Number of moves: ${moves}`;
    }
}