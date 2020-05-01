# hello-express

A server that serves a webpage, its resources, and some data


## Your Project

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/client.js` is the javacript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`
- Drag in `assets`, like images or music, to add them to your project

On the back-end,

- your app starts at `server.js`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)

Click `Show` in the header to see your app live. Updates to your code will instantly deploy.


## Made by [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )

#### bài 15 , check admin ,  set a local variable named  'checkAdmin' and its value is user.isAdmin 
if isAdmin !== true , checkAdmin ='none' => display:${checkAdmin} and vice versa
#### bài 16, Lưu lại số lần login sai của 1 người dùng vào field wrongLoginCount để nếu họ nhập sai lần thứ 4 trở đi, hệ thống sẽ không check hash nữa mà báo lỗi luôn (cái này không phải là rate limit) brcypt hash password 

#### Unit 18 , Enviroment variables , create a sendGrid Account
Get more information [npm-sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)

***Unit 21 - File Upload***
> By using cloudinary , I creaeted view User's profile endpoint , Admin can
> update information , change avatar , and will be able to see avatar clearly  

*** Unit 22 : Session : check SessionId 
> (false , create new and put it in Database)
> (true  , next)

*** Unit 23 , 24 : MongoDb
> save()