import lists, {
  addItem, removeItem, addSublist,
  removeSublist, moveItemUp, moveItemDown,
} from './listSlice';

describe('lists reducer', () => {
  it('should handle initial state', () => {
    expect(lists(undefined, {})).toEqual({
      0: {
        name: 'root',
        children: [],
        hasSublist: true,
        id: 0,
      },
    });
  });

  it('should handle adding item', () => {
    expect(
      lists({
        0: {
          id: 0,
          name: 'root',
          children: [],
          hasSublist: true,
        },
      }, {
        type: addItem.type,
        payload: {
          name: 'new item',
          parentId: 0,
        },
      })[1],
    ).toEqual({
      id: 1,
      name: 'new item',
      children: [],
      hasSublist: false,
    });
  });

  it('should handle removing item', () => {
    expect(
      lists({
        0: {
          id: 0,
          name: 'root item',
          children: [1],
          hasSublist: true,
        },
        1: {
          id: 1,
          name: 'parent item',
          children: [2],
          hasSublist: true,
        },

        2: {
          id: 2,
          name: 'child item',
          children: [],
          hasSublist: false,
        },
      },
      {
        type: removeItem.type,
        payload: { itemId: 1, parentId: 0 },
      }),
    ).toEqual({
      0: {
        id: 0,
        name: 'root item',
        children: [],
        hasSublist: true,
      },
    });
  });

  it('should not handle removing root item', () => {
    expect(
      lists({
        0: {
          id: 0,
          name: 'new item',
          children: [],
          hasSublist: false,
        },
      },
      {
        type: removeItem.type,
        payload: { itemId: 0 },
      }),
    ).toEqual({
      0: {
        id: 0,
        name: 'new item',
        children: [],
        hasSublist: false,
      },
    });
  });

  it('should handle moving item up', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [1, 2],
            hasSublist: false,
          },
          1: {
            id: 1,
            name: 'child item',
            children: [],
            hasSublist: true,
          },

          2: {
            id: 2,
            name: 'child item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: moveItemUp.type,
          payload: { itemId: 2, parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [2, 1],
          hasSublist: false,
        },
        1: {
          id: 1,
          name: 'child item',
          children: [],
          hasSublist: true,
        },

        2: {
          id: 2,
          name: 'child item',
          children: [],
          hasSublist: false,
        },
      },
    );
  });

  it('should not move up the top item', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [1, 2],
            hasSublist: false,
          },
          1: {
            id: 1,
            name: 'child item',
            children: [],
            hasSublist: true,
          },

          2: {
            id: 2,
            name: 'child item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: moveItemUp.type,
          payload: { itemId: 1, parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [1, 2],
          hasSublist: false,
        },
        1: {
          id: 1,
          name: 'child item',
          children: [],
          hasSublist: true,
        },

        2: {
          id: 2,
          name: 'child item',
          children: [],
          hasSublist: false,
        },
      },
    );
  });

  it('should not move down the bottom item', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [1, 2],
            hasSublist: true,
          },
          1: {
            id: 1,
            name: 'child item',
            children: [],
            hasSublist: true,
          },

          2: {
            id: 2,
            name: 'child item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: moveItemDown.type,
          payload: { itemId: 2, parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [1, 2],
          hasSublist: true,
        },
        1: {
          id: 1,
          name: 'child item',
          children: [],
          hasSublist: true,
        },

        2: {
          id: 2,
          name: 'child item',
          children: [],
          hasSublist: false,
        },
      },
    );
  });

  it('should move item down', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [1, 2],
            hasSublist: false,
          },
          1: {
            id: 1,
            name: 'child item',
            children: [],
            hasSublist: true,
          },

          2: {
            id: 2,
            name: 'child item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: moveItemDown.type,
          payload: { itemId: 1, parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [2, 1],
          hasSublist: false,
        },
        1: {
          id: 1,
          name: 'child item',
          children: [],
          hasSublist: true,
        },

        2: {
          id: 2,
          name: 'child item',
          children: [],
          hasSublist: false,
        },
      },
    );
  });

  it('should add sublist', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: addSublist.type,
          payload: { parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [],
          hasSublist: true,
        },
      },
    );
  });

  it('should remove sublist', () => {
    expect(
      lists(
        {
          0: {
            id: 0,
            name: 'root item',
            children: [1],
            hasSublist: false,
          },
          1: {
            id: 1,
            name: 'child item',
            children: [2],
            hasSublist: true,
          },

          2: {
            id: 2,
            name: 'child item',
            children: [],
            hasSublist: false,
          },
        },
        {
          type: removeSublist.type,
          payload: { parentId: 0 },
        },
      ),
    ).toEqual(
      {
        0: {
          id: 0,
          name: 'root item',
          children: [],
          hasSublist: false,
        },
      },
    );
  });
});
