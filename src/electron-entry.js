const {
    app,
    BrowserWindow
} = require('electron');

let win;
//electron
const createWindow = () => {
    //create the browser window
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //load the index page of the app
    win.loadURL('http://localhost:3002/')

    //open devtools
    win.webContents.openDevTools()

    //Emitted when the window is closed
    win.on('closed', () => {
        win = null
    })
};




app.on('ready', createWindow);

//Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win == null) {
        createWindow()
    }
})