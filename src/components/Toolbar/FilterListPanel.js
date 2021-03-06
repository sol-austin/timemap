import React from 'react'
import Checkbox from '../presentational/Checkbox'
import copy from '../../common/data/copy.json'

/** recursively get an array of node keys to toggle */
function childrenToToggle (node, activeFilters, parentOn) {
  const isOn = activeFilters.includes(node.key)
  if (!node.children) {
    return [node.key]
  }
  const childKeys = Object.values(node.children)
    .flatMap(n => childrenToToggle(n, activeFilters, isOn))
  // NB: if turning a parent off, don't toggle off children on.
  //     likewise if turning a parent on, don't toggle on children off
  if (!((!parentOn && isOn) || (parentOn && !isOn))) {
    childKeys.push(node.key)
  }
  return childKeys
}

function FilterListPanel ({
  filters,
  activeFilters,
  onSelectFilter,
  language
}) {
  function createNodeComponent (node, depth) {
    const matchingKeys = childrenToToggle(node, activeFilters, activeFilters.includes(node.key))
    const children = Object.values(node.children)
    return (
      <li
        key={node.key.replace(/ /g, '_')}
        className={'filter-filter'}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        {/* <svg width='10' height='10'> */}
        {/*   <g className='filter-inline'> */}
        {/*     <path d='M0,-7.847549217020565L6.796176979388489,3.9237746085102825L-6.796176979388489,3.9237746085102825Z' transform='rotate(270)' /> */}
        {/*   </g> */}
        {/* </svg> */}
        <Checkbox
          label={node.key}
          isActive={activeFilters.includes(node.key)}
          onClickCheckbox={() => onSelectFilter(matchingKeys)}
        />
        {children.length > 0
          ? children.map(filter => createNodeComponent(filter, depth + 1))
          : null}
      </li>
    )
  }

  function renderTree (children) {
    return (
      <div>
        {Object.values(children).map(filter => createNodeComponent(filter, 1))}
      </div>
    )
  }

  return (
    <div className='react-innertabpanel'>
      <h2>{copy[language].toolbar.filters}</h2>
      <p>{copy[language].toolbar.explore_by_filter__description}</p>
      {renderTree(filters.children)}
    </div>
  )
}

export default FilterListPanel
