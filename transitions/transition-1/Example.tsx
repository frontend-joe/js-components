import { createContext, useCallback, useContext, useState } from "react";
import type { AnimationEvent, MouseEvent } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./styles.css";

type PageConfig = {
  to: string;
  title: string;
  background: string;
  color: string;
};

const pages: PageConfig[] = [
  { to: "/home", title: "Home", background: "#fff", color: "#000" },
  { to: "/portfolio", title: "Portfolio", background: "#000", color: "#fff" },
  { to: "/contact", title: "Contact", background: "#fff", color: "#000" },
];

/**
 * `covering` — the bubbles are rising to fill the screen.
 * `holding`  — they fill it, the route has changed behind them, and they stay
 *              put for `--enter-delay` so the incoming nav is already animating
 *              in by the time they drop away.
 */
type Transition = { page: PageConfig; phase: "covering" | "holding" };

/** Lets a link deep in the tree start a transition on the layout that owns the
 *  bubbles, without either of them reaching for the DOM. */
const TransitionContext = createContext<(page: PageConfig) => void>(() => {});

const Page = ({ title, background, color }: PageConfig) => (
  <section style={{ background, color }}>
    <Nav title={title} />
  </section>
);

const Link = ({ page }: { page: PageConfig }) => {
  const transitionTo = useContext(TransitionContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // The bubbles have to cover the screen before the route is allowed to change.
    event.preventDefault();
    transitionTo(page);
  };

  return (
    <NavLink
      to={page.to}
      onClick={handleClick}
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      {page.title}
    </NavLink>
  );
};

const Nav = ({ title }: { title: string }) => (
  <nav>
    <h1>{title}</h1>
    <ul>
      {pages.map((page) => (
        <li key={page.to}>
          <Link page={page} />
        </li>
      ))}
    </ul>
  </nav>
);

const Bubbles = ({
  transition,
  onAnimationEnd,
}: {
  transition: Transition | null;
  onAnimationEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) => (
  <div className={transition ? `bubbles ${transition.phase}` : "bubbles"}>
    <div className="bubbles__first" />
    <div
      className="bubbles__second"
      // Settle on the background of the page we are about to reveal, so the
      // cover and the incoming page are the same colour when it lifts.
      style={{ background: transition?.page.background }}
      onAnimationEnd={onAnimationEnd}
    />
  </div>
);

const Layout = () => {
  const navigate = useNavigate();
  const [transition, setTransition] = useState<Transition | null>(null);

  const transitionTo = useCallback(
    // Ignore any further clicks until the running transition has finished.
    (page: PageConfig) =>
      setTransition((current) => current ?? { page, phase: "covering" }),
    []
  );

  // Both phases are ended by the CSS that draws them rather than by a timer, so
  // the durations only ever live in one place.
  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!transition) return;

    if (event.animationName === "bubble-second-move") {
      // The screen is covered — swap the route behind it.
      navigate(transition.page.to);
      setTransition({ ...transition, phase: "holding" });
    }

    if (event.animationName === "hold") setTransition(null);
  };

  return (
    <TransitionContext.Provider value={transitionTo}>
      <Bubbles transition={transition} onAnimationEnd={handleAnimationEnd} />
      <Outlet />
    </TransitionContext.Provider>
  );
};

export const Example = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={pages[0].to} replace />} />
        {pages.map((page) => (
          <Route
            key={page.to}
            path={page.to}
            // Every route renders the same `Page` component, so without a key
            // React would reuse the nodes and the `appear` animation would
            // never restart. The key forces a remount on each navigation.
            element={<Page key={page.to} {...page} />}
          />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);
