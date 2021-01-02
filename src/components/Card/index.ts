import { lazy } from "react";

// FIXME: #1 - Card Object ("Media Queries of Card" need to be fixed before this)
const Card = {
  Provider: window.innerWidth < 480
    ? () => null
    : lazy(() => import('./CardProvider'))
};

export default Card;
