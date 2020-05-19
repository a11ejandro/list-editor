import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import NestedListItem from './NestedListItem';
import { childrenToTree } from '../../common/util'
import { AddItem } from './itemOperations'

class List extends React.PureComponent {
  render() {
    const { rootNode } = this.props
    return(
      <div>
        <h1>
          A Nested List Editor
        </h1>
        <ul>
          { rootNode.children.map((listItem) => (
            <NestedListItem item={listItem} parent={rootNode} key={listItem.id}/>
          ))}
        </ul>
        <AddItem parentId={rootNode.id}/>
      </div>
    )
  }
}

const listShape = {
  id: PropTypes.number.isRequired,
  hasSublist: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};
listShape.children = PropTypes.arrayOf(PropTypes.shape(listShape));

const listPropTypes = PropTypes.shape(listShape);

List.propTypes = {
  rootNode: listPropTypes
}

const mapStateToProps = state => ({
  rootNode: childrenToTree({...state.list}, Object.keys(state.list))[0]
})

export default connect(
  mapStateToProps
)(List);
