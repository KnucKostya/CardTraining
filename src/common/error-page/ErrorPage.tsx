import { useRouteError } from "react-router-dom";
import s from "common/error-page/ErrorPage.module.css";
import error404 from "./404.svg";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className={s.errorPage}>
      <img src={error404} alt={"404"} className={s.error404} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
