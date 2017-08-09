import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import paginator from 'paginator';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';
//styles
import { styles } from '@descco/ui-core';
const classes = styles.pagination;

/**
 * Pagination component
 * @extends {PureComponent }
 * @class
 */
class Pagination extends PureComponent {
  /**
   * defaultProps
   * @property {Number} itemsCountPerPage
   * @property {Number} pageRangeDisplayed
   * @property {Number} activePage
   * @property {String} prevPageText
   * @property {String} firstPageText
   * @property {String} nextPageText
   * @property {String} lastPageText
   */
  static defaultProps = {
    itemsCountPerPage: 10,
    pageRangeDisplayed: 5,
    activePage: 1,
    prevPageText: '⟨',
    firstPageText: '«',
    nextPageText: '⟩',
    lastPageText: '»'
  };

  /**
   * propTypes
   * @property {Number} totalItemsCount
   * @property {Number} onChange
   * @property {Number} activePage
   * @property {Number} itemsCountPerPage
   * @property {Number} pageRangeDisplayed
   * @property {String} prevPageText
   * @property {String} firstPageText
   * @property {String} nextPageText
   * @property {String} lastPageText
   * @property {String} firstPageText
   * @property {Boolean} hideDisabled
   */
  static propTypes = {
    totalItemsCount: PropTypes.number,
    onChange: PropTypes.func,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    prevPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    nextPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    lastPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    firstPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hideDisabled: PropTypes.bool,
    itemChange: PropTypes.func,
    activeClass: PropTypes.bool,
    className: PropTypes.string
  };

  /**
   * buildPages
   */
  buildPages() {
    const pages = [];
    const { itemsCountPerPage, pageRangeDisplayed, activePage, prevPageText, nextPageText, firstPageText, lastPageText, totalItemsCount, itemChange, activeClass, hideDisabled } = this.props;

    const paginationInfo = new paginator(itemsCountPerPage, pageRangeDisplayed)
      .build(totalItemsCount, activePage);

    if (paginationInfo.first_page !== paginationInfo.last_page) {
      for(let i = paginationInfo.first_page; i <= paginationInfo.last_page; i++) {
        pages.push(
          <PaginationItem
            isActive={i === activePage}
            key={i}
            pageNumber={i}
            pageText={i + ''}
            onClick={itemChange}
            activeClass={activeClass}
          />
        );
      }
    }

    (hideDisabled && !paginationInfo.has_previous_page) || pages.unshift(
      <PaginationItem
        key={'prev' + paginationInfo.previous_page}
        pageNumber={paginationInfo.previous_page}
        onClick={itemChange}
        pageText={prevPageText}
        isDisabled={!paginationInfo.has_previous_page}
      />
    );

    (hideDisabled && !paginationInfo.has_previous_page) || pages.unshift(
      <PaginationItem
        key={'first'}
        pageNumber={1}
        onClick={itemChange}
        pageText={firstPageText}
        isDisabled={paginationInfo.current_page === paginationInfo.first_page}
      />
    );

    (hideDisabled && !paginationInfo.has_next_page) || pages.push(
      <PaginationItem
        key={'next' + paginationInfo.next_page}
        pageNumber={paginationInfo.next_page}
        onClick={itemChange}
        pageText={nextPageText}
        isDisabled={!paginationInfo.has_next_page}
      />
    );

    (hideDisabled && !paginationInfo.has_next_page) || pages.push(
      <PaginationItem
        key={'last'}
        pageNumber={paginationInfo.total_pages}
        onClick={itemChange}
        pageText={lastPageText}
        isDisabled={paginationInfo.current_page === paginationInfo.total_pages}
      />
    );

    return pages;
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { className } = this.props;
    const pages = this.buildPages();

    return (
      <ul className={classNames(className, classes.pagination)}>{pages}</ul>
    );
  }
}

/**
 * PaginationItem component
 * @extends {PureComponent }
 * @class
 */
class PaginationItem extends PureComponent {
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * defaultProps
   * @property {Number} total
   */
  static defaultProps = {
    isActive: false,
    isDisabled: false
  };

  /**
   * propTypes
   * @property {Number} total
   */
  static propTypes = {
    pageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    pageNumber: PropTypes.number,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool
  };

  /**
   * handleClick
   */
  handleClick(event) {
    const { isDisabled, pageNumber } = this.props;
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    this.props.onClick(pageNumber);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { pageText, isActive, isDisabled } = this.props;

    const fullClass = classNames(
      classes['pagination-item'],
      {
        [classes.active]: isActive,
        [classes.disabled]: isDisabled
      }
    );

    return (
      <li className={fullClass} onClick={::this.handleClick}>
        <a className={classes['pagination-link']} href="#">
          { pageText }
        </a>
      </li>
    );
  }
}

Pagination.Item = PaginationItem;

/**
 * @example <Pagination />
 */
export default CSSModules(Pagination, classes);
