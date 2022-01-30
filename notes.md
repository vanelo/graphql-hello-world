# Beginner GraphQl Series
From Ben's tutorial: https://youtu.be/DyvsMKsEsyE
## Query examples
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
```
{
    user {
        id
        username
        firstLetterOfUsername
    }
}
```
```
subscription {
    newUser {
        id
        username
        firstLetterOfUsername
    }
}
```