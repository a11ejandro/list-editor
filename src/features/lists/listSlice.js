/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChildren } from '../../common/util';

let nextId = 0;

const listSlice = createSlice({
  name: 'list',
  initialState: {
    0: {
      id: 0,
      name: 'root',
      hasSublist: true,
      children: [],
    },
  },

  /* it may seem that redux state is mutated, but it doesn't happen 
  because of usage of Immer under the hood */
  reducers: {
    addItem(state, action) {
      const { parentId, name } = action.payload;
      const parent = state[parentId];

      if (parent) {
        nextId += 1;
        state[nextId] = {
          name, hasSublist: false, children: [], id: nextId,
        };
        parent.children.push(nextId);
      }
    },
    removeItem(state, action) {
      const { itemId, parentId } = action.payload;
      const parent = state[parentId];
      const item = state[itemId];

      if (parent && item) {
        const index = parent.children.indexOf(itemId);
        if (index !== -1) {
          state = removeChildren(state, item.children);
          parent.children.splice(index, 1);
          delete state[itemId];
        }
      }
    },
    moveItemUp(state, action) {
      const { itemId, parentId } = action.payload;
      const parent = state[parentId];
      const item = state[itemId];

      if (parent && item) {
        const { children } = parent;
        const index = children.indexOf(itemId);
        if (index > 0) {
          [children[index], children[index - 1]] = [children[index - 1], children[index]];
        }
      }
    },
    moveItemDown(state, action) {
      const { itemId, parentId } = action.payload;
      const parent = state[parentId];
      const item = state[itemId];

      if (parent && item) {
        const { children } = parent;
        const index = children.indexOf(itemId);
        if (index !== -1 && index !== children.length - 1) {
          [children[index], children[index + 1]] = [children[index + 1], children[index]];
        }
      }
    },
    addSublist(state, action) {
      const { parentId } = action.payload;
      const parent = state[parentId];

      parent.hasSublist = true;
    },
    removeSublist(state, action) {
      const { parentId } = action.payload;
      const parent = state[parentId];
      state = removeChildren(state, parent.children);
      parent.hasSublist = false;
      parent.children = [];
    },
  },
});

export const {
  addItem, removeItem, addSublist,
  removeSublist, moveItemUp, moveItemDown,
} = listSlice.actions;

export default listSlice.reducer;
