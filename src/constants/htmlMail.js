module.exports = (token) => {
        return `<!DOCTYPE html>
        <html lang="en" style="margin: 0;box-sizing: border-box;">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body style="margin: 0;box-sizing: border-box;">
            <div class="container" style="box-sizing: border-box;width: 100%;height: auto;overflow: auto;background-color: rgb(243, 243, 243);padding: 3em;">
                <div class="content" style="box-sizing: border-box;width: 50%;height: auto;overflow: auto;margin: 0 auto;padding: 1em;background-color: #ffffff;">
                    <!-- logo -->
                    <div class="block" style="text-align: center;box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <img src="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.15752-9/92231673_658563218023685_3861127035908784128_n.png?_nc_cat=102&_nc_sid=b96e70&_nc_ohc=9uQx6qXY5U4AX9Mw9dN&_nc_ht=scontent-xsp1-2.xx&oh=aba283ad3c3227525c865f02094313b2&oe=5EB24E56" alt="Logo" class="logo" style="margin: 0 auto;width: 40%;">
                    </div> 
                    <!-- end-logo -->
        
                    <div class="block" style="box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <div class="font" style="font-size: 1em;font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height: 1.5em;color: #4c4c4c;">Thanks for signing up with Learn Japanese! You must click this button to activate your
                            account:</div>
                    </div>
        
                    <!-- form-activate -->
                    <div class="block" style="text-align: center;box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <form action="http://localhost:3000/api/users/confirm-register" method="POST" style="margin: 0;box-sizing: border-box;">
                            <input value="${token}" name="token" style="display: none">
                            <input onmouseover="this.style.backgroundImage = 'linear-gradient(to right,#ff425b,#c42251)'" onmouseout="this.style.backgroundImage='linear-gradient(to right,#c42251,#ff425b)'" type="submit" value="Activate account" class="btn" style="cursor: pointer; color: white;width: auto;border-radius: 1em;background-image: linear-gradient(to right,#c42251,#ff425b);font-size: 1em;border: none;outline: none;padding: 0.8em 1em;font-weight: bold;">
                        </form>
                    </div>
                    <!-- end-form-activate -->
        
                    <div class="block" style="box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <div class="font" style="font-size: 1em;font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height: 1.5em;color: #4c4c4c;">Have fun, and don't hesitate to contact us with your feedback.</div>
                    </div>
                    <div class="block" style="box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <div class="font" style="font-size: 1em;font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height: 1.5em;color: #4c4c4c;">The Learn Japanese Team</div>
                        <div class="font" style="font-size: 1em;font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height: 1.5em;color: #4c4c4c;">
                            <a href="https://dev-learn-backend.herokuapp.com">https://dev-learn-backend.herokuapp.com</a>
                        </div>
                    </div>
                    <div class="block" style="padding-top: 0.5em;padding-bottom: 0.5em;box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <div class="line" style="width: 100%;border: solid 0.5px darkgrey;"></div>
                    </div>
        
                    <div class="block" style="box-sizing: border-box;padding: 1em 2em;width: 100%;">
                        <div class="font font--small" style="font-size: 0.8em;font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height: 1.5em;color: #4c4c4c;">Learn Japanese is a website to learn and improve japanese skill.</div>
                    </div>
                </div>
            </div>
        </body>
        
    </html>`
}