const gameContainer = document.getElementById('minesweeper');
const previewContainer = document.getElementById('preview');
const playTimerContainer = document.getElementById('play-time');
const columns = document.getElementsByClassName('column');


let GAME_WIDTH = 0;
let GAME_HEIGHT = 0;

let timeCount = 0;
let timerId = null;

let gameStatus = GAME_STATUS.READY;

function timerStart() {
  if (timerId) {
    clearInterval(timerId);
  }

  timeCount = 0;

  timerId = setInterval(() => {
    playTimerContainer.innerHTML = `플레이 시간: ${++timeCount}초`;
  }, 1000);
}

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

  MINE_MAP = createMap(height, width, mineCount);
  SEARCH_MAP = Array.from({ length: height }, () => Array(width).fill(NO_SEARCH))
  FLAG_MAP = Array.from({ length: height }, () => Array(width).fill(UN_FLAG))

  let temp = `
    <ul>
  `;
  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    temp += `
      <li class="row" style="width: ${width * 30}px;">
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
  timerStart();
}


function clickEventHandler(e) {
  const { row, column } = this.dataset;
  const parseRow = parseInt(row);
  const parseColumn = parseInt(column);
  
  if (gameStatus !== GAME_STATUS.PLAY) return;

  if (parseRow < 0 || column < 0) return;
  if (parseRow >= MINE_MAP.length || parseColumn >= MINE_MAP[0].length) return

  if (FLAG_MAP[parseRow][parseColumn]) return;

  if (MINE_MAP[parseRow][parseColumn]) {
    gameStatus = GAME_STATUS.END;
    timerId && clearInterval(timerId);
    showMine();
    
    const setTimerId = setTimeout(() => {
      alert('졌습니다');
      clearTimeout(setTimerId);
    }, 0)
    
    return;
  }

  open(parseRow, parseColumn);

  render();
}


function open(row, column) {
  // 재귀 탐색을 하는 과정에서 이미 탐색된 셀은 건너뛴다.
  if (SEARCH_MAP[row][column] ) return;

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
  let flagCount = 0;
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
        flagCount++;
      }
    }
  }

  document.getElementById('flag-count-text').innerText = `깃발 갯수: ${flagCount}`;
}


function rightClickEventHandler(e) {
  e.preventDefault(); // 기본 동작(컨텍스트 메뉴 표시)을 막습니다.
  
  if (gameStatus !== GAME_STATUS.PLAY) return;

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
    timerId && clearInterval(timerId);
    gameStatus = GAME_STATUS.END;
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


function previewRender () {
  let temp = `
    <ul>
  `;

  for (let i = 0 ; i < MINE_MAP.length ; ++i) {
    temp += `
      <li class="row" style="width: ${GAME_WIDTH * 30}px;">
        <ul>
    `;
    for (let j = 0 ; j < MINE_MAP[i].length ; ++j) {
      temp += `<li class="column ${MINE_MAP[i][j] === MAP_M ? "mine" : ""}" data-row=${i} data-column=${j}></li>`
    }
    temp += `
        </li>
      </ul>
    `;
  }

  temp += `</ul>`;

  previewContainer.innerHTML = temp
}


document.getElementById('submit').addEventListener('click', () => {
  GAME_WIDTH = parseInt(document.getElementById('size').value) || 10;
  GAME_HEIGHT = GAME_WIDTH;
  const mineCount = parseInt(document.getElementById('mine-count').value) || 15;

  const isValid = validation(GAME_WIDTH, GAME_HEIGHT, mineCount);
  
  if (isValid) {
    return;
  }

  document.getElementById('mine-count-text').innerText = `전체 지뢰 갯수: ${mineCount}`;



  initGame(GAME_WIDTH, GAME_HEIGHT, mineCount);
  
  for (let i = 0 ; i < MINE_MAP.length * MINE_MAP[0].length ; ++i) {
    columns[i].addEventListener('click', clickEventHandler);
    columns[i].addEventListener('contextmenu', rightClickEventHandler);
  }

  gameStatus = GAME_STATUS.PLAY;
  
  if (previewContainer.innerHTML.trim()) {
    previewRender();
  }
})


document.getElementById('debug-submit').addEventListener('click', () => {
  if (gameStatus !== GAME_STATUS.PLAY) {
    alert('디버그 모드는 지뢰의 위치를 표시하는 기능입니다. 게임 시작후 활성화 가능합니다.');
    return;
  }
  previewRender();
})

function validation(width, height, mineCount) {
  if (width < 10) {
    alert("게임 사이즈는 최소 10입니다.");
    return true;
  }

  if (width > 100) {
    alert("게임 사이즈는 최대 100입니다.");
    return true;
  }

  if (mineCount < 1) {
    alert("지뢰는 최소 1개여야 합니다.");
    return true;
  }

  if (width * height < mineCount) {
    alert("게임 크기보다 지뢰가 많으면 안됩니다.")
    return true;
  }
  
  return false;
}