window.onload = function() {
  const state = getInitialState();
  document.body.innerHTML = renderState(state);
};

function renderState(state) {
  if(!state) {
    console.log('no state to render');
    return "";
  }

  console.log('rendering state', state);
  return renderBoard(state.board);
}

function renderBoard(board) {
  if(!board) {
    console.log('no board to render');
    return "";
  }

  console.log('rendering board', board);
  const b = `
<div class="board" id="board|${board.id}">
  ${renderColumns(board.columns, board.cards)}
</div>
`;
  console.log('board', b);
  return b;
}

function renderColumns(columns, cards) {
  if(!columns) {
    console.log('no columns to render');
    return "";
  }

  console.log('rendering columns', columns);
  return columns.reduce((acc, column) => {
    return acc += renderColumn(column, cards.reduce((acc, card) => {
      if(card.column === column.id) {
        acc.push(card);
      }
      return acc;
    }, []));
  }, "");
}

function renderColumn(column, cards) {
  if(!column) {
    console.log('no column to render');
    return "";
  }

  console.log('rendering column', column);
  const c = `
<div class="column" id="col|${column.id}">
  ${column.name}
  ${renderCards(cards)}
</div>
`;
  console.log('column', c);
  return c;
}

function renderCards(cards) {
  if(!cards) {
    console.log('no cards to render');
    return "";
  }

  console.log('rendering cards', cards);
  return cards.reduce((acc, card) => {
    return acc += renderCard(card);
  }, "");
}

function renderCard(card) {
  if(!card) {
    console.log('no card to render');
    return "";
  }

  console.log('rendering card', card);
  const c = `
<div class="card" id="card|${card.id}">
  ${card.name}
</div>
`;
  console.log('card', c);
  return c;
}

function getInitialState() {
  return {
    user: {},
    board: {
      id: "0",
      name: "stuff",
      columns: [
        {
          id: "0",
          name: "todo",
          board: "0"
        },
        {
          id: "1",
          name: "doing",
          board: "0"
        }
      ],
      cards: [
        {
          id: "0",
          name: "one",
          column: "0"
        },
        {
          id: "1",
          name: "two",
          column: "0"
        },
        {
          id: "2",
          name: "three",
          column: "0"
        }
      ]
    }
  };
}
