declare module 'dom-to-image-more' {
  export interface DomToImageOptions {
    /** Quality level (0.0 to 1.0) */
    quality?: number;
    /** Output width */
    width?: number;
    /** Output height */
    height?: number;
    /** CSS style object to be applied to the clone */
    style?: Partial<CSSStyleDeclaration>;
    /** Filter function */
    filter?: (node: Node) => boolean;
    /** CORS option */
    imagePlaceholder?: string;
    /** Cache size for images */
    cacheBust?: boolean;
    /** Use credentials */
    useCredentials?: boolean;
  }

  export function toSvg(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toPng(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toJpeg(node: Node, options?: DomToImageOptions): Promise<string>;
  export function toBlob(node: Node, options?: DomToImageOptions): Promise<Blob>;
  export function toPixelData(node: Node, options?: DomToImageOptions): Promise<Uint8ClampedArray>;

  const domtoimage: {
    toSvg: typeof toSvg;
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toBlob: typeof toBlob;
    toPixelData: typeof toPixelData;
  };

  export default domtoimage;
} 