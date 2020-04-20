module.exports = (code) => {
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
                  <h1>Verification Code</h1>
                  <div>
                    <p>Hello,</p>
                    <p>Your LearnJapanese verification code: <b>${code}</b></p>
                    <p>This code will be expired in 5 minutes from requesting code.</p>
                  </div>
              </div>
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