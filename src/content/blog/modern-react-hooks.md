---
title: "Modern React Hooks: A Complete Guide"
author: "Dev Elevate Team"
date: 2024-03-25
category: "Web Development"
excerpt: "Master React Hooks with practical examples and best practices"
tags: ["React", "JavaScript", "Frontend"]
---

# Modern React Hooks: A Complete Guide

React Hooks revolutionized how we write React components. Let's explore the most important hooks and their practical applications.

## useState: Managing Component State

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## useEffect: Side Effects in Components

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## useContext: Context API Made Simple

```javascript
const ThemeContext = React.createContext('light');

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

## useRef: Accessing DOM Elements

```javascript
function TextInput() {
  const inputRef = useRef();
  
  function focusInput() {
    inputRef.current.focus();
  }
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

## Custom Hooks: Reusable Logic

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```

## Best Practices

1. Always use the exhaustive deps ESLint rule
2. Keep hooks at the top level
3. Name custom hooks with "use" prefix
4. Memoize callbacks and values when needed

## Conclusion

React Hooks provide a powerful way to manage state and side effects in functional components. Understanding these patterns will help you write more maintainable React applications.