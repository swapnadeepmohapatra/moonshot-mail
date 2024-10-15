import React from "react";
import { FilterType, useEmailContext } from "../../contexts/EmailContext";
import styles from "./styles.module.css";

const filterOptions = [
  { label: "Unread", type: FilterType.Unread },
  { label: "Read", type: FilterType.Read },
  { label: "Favorites", type: FilterType.Favorites },
];

function FilterBar() {
  const { filter, changeFilter } = useEmailContext();

  return (
    <div className={styles.filterBar}>
      Filter By:
      {filterOptions.map((option) => (
        <button
          key={option.type}
          className={`${styles.filter} ${
            filter === option.type
              ? styles.selectedFilter
              : styles.unselectedFilter
          }`}
          onClick={() => changeFilter(option.type)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
export default FilterBar;
