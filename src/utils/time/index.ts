// function that set time out for specified time
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
