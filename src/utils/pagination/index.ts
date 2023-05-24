export function getMaxPage(
  total: number | undefined,
  pageSize: number | undefined
) {
  let maxPage = Math.floor((Number(total) - 1) / Number(pageSize)) + 1;
  return maxPage;
}
