const Search = () => {
  return (
    <>
      <h1 className="flex justify-center my-4 text-lg">Cerca</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Cerca . . ."
          className="input input-bordered input-primary w-full max-w-xs h-10"
        />
      </div>
    </>
  );
};

export default Search;
