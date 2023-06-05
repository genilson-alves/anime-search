export default function PageNavigation(props) {
  const nextPage = () => {
    if (props.page <= 0) {
      props.setPage(1);
    } else {
      props.setPage(props.page + 1);
    }
  };

  const previousPage = () => {
    if (props.page <= 1) {
      props.setPage(1);
    } else {
      props.setPage(props.page - 1);
    }
  };
  return (
    <nav aria-label="navigation">
      {
        <ul className="pagination pagination-sm justify-content-center">
          {props.page == 1 ? (
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
          ) : (
            <ul className="pagination pagination-sm justify-content-center">
              <li className="page-item">
                <a className="page-link" onClick={previousPage}>
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" onClick={previousPage}>
                  {props.page - 1}
                </a>
              </li>
            </ul>
          )}
          <li className="page-item active" aria-current="page">
            <a className="page-link">{props.page}</a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={nextPage}>
              {props.page + 1}
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      }
    </nav>
  );
}
