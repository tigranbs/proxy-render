# About
This project was born from real production kneed! <br/>
I had a project written in `Python and Some GO`, and for frontend I wanted to use React.js, but 
anyone who are developing in React.js knows that `Server Side Rendering` is super important for frontend applications int terms of 
performance and SEO. So I've started investigating is there any rendering platform for React.js for Python or Go. I found few ones, but 
the problem is that solutions using some embed JS engine du do rendering process, which completely non efficient and is very very buggy.

So the main idea is to provide `Proxy Rendering with Cahing`, so that you need only make a `POST request with rendering parameters` 
and separate rendering process will do that work, and you will get rendered HTML as a string response. So that you can then include that string 
inside your static template on the fly.

# Installation
```bash
npm i -g proxy-render
```
This will install package globally and now you will have access to command line executable called `pxrender`.
```bash
~$ pxrender --help
  Usage: pxrender [options] <directory entry point> 
  By providing entry directory rendering server can find requested JSX file by URL path/name

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -p, --port <n>  Define Server Port for starting proxy rendering server
    -R, --release   Run rendering in release mode, which means server will make a caching and a lot more!
    -w, --watch     Watch for file changes for hot reloading rendering process during development

```

# Usage
To start `Proxy Rendering server` you just need to provide base path for your `JSX` files.<br/>
Take a loop on `example-front` directory which you can start serving by running this command
```bash
~$ pxrender -p 3000 ./example-front
```
For getting rendered HTML you need to send `POST request` to rendering server where `Request Body Fileds` would be 
passed as a `Props` for specified React Component.
```bash
curl -H "Content-Type: application/json" -X POST -d '{"name":"test request"}' http://localhost:3000/app.jsx
```

# Example in Python
Check out [Python implementation](https://github.com/tigranbs/proxy-render/tree/master/backend-clients/python) of basic `Proxy Render API call`. It is actually a POST request with JSON encoded body as a `React Props` argument.
<br/>
So now we can just call this Python function from our code and receive rendered HTML from React Templates.
```python
raw_html = get_html('app.jsx', {'name': 'test request from Python'})
print(raw_html)
```

This helps keep frontend and backend code completely separate and in a different repositories for better code management and technology preference.

# Contribution
If you fill uncomfortable with API, you have suggestion or you found a bug, 
feel free to open an issue or send me a pull request, I would love to help.
