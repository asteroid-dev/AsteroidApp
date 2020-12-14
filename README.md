# AsteroidApp
The alternative browser with Flash Player for Windows 7/10 (x32/x64) and MacOS.

## How to install?
1. Download NodeJS: https://nodejs.org/
 
2. Open `Command Prompt` and make sure you are in the same location as the AsteroidApp.

3. Install the dependencies by execute the command: `npm install`

4. Make sure the file `package.json` is set up as desired.

    • productName = Hotel name
    
    • appId = nl.hotelname.appname (also in Main.js!)

5. Open the configuration file `config.env` and put your link here like this:

    URL = https://www.habbo.com
    
    SHORT_URL = habbo.com
    
6. Translate/edit the file `views/home.html`

7. Open `Command Prompt` again and execute the command: `npm start` 

8. Yay congrats! Your app should be up and running. If everything is okay you can make it a .exe or a .dmg

9. Open `Command Prompt` again and execute one of these commands:
    * `npm run windows` - For Windows 
    * `npm run mac` - For Mac 
    
10. Yay! your app is ready for publishing! Go to the folder `dist` and your .exe / .dmg should be there!

## Help! I get a Windows/Mac untrusted/virus/defender warning!
Depending on your/your players security settings you may receive a message warning you that the application is from an unknown (untrusted) publisher.

Windows instructions: https://www.pcworld.com/article/3197443/how-to-get-past-windows-defender-smartscreen-in-windows-10.html

MacOS instructions: https://www.imore.com/how-open-apps-anywhere-macos-catalina-and-mojave

You must purchase a Windows and / or Mac signing certificate to avoid a warning message.

## How to sign the application for Mac?
1. Find in `package.json`:

		"extraResources": [
			{
				"from": "./plugins/",
				"to": "../plugins"
			}
		],
		
2. Replace with:

        "files": "!src/SignHook.js",
        "extraResources": [
            {
                "from": "./plugins/",
                "to": "../plugins"
            }
        ],
        "afterSign": "src/SignHook.js",

3. Open `src/SignHook.js` and change the appleId/appleIdPassword to yours.

        appleId: 'myemail@gmail.com',
        appleIdPassword: '123-321-ab23-m4d',
        
4. Open `Command Prompt` again and execute the command: `npm run mac`

It can take some minutes because this will notarize and create the application.

## How to sign the Application for Windows?
Actually, a Windows signing certificate is not necessary as long as people 'allow the app' to run. It builds an 'app reputation' which means the warning messages will disappear in a few days / months.
Since most people don't pay $ 700 + / - for a Windows signing certificate, I won't include a tutorial for this, but a cheaper solution would be to publish the application in the Windows App Store.
If anyone is interested in this, you can always contact me for help.

