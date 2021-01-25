export function descendingComparator(a, b, orderBy) {
  a = orderBy === "login" ? a[orderBy].toLowerCase() : a[orderBy];
  b = orderBy === "login" ? b[orderBy].toLowerCase() : b[orderBy];
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function AddOrderNum(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = {
      ...arr[i],
      num: i + 1,
    };
  }
  return newArr;
}
