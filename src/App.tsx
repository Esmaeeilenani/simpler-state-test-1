import React, { useState } from "react";
import { authEntity, setAuth, clearAuth } from "./entities/auth.entities";
import { appEntity, requestEnd, requestStart } from "./entities/app.entities";
import Product from "./factory/productFactory";
import axios from "axios";

import { BroadcastChannel } from "broadcast-channel";

const channel = new BroadcastChannel("auth");

function App() {
  const auth = authEntity.use();
  const requesting = appEntity.use((state) => state.requesting);

  //Print channel masseges
  channel.onmessage = (msg) => {
    if (msg === "Logout") {
      clearAuth();
    }
  };

  const isRequesting =
    requesting.status && requesting.caller === "fetch-product";

  async function onClickFetch() {
    if (auth.user === null) {
      alert("cnnot featch login first");
      return;
    }

    requestStart("fetch-product");

    const res = await Product.getAll()
      .catch((err) => err)
      .finally(() => requestEnd());

    if (axios.isAxiosError(res)) {
      console.log(res.message);
      return;
    }

    console.log(res.data);
  }

  function onClickLogin() {
    setAuth(
      {
        firstName: "esmaeeil",
        lastName: "enani",
        email: "esmaeeil@mail.com",
        id: "cvvghj",
      },
      "jfvndlk"
    );
  }

  function onClickLogout() {
    clearAuth();
    channel.postMessage("Logout");
  }

  return (
    <div className="App">
      <p>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      </p>
      <p>
        <pre>{JSON.stringify({ isRequesting }, null, 2)}</pre>
      </p>
      <h1>Hello CodeSandbox</h1>
      <button onClick={onClickFetch}>Start fetching products</button>
      <button onClick={onClickLogin}>Log in</button>
      <button onClick={onClickLogout}>Log out</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default App;
