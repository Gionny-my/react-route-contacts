import { useEffect, useState } from 'react';

import styles from "./index.module.less";
import { useFetcher } from 'react-router-dom';

interface IFavoriteProps {
  isFavorite: boolean,
};

export default function Favorite(props: IFavoriteProps){
  const [isFavorite, setFavorite] = useState(props.isFavorite);
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

  return (
    <>
      <fetcher.Form method="post">
        <button
          name="isFavorite"
          value={`${isFavorite}`}
          type="submit"
          className={styles.button}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    </>
  );
}