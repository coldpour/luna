const state = getInitialState();

window.onload = renderApp;

function foo(story_id) {
    console.log(JSON.stringify(state, null, 2));
    state.focused_story = String(story_id);
    console.log(JSON.stringify(state, null, 2));
    renderApp();
}

function renderApp() {
    document.getElementById('board-container').innerHTML = renderState(state);
};

function renderState(state) {
    if (state) {
        return renderBoard(state.board);
    }
    return "";
}

function renderBoard(board) {
    if (board) {
        const b = `
      <div class="board" id="board|${board.id}">
        <div class="name">${board.name}</div>
        ${renderLists(board.lists)}
      </div>
    `;
        return b;
    }
    return "";
}

function renderLists(lists) {
    if (lists) {
        return lists.reduce((acc, list) => {
            return acc += renderList(list);
        }, "");
    }
    return "";
}

function renderList(list) {
    if (list) {
        const c = `
      <div class="list" id="list|${list.id}">
        <div class="name">${list.name}</div>
        ${renderStories(list.stories)}
      </div>
    `;
        return c;
    }
    return "";
}

function renderStories(stories) {
    if (stories) {
        return stories.reduce((acc, story) => {
            return acc += renderStory(story);
        }, "");
    }
    return "";
}

function renderStory(story) {
    if (story) {
        const s = `
      <div class="${getStoryClasses(story.id)}" id="story|${story.id}" onclick="foo(${story.id})">
        ${story.name}
      </div>
    `;
        console.log('story', s);
        return s;
    }
    return "";
}

function getStoryClasses(id) {
    console.log('focus?', id, id === state.focused_story);
    const cls = "story";
    return id === state.focused_story ? cls + " focused" : cls;
}

function getInitialState() {
    return {
        user: {},
        focused_story: undefined,
        board: {
            id: "0",
            name: "my board",
            lists: [{
                "id": "1",
                "board_id": "1",
                "stories": [{
                    "id": "8",
                    "name": "make it work",
                    "description": "Another Story Town",
                    "estimate": 13,
                    "user_ids": []
                }],
                "_rid": "ll0PAPH95QAOAAAAAAAAAA==",
                "_self": "dbs/ll0PAA==/colls/ll0PAPH95QA=/docs/ll0PAPH95QAOAAAAAAAAAA==/",
                "_etag": "\"01005ff2-0000-0000-0000-5906669a0000\"",
                "_attachments": "attachments/",
                "_ts": 1493591708
            }, {
                "id": "2",
                "board_id": "1",
                "stories": [{
                    "id": "0",
                    "name": "fix the thing",
                    "description": "Another Story Town",
                    "estimate": 13,
                    "user_ids": []
                }, {
                    "id": "5",
                    "name": "test it good so that you know if it's working cause then it will be good and working and not broken so that the users will be happy and come back and recomend it to their friends and their wives and their wives friends will use it to keep track of stuff too",
                    "description": "Another Story Town",
                    "estimate": 13,
                    "user_ids": []
                }],
                "_rid": "ll0PAPH95QAQAAAAAAAAAA==",
                "_self": "dbs/ll0PAA==/colls/ll0PAPH95QA=/docs/ll0PAPH95QAQAAAAAAAAAA==/",
                "_etag": "\"01005ef2-0000-0000-0000-5906669a0000\"",
                "_attachments": "attachments/",
                "_ts": 1493591708
            }]
        }
    };
}
