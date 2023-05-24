export function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, "");
}

export function substringText(str: string, lengthLimit: number) {
  if (str?.length > lengthLimit) return str.substring(0, lengthLimit) + "...";
  return str;
}

export function removeHTMLTags(str: string) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export function capitalizeText(str: string) {
  return str.replace(/\b\w/g, function (l) {
    return l.toUpperCase();
  });
}
