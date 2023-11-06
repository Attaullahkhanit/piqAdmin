const searchData = (data, searchParam, searchValue) => {
  return data.filter(
    (item) =>
      String(item[searchParam])?.toLowerCase() &&
      String(item[searchParam])
        ?.toLowerCase()
        .includes(searchValue.toLowerCase())
  );
};

export default searchData;
