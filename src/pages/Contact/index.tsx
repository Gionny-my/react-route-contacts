import { Form } from "react-router-dom";
import styles from "./index.module.less";

export default function Contact(){
  return (
    <div>
      <img src="" alt="" className={styles.photo}/>
      <div className={styles.info}>
        <div>
          <div>name</div>
          <Favorite isFavorite={true} />
        </div>
        <div>这个人什么也没留下</div>
        <div>
          <form action=""><button type="submit">编辑</button></form>
          <form action=""><button type="submit">删除</button></form>
        </div>
      </div>
    </div>
  );
}

interface IFavoriteProps {
  isFavorite: boolean,
};

function Favorite(props: IFavoriteProps){
  const { isFavorite } = props;
  
  return (
    <>
      <Form method="post">
        <button
          name="favorite"
          value={`${isFavorite}`}
          type="submit"
          aria-label={isFavorite ? '取消收藏' : '添加收藏'}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </Form>
    </>
  );
}