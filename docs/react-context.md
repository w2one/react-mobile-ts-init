# react context

> 新建

```
import { createContext } from "react";

const UserContext = createContext({ value: "123" });

export default UserContext;

~~~
```

> 设值

```
import UserContext from "./context/UserContext";

const Index = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <UserContext.Provider value="jay">
        <AppContainer />
      </UserContext.Provider>
    </Provider>
  </ErrorBoundary>
);
```

> 调用

```
 <UserContext.Consumer>
      {context => (
        <div data-spm="a-tool">
          拿到{context}
        </div>
      )}
    </UserContext.Consumer>
```

> 字典存这里不是否合适
