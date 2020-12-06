import clsx from "clsx";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination-item {
    text-align: center;
    background: transparent;
    margin-right: 6px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    padding: 0;
    color: #7c7c7c;
    font-size: 14px;
    line-height: 31px;
    transition: linear 0.3s;
    cursor: pointer;
    &:not(.pagination-disable):hover {
      background: #e5e8eb;
    }
    &.pagination-active {
      background: #e5e8eb;
      color: #131517;
    }
    &.pagination-disable {
      cursor: not-allowed;
      opacity: 0.5;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

function calculatePage(total, pageSize) {
  return ~~((total - 1) / pageSize) + 1;
}

export default function Pagination({ current = 1, total = 10, pageSize = 10, onChange }) {
  const [page, setPage] = useState(current);
  const allPages = calculatePage(total, pageSize);
  const pager = [];
  const pageBufferSize = 2;
  let left = Math.max(1, page - pageBufferSize);
  let right = Math.min(page + pageBufferSize, allPages);

  const isValid = current => current !== page;

  const hasPrev = page > 1;
  const hasNext = page < allPages;

  const handlePrev = () => {
    if (hasPrev) {
      handleChange(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      handleChange(page + 1);
    }
  };

  const handleChange = current => {
    let page = current;
    if (isValid(current)) {
      if (current > allPages) {
        page = allPages;
      } else if (current < 1) {
        page = 1;
      }
      setPage(page);
      onChange(page);
    }
    return page;
  };

  //if the page buffer size is to large
  if (allPages <= 3 + pageBufferSize * 2) {
    //just push the length of all pages into pager
    for (let i = 1; i <= allPages; ++i) {
      pager.push(
        <li
          className={clsx({
            "pagination-item": true,
            "pagination-active": page === i
          })}
          key={i}
          title={i}
          onClick={() => handleChange(i)}
        >
          {i}
        </li>
      );
    }
  } else {
    //create item when page nearly end or start
    if (page - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }

    if (allPages - page <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }

    for (let i = left; i <= right; ++i) {
      pager.push(
        <li
          className={clsx({
            "pagination-item": true,
            "pagination-active": page === i
          })}
          key={i}
          title={i}
          onClick={() => handleChange(i)}
        >
          {i}
        </li>
      );
    }
  }

  return (
    <Wrapper>
      <li
        className={clsx({
          "pagination-item": true,
          "pagination-disable": !hasPrev
        })}
        title="Previous"
        onClick={handlePrev}
      >
        «
      </li>
      {pager}
      <li
        className={clsx({
          "pagination-item": true,
          "pagination-disable": !hasNext
        })}
        title="Next"
        onClick={handleNext}
      >
        »
      </li>
    </Wrapper>
  );
}
