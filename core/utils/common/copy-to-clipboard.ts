export async function copyToClipboardWithMeta(value: string): Promise<void> {
  if (typeof window === 'undefined' || !navigator?.permissions) return;
  navigator.clipboard.writeText(value)
}