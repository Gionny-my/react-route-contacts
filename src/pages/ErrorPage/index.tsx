import styles from './index.module.less';
import { useRouteError } from 'react-router-dom';

interface ICustomError {
  message: string,
}

function useCustomRouteError(): ICustomError | undefined {
  const error = useRouteError();
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }
  return undefined;
};

export default function ErrorPage(){
  const error = useCustomRouteError();
  
  return (
    <div className={styles.outer}>
      <div>出错啦！！</div>
      <div>错误信息如下：</div>
      <div>{error ? error.message : '未知错误'}</div>
    </div>
  );
}