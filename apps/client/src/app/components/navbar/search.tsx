import React from 'react';
import classes from './search.module.css';

export const Search = () => {
  return (
    <form className={classes.searchBox}>
      <div className={classes.inputGroup}>
        <input type='text' placeholder="Search" className={classes.formControl} />
        <button className={classes.fcBtn} type="submit" >
          <i className={classes.mdiSet}></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
