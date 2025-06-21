import { ImageResponse } from "next/og";
import type { ReactElement, ReactNode } from "react";
import type { ImageResponseOptions } from "next/dist/compiled/@vercel/og/types";

interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
  primaryTextColor?: string;
}

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions
): ImageResponse {
  const { title, description, primaryTextColor, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
      primaryTextColor,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    }
  );
}

export function generate({
  primaryTextColor = "#CBFF6B",
  ...props
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        // backgroundColor: "rgb(10,10,10)",
        fontFamily: "DM Sans, sans-serif",
        // create linear gradient for background color from bottom left to top right
        backgroundImage:
          "linear-gradient(to top right, rgb(10, 10, 10), rgb(39, 52, 0))",
        padding: "2rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "76px",
            color: primaryTextColor,
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: "48px",
            color: "rgba(240,240,240,0.7)",
          }}
        >
          {props.description}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            color: primaryTextColor,
          }}
        >
          <svg
            width="126"
            height="77"
            viewBox="0 0 126 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M126 43.1217L100.149 0.00181537L52.5221 76.9979L105.044 77L126 43.1217Z"
              fill="#A3E635"
              fill-opacity="0.95"
            />
            <path
              d="M73.4779 43.1199L47.6271 0L0 76.9961L52.5221 76.9979L73.4779 43.1199Z"
              fill="#CBFF6B"
            />
          </svg>

          <p
            style={{
              fontSize: "56px",
              fontWeight: 600,
              fontFamily: "Sora, sans-serif",
              color: "rgba(240,240,240,0.7)",
            }}
          >
            unlogg
          </p>
        </div>
      </div>
    </div>
  );
}
