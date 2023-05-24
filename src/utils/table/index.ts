export function renderCell({ value }: { value: string | null | undefined }) {
  return !!value ? value : "- - -";
}
