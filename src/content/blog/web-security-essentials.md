---
title: "Web Security Essentials: Protecting Modern Applications"
author: "Dev Elevate Team"
date: 2024-03-29
category: "Web Development"
excerpt: "Learn essential security practices for modern web applications"
tags: ["Security", "Web Development", "Backend"]
---

# Web Security Essentials: Protecting Modern Applications

Security is crucial for web applications. Let's explore essential security practices and implementations.

## Cross-Site Scripting (XSS) Prevention

```javascript
// Bad - vulnerable to XSS
element.innerHTML = userInput;

// Good - escape HTML
element.textContent = userInput;

// Using DOMPurify for HTML content
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## CSRF Protection

```javascript
// Express middleware for CSRF protection
const csrf = require('csurf');
app.use(csrf({ cookie: true }));

// React component with CSRF token
function Form() {
  return (
    <form method="POST" action="/api/data">
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Secure Headers

```javascript
// Express security headers
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  referrerPolicy: { policy: 'same-origin' },
}));
```

## Authentication Best Practices

```javascript
// Password hashing
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// JWT implementation
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}
```

## SQL Injection Prevention

```javascript
// Bad - vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// Good - using parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userInput]);

// Using an ORM (Prisma example)
const user = await prisma.user.findUnique({
  where: { email: userInput }
});
```

## Best Practices

1. Always validate user input
2. Use HTTPS everywhere
3. Implement proper authentication
4. Keep dependencies updated
5. Follow the principle of least privilege
6. Regular security audits
7. Implement rate limiting

## Security Checklist

- [ ] Input validation and sanitization
- [ ] HTTPS implementation
- [ ] Secure session management
- [ ] Password hashing
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] Security headers
- [ ] Rate limiting
- [ ] Error handling
- [ ] Logging and monitoring

## Conclusion

Web security is an ongoing process that requires constant attention and updates. Following these practices helps protect your applications and users from common security threats.