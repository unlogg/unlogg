// "use client";

// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// const COOKIE_NAME = "active_theme";
// const DEFAULT_THEME = "default";

// function setThemeCookie(theme: string) {
//   if (typeof window === "undefined") return;

//   document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
//     window.location.protocol === "https:" ? "Secure;" : ""
//   }`;
// }

// type ThemeContextType = {
//   activeTheme: string;
//   setActiveTheme: (theme: string) => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ActiveThemeProvider({ children }: { children: ReactNode }) {
//   const [activeTheme, setActiveTheme] = useState<string>(DEFAULT_THEME);

//   useEffect(() => {
//     const cookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith(`${COOKIE_NAME}=`));
//     if (cookie) {
//       const cookieTheme = cookie.split("=")[1];
//       if (cookieTheme && cookieTheme !== activeTheme) {
//         setActiveTheme(cookieTheme);
//       }
//     }
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     setThemeCookie(activeTheme);

//     Array.from(document.body.classList)
//       .filter((className) => className.startsWith("theme-"))
//       .forEach((className) => {
//         document.body.classList.remove(className);
//       });

//     document.body.classList.add(`theme-${activeTheme}`);
//     if (activeTheme.endsWith("-scaled")) {
//       document.body.classList.add("theme-scaled");
//     }
//   }, [activeTheme]);

//   return (
//     <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//           (function() {
//             try {
//               const themeCookie = document.cookie
//                 .split('; ')
//                 .find(row => row.startsWith('active_theme='));
//               if (themeCookie) {
//                 const theme = themeCookie.split('=')[1];
//                 document.body.classList.add('theme-' + theme);
//               }
//             } catch (e) {}
//           })();
//         `,
//         }}
//       />
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useThemeConfig() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error(
//       "useThemeConfig must be used within an ActiveThemeProvider"
//     );
//   }
//   return context;
// }

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = "default";

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (cookie) {
      const cookieTheme = cookie.split("=")[1];
      if (cookieTheme && cookieTheme !== activeTheme) {
        setActiveTheme(cookieTheme);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setThemeCookie(activeTheme);
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      <div className={`theme-${activeTheme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
