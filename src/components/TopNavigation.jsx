export default function TopNavigation(props) {
  const nextPage = () => {
    if (props.pageNumber <= 0) {
      props.setPage(1);
    } else {
      props.setPage(props.pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (props.pageNumber <= 1) {
      props.setPage(1);
    } else {
      props.setPage(props.pageNumber - 1);
    }
  };
  return (
    <nav aria-label="navigation">
      {
        <ul className="pagination pagination-sm justify-content-center">
          {props.pageNumber == 1 ? (
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
          ) : (
            <ul className="pagination pagination-sm justify-content-center">
              <li class="page-item">
                <a class="page-link" onClick={previousPage}>
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" onClick={previousPage}>
                  {props.pageNumber - 1}
                </a>
              </li>
            </ul>
          )}
          <li className="page-item active" aria-current="page">
            <a className="page-link">{props.pageNumber}</a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={nextPage}>
              {props.pageNumber + 1}
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
