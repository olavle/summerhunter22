import { User } from '../types/global';

export const userFromLocalStorage = () => {
  const user: User = {
    userId: window.localStorage
      .getItem('userId')
      ?.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') as string,
    userName: window.localStorage
      .getItem('userName')
      ?.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') as string,
  };
  return !user.userId ? null : user;
};
