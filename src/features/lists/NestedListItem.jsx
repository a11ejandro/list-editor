import React from 'react';
import PropTypes from 'prop-types'
import { MoveUp, MoveDown, AddSublist, RemoveSublist, AddItem, RemoveItem } from './itemOperations';

export default class NestedListItem extends React.PureComponent {
  renderChildren(item) {
    const { children } = item
    if (children.length === 0) {
      return '';
    }

    return (
      <ul>
        { children.map((listItem) => (
          <NestedListItem item={listItem} parent={item} key={listItem.id}/>
        ))}
      </ul>
    )
  }

  render() {
    const { item, parent} = this.props
    const { children } = parent
    const isLast = children.indexOf(item) === children.length - 1
    const isFirst = children.indexOf(item) === 0

    return (
        <li>
          <span>{ item.name }</span>
          { !isFirst && <MoveUp itemId={item.id} parentId={parent.id}/> }
          { !isLast && <MoveDown itemId={item.id} parentId={parent.id}/> }
          { !item.hasSublist && <AddSublist parentId={item.id}/> }
          { item.hasSublist && <RemoveSublist parentId={item.id}/> }
          <RemoveItem itemId={item.id} parentId={parent.id}/>
          { item.hasSublist && this.renderChildren(item) }
          { item.hasSublist && <AddItem parentId={item.id}/> }
        </li>
    );
  }
}

const itemShape = {
  id: PropTypes.number.isRequired,
  hasSublist: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};
itemShape.children = PropTypes.arrayOf(PropTypes.shape(itemShape));

const itemPropTypes = PropTypes.shape(itemShape);

NestedListItem.propTypes = {
  rootNode: itemPropTypes
}

NestedListItem.propTypes = {
  item: itemPropTypes,
  parent: itemPropTypes
}
