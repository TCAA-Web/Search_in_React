import style from "./Search.module.scss";

export const Search = ({ setSearch }) => {
  return (
    <search className={style.search}>
      <label htmlFor="search">
        Search:
        <input
          type="search"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          name="search"
          placeholder="Search...."
          id="search"
        />
      </label>
    </search>
  );
};
