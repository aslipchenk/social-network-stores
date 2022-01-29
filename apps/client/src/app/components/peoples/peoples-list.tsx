import { useEffect, useState } from 'react';
import classes from './people-list.module.css';
import Human from './human';
import PeopleListHeader from './people-list-header';
import UserService from '../../services/user-service';

const getUserList = (userList: any) => {
  return userList.map((item: any) => {
    return <Human key={item.id} user={item} />;
  });
};

export const PeoplesList = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    (async function () {
      const { data } = await UserService.userList({});
      setUserList(data);
    })();
  }, []);

  return (
    <section className={classes.container}>
      <PeopleListHeader />
      <ul className={classes.taskItems}>{getUserList(userList)}</ul>
    </section>
  );
};

export default PeoplesList;
