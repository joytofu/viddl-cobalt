declare module 'gray-matter' {
  export interface MatterData {
    title?: string;
    date?: string;
    excerpt?: string;
    [key: string]: any;
  }

  export interface GrayMatterResult {
    data: MatterData;
    content: string;
    excerpt: string | null;
  }

  export function matter(input: string): GrayMatterResult;
  export default matter;
}