import React, { useEffect, useState } from "react";
import UserLogged from "./UserLogged";
import UserGuest from "./UserGuest";
import Loading from "../../components/Loading";
import { auth } from "../../utils/firebase";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  return login ? <UserLogged /> : <UserGuest />;
}
