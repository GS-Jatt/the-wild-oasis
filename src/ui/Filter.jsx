import { stringify } from "postcss";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;


export default function Filter({ fieldName, filters }) {
  const [searchParam, setSearchParam] = useSearchParams()
  const activeFilter = searchParam.get(fieldName) || 'all';
  function headleClick(value) {
    searchParam.set(fieldName, value);
    if(searchParam.get('page')) searchParam.set('page', 1);
    setSearchParam(searchParam);
  }
  return (
    <StyledFilter>
      {
        filters.map((filter) => <FilterButton
          key={filter.value}
          active={activeFilter === filter.value? 1:'' }
          disabled={activeFilter == filter.value}
          onClick={() => headleClick(filter.value)}> {filter.label}</FilterButton>)
      }
    </StyledFilter>
  )
}