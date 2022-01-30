# Calls examples
```
mutation {
  register {
    errors {
      field
      message
    },
    user {
      id
      username
    }
  }
}
```
```
{
    hello
}
```

```
mutation {
    register(username: "asdf", password: "lalala", age: 32) {
        user {
            id
        }
    }
}
```