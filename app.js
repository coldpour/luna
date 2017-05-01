const state = getInitialState();

window.onload = renderApp;

function edit_story(story_id) {
    state.focused_story = String(story_id);
    state.editing_story = String(story_id);
    renderApp();
}

function save_story(story_id, value) {
  state.board.lists = state.board.lists.reduce((acc, list) => {
    list.stories = list.stories.reduce((acc, story) => {
      if (story.id === String(story_id)) {
        story.name = value;
      }
      return acc.concat([story]);
    }, []);
    return acc.concat([list]);
  }, []);
  state.editing_story = undefined;
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
            <div class="create list">Add a list...</div>
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
            <div class="create story">Add a story...</div>
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
      let s;
      if (story.id === state.editing_story) {
        s = `<input type="text" value="${story.name}" onblur="save_story(${story.id}, this.value)">`;
      } else {
        s = `
          <div class="${getStoryClasses(story.id)}" id="story|${story.id}" onclick="edit_story(${story.id})">
            ${story.name}
          </div>
        `;
      }
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
        editing_story: undefined,
        focused_story: undefined,
        board: {
            id: "0",
            name: "my board",
            lists: [{
                "id": "1",
                "name": "todo",
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
                "name": "doing",
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
