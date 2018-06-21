import React from 'react';

export default class Paginator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page_turners: props.page_turners,
      active_page: 0
    }
  }

  activateTurner(turner, page_number) {
    return () => {
      this.setState({active_page: page_number});
      turner();
    }
  }

  changePage(page_number) {
    if(page_number > -1)
      if(page_number < this.state.page_turners.length)
        return this.activateTurner(this.state.page_turners[page_number], page_number)

    return () => {};
  }

  render() {
    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" aria-label="Previous"
               onClick={this.changePage(this.state.active_page - 1)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          {this.state.page_turners.map((page_turner, index) => {
            let active = this.state.active_page === index ? " active" : "";
            return (
              <li className={"page-item" + active}>
                <a className="page-link"
                   onClick={this.activateTurner(page_turner, index)}>{index + 1}</a>
              </li>
            )
          })}

          <li className="page-item">
            <a className="page-link" aria-label="Next"
              onClick={this.changePage(this.state.active_page + 1)}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}