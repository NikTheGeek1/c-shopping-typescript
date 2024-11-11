export default function changeFileExtension(filename: string, newExtension: string): string {
  const ext = filename.split('.').pop();
  return filename.replace(new RegExp(`${ext}$`), newExtension);
}