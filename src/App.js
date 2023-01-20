import { useEffect, useState } from "react";

import { Success } from "./components/Success";

import { Users } from "./components/Users";

import "./index.scss";
// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const [invites, setInvites] = useState([]);

  const [success, setSuccess] = useState(false);

  const onSuccess = () => {
    setSuccess(true);
  };

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onClickInvites = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onSuccess={onSuccess}
          onClickInvites={onClickInvites}
          invites={invites}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          isLoading={isLoading}
          items={users}
        />
      )}
    </div>
  );
}

export default App;
