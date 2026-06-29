import { useState, type ImgHTMLAttributes, type ReactEventHandler } from "react";

type BlurImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Low-quality placeholder URL (tiny image). Rendered blurred behind the real image. */
  placeholder?: string;
  /** Optional solid colour shown before the placeholder paints. */
  placeholderColor?: string;
};

/**
 * Drop-in <img> replacement that paints a blurred low-quality placeholder
 * (LQIP) until the full-resolution image has decoded, then fades it in.
 *
 * Requires the PARENT element to be position:relative and overflow:hidden
 * so the absolutely-positioned placeholder layer stays clipped.
 */
export function BlurImage({
  placeholder,
  placeholderColor,
  className = "",
  onLoad,
  loading = "lazy",
  decoding = "async",
  ...rest
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  return (
    <>
      {(placeholder || placeholderColor) && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundColor: placeholderColor,
            backgroundImage: placeholder ? `url(${placeholder})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: placeholder ? "blur(24px) saturate(1.2)" : undefined,
            transform: placeholder ? "scale(1.15)" : undefined,
          }}
        />
      )}
      <img
        {...rest}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        className={`${className} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
