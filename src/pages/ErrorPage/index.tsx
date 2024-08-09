import styles from './index.module.less';
import { useRouteError } from 'react-router-dom';

interface ICustomError {
  status: number,
  statusText: string
}
function isICustomError(param: any): param is ICustomError {
  return (
    param && 'status' in param && 'statusText' in param
  );
};

function useCustomRouteError(): ICustomError | undefined {
  const error = useRouteError();
  console.log(error);
  if (isICustomError(error)) {
    return {
      status: error.status,
      statusText: error.statusText,
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
      <div>{error ? error.statusText : '未知错误'}</div>
    </div>
  );
}