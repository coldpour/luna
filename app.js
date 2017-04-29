window.onload = function() {
  const state = getInitialState();
  document.getElementById('board-container').innerHTML = renderState(state);
};

function renderState(state) {
  if(state) {
    console.log('rendering state', state);
    return renderBoard(state.board);
  }
  return "";
}

function renderBoard(board) {
  if(board) {
    console.log('rendering board', board);
    const b = `
      <div class="board" id="board|${board.id}">
        ${renderColumns(board.columns, board.cards)}
      </div>
    `;
    console.log('board', b);
    return b;
  }

  return "";
}

function renderColumns(columns, cards) {
  if(columns) {
    console.log('rendering columns', columns);
    return columns.reduce((acc, column) => {
      function cardBelongsInColumn(card) { return card.column === column.id; }
      const cardsInColumn = cards.filter(cardBelongsInColumn);
      return acc += renderColumn(column, cardsInColumn);
    }, "");
  }
  return "";
}

function renderColumn(column, cards) {
  if(column) {
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
  return "";
}

function renderCards(cards) {
  if(cards) {
    console.log('rendering cards', cards);
    return cards.reduce((acc, card) => {
      return acc += renderCard(card);
    }, "");
  }
  return "";
}

function renderCard(card) {
  if(card) {
    console.log('rendering card', card);
    const c = `
      <div class="card" id="card|${card.id}" onclick="foo()">
        ${card.name}
      </div>
    `;
    console.log('card', c);
    return c;
  }
  return "";
}

function foo() {
  console.log();
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
