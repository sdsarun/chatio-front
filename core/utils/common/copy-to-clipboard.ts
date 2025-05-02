export async function copyTextToClipboard(value: string): Promise<void> {
  if (typeof window === 'undefined' || !navigator?.permissions) return;
  navigator.clipboard.writeText(value)
}