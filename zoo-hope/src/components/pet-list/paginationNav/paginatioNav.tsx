import { IPet } from "../../../define";

interface IpaginationNav {
  searchParam: {
    set: Function;
    get: Function
  };
  setSearchParams: Function;
  length: number;
  allPets: IPet[];
}

export const PaginationNav = (props: IpaginationNav) => {
  const relNavigateTo = (step: number) => {
    props.searchParam.set("page", Number(props.searchParam.get("page")) + step)
    props.setSearchParams(props.searchParam)
  }

  const linkToPage = (num: number) => {
    const page = Number(props.searchParam.get("page"))

    if (page + num > 0 && page + num <= props.length) {
      return (
        <button 
          className={page + num === Number(page) ? "selected" : ""}
          onClick={() => {relNavigateTo(num)}}
        >
          {page + num}
        </button>
      )
    }
  }
  
  return (
    <>
      {props.allPets.length > 0 &&
        <div className="paginationNav">
        {props.searchParam.get("page") - 1 > 0 ?
          <button
            className="arrow"
            onClick={() => {relNavigateTo(-1)}}
          >
            ‹
          </button> :
          <span className="disabled">‹</span>
        }

        {linkToPage(-2)}
        {linkToPage(-1)}
        {linkToPage(0)}
        {linkToPage(1)}
        {linkToPage(2)}

        
        {Number(props.searchParam.get("page")) + 1 <= props.length ?
          <button
            className="arrow"
            onClick={() => {relNavigateTo(1)}}
          >
            ›
          </button> :
          <span className="disabled">›</span>
        }
      </div>}
    </>
  )
}