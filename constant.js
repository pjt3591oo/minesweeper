const GAME_STATUS = {
  READY: 'READY',
  END: 'END',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
};

const MAP_S = 0;
const MAP_M = 1;
let MINE_MAP = [
  [MAP_M, MAP_M, MAP_M, MAP_M, MAP_M, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S],
  [MAP_M, MAP_S, MAP_S, MAP_S, MAP_S, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_M, MAP_S, MAP_S, MAP_S, MAP_S, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_M, MAP_S, MAP_S, MAP_S, MAP_S, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_M, MAP_M, MAP_M, MAP_M, MAP_M, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_M, MAP_S, MAP_S ],
  [MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S ],
  [MAP_S, MAP_S, MAP_S, MAP_M, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S, MAP_S ],
]

const NO_SEARCH = 0;
const DISABLE = 1;
const NEAR_MINE = 2;
let SEARCH_MAP = [
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
  [NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH, NO_SEARCH] ,
]

const UN_FLAG = 0;
const FLAG = 2;
let FLAG_MAP = [
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
  [UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG, UN_FLAG] ,
]
