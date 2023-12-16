const gameContainer = document.getElementById('minesweeper')
const columns = document.getElementsByClassName('column');

let GAME_WIDTH = 0;
let GAME_HEIGHT = 0;

function createMap(rows, columns, mineCount) {
  // 초기화된 맵 생성
  const map = Array.from({ length: rows }, () => Array(columns).fill(MAP_S));

  // 랜덤한 위치에 지뢰 배치
  for (let i = 0; i < mineCount; i++) {
    let row, column;
    do {
      row = Math.floor(Math.random() * rows);
      column = Math.floor(Math.random() * columns);
    } while (map[row][column] === MAP_M); // 이미 지뢰가 있는 위치라면 다시 선택

    map[row][column] = MAP_M; // 해당 위치에 지뢰 배치
  }

  return map;
}


function initGame(width, height, mineCount) {
  GAME_WIDTH = width;
  GAME_HEIGHT = height;

  MINE_MAP = createMap(width, height, mineCount);
  SEARCH_MAP = Array.from({ length: width }, () => Array(height).fill(NO_SEARCH))
  FLAG_MAP = Array.from({ length: width }, () => Array(height).fill(UN_FLAG))

  let temp = `
    <ul>
  `;
  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    temp += `
      <li class="row">
        <ul>
    `;
    for (let j = 0 ; j < MINE_MAP[i].length ; ++j) {
      temp += `<li class="column" data-row=${i} data-column=${j}></li>`
    }
    temp += `
      </li>
    </ul>
  `;
  }

  temp += `</ul>`;
  gameContainer.innerHTML = temp
}

function clickEventHandler(e) {
  const { row, column } = this.dataset;
  const parseRow = parseInt(row);
  const parseColumn = parseInt(column);
  
  if (MINE_MAP[parseRow][parseColumn]) {
    showMine();
    alert('졌습니다')
    return;
  }

  open(parseRow, parseColumn);

  render();
}

function open(row, column) {
  if (row < 0 || column < 0) return;
  if (row >= MINE_MAP.length || column >= MINE_MAP[0].length) return

  if (SEARCH_MAP[row][column]) return;
  
  const { aroundPositions, aroundMines } = getAroundInfo(row, column);

  if (
    aroundMines.every(m => !m)
  ) {
    SEARCH_MAP[row][column] = DISABLE;
    FLAG_MAP[row][column] = UN_FLAG;
    aroundPositions.forEach(position => open(position[0], position[1]));

  } else {
    SEARCH_MAP[row][column] = NEAR_MINE;
    FLAG_MAP[row][column] = UN_FLAG;
  }
}

function render() {
  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    for (let j = 0 ; j < MINE_MAP[i].length ; ++j) {
      const target = columns[i * MINE_MAP.length + j];

      if (SEARCH_MAP[i][j]) {
        target.classList.remove("flag");
        target.classList.add(SEARCH_MAP[i][j] === DISABLE ? "open-disable": "open-near-mine");
        
        if (SEARCH_MAP[i][j] === NEAR_MINE) {
          const { aroundMines } = getAroundInfo(i, j);
          target.innerText = aroundMines.reduce((acc, curVal) => acc + curVal, 0)
        }

      } else if (FLAG_MAP[i][j]) {
        target.classList.add("flag");
      }
    }

  }
}

function rightClickEventhandler(e) {
  e.preventDefault(); // 기본 동작(컨텍스트 메뉴 표시)을 막습니다.

  const { row, column } = this.dataset;

  if (SEARCH_MAP[row][column]) return;

  if (FLAG_MAP[row][column] === FLAG) {
    FLAG_MAP[row][column] = MAP_S;
    this.classList.remove('flag');

  } else if (FLAG_MAP[row][column] === MAP_S) {
    FLAG_MAP[row][column] = FLAG
    this.classList.add('flag');
  }
  
  render();

  if (checkMine()) {
  return alert('모든 지뢰를 찾았습니다.');;
  }
}

function showMine() {
  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    for (let j = 0 ; j < MINE_MAP[i].length ; ++j) {
      if (MINE_MAP[i][j] === MAP_M) {
        columns[i*MINE_MAP.length + j].classList.add('mine')
      }
    }
  }
}

function checkMine() {
  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    for (let j = 0 ; j < MINE_MAP[i].length ; ++j) {
      if (MINE_MAP[i][j] !== MAP_M) {continue}
      if (!(MINE_MAP[i][j] === MAP_M && FLAG_MAP[i][j] === FLAG)) {
        return false;
      }
    }
  }

  return true;
}

function getAroundInfo(row, column) {
  // (row-1, column-1), (row-1, column), (row-1, column+1)
  // (row, column-1),                    (row, column+1)
  // (row+1, column-1), (row+1, column), (row+1, column+1)
  const aroundPositions = [
    [row-1, column-1], [row-1, column], [row-1, column+1],
    [row,   column-1],                  [row,   column+1],
    [row+1, column-1], [row+1, column], [row+1, column+1],
  ].filter(pos => pos[0] > -1 && pos[0] < GAME_WIDTH && pos[1] > -1 && pos[1] < GAME_HEIGHT);
  const aroundMines =  aroundPositions.map(pos => MINE_MAP[pos[0]][pos[1]]);

  return {
    aroundPositions, aroundMines
  }
}

initGame(20, 20, 40);

for (let i = 0 ; i < MINE_MAP.length * MINE_MAP[0].length ; ++i) {
  columns[i].addEventListener('click', clickEventHandler);
  columns[i].addEventListener('contextmenu', rightClickEventhandler);
}
