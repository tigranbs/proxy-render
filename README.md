# proxy-render
Serverside rendering Engine for Frontend frameworks like React.js or Angular.js.

# Why I'm doing this ?
I love Node.js but in some cases it is more easy to develop Web application using `Python, Go, Ruby or Java`, 
but for frontend side if you want something in production, you basically need to make server side rendering for SEO and performance 
so that's makes you to stick on Node.js only, because currently only Node.js have all tools for rendering frontend frameworks on server side.


So the main idea is to build some `Proxy Node.js Rendering server` which will handle frontend environment variables as a JSON, needed to render that specific part 
and will response rendered HTML. It will help for example keep your existing non Node.js backend or just write `Go` application which is just making Proxy Get request to response HTML side.

# Status
I'm just started for my project and will add some more documentation later
