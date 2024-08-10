import { useEffect, useState } from 'react';

import styles from "./index.module.less";
import { useFetcher } from 'react-router-dom';

interface IFavoriteProps {
  isFavorite: boolean,
};

export default function Favorite(props: IFavoriteProps){
  const { isFavorite } = props;
  const [favorite, setFavorite] = useState(isFavorite);
  const fetcher = useFetcher();

  useEffect(() => {
    const data = fetcher.data;
    if (fetcher.state === "loading" && data && 'isFavorite' in data) {
      const isFavorite = data.isFavorite;
      if (typeof isFavorite === 'boolean') {
        setFavorite(isFavorite);
      }
    }
  }, [fetcher]);

  useEffect(() => {
    setFavorite(props.isFavorite);
  }, [props]);

  return (
    <>
      <fetcher.Form method="post">
        <button
          name="isFavorite"
          value={`${favorite}`}
          type="submit"
          className={styles.button}
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    </>
  );
}