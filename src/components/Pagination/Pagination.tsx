import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'
import React from "react";


type PaginationProps = {
    currentPage: number,
    onChangeCurrentPage: (i: number) => void
}

let Pagination: React.FC<PaginationProps> = ({currentPage, onChangeCurrentPage}) => {

    return <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangeCurrentPage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        // @ts-ignore
        renderOnZeroPageCount={null}
    />
}
export default Pagination