# File system
An unattractive but effective file system for storing things you are ok losing.

I did my own extension of being able to download and upload from JSON so that you don't lose your files when you close the browser.

## How to run
- Install dependencies: `yarn install`
- Build application (both frontend and backend in http://localhost:8080): `yarn build`
    - Some browser automatically redirects you to `https` so make sure to disable the automatic redirect
- Run application (port 8080): `yarn start`
- You can then click "Set up example" and it will be populated as specified in the prompt
- You also can manually add directories and files using the text boxes and "submit buttons"
- The UI for clicking is not good, but if you click on a directory or file, you can delete them
- Also will add directory/file to directory clicked as specified (add to root if none selected)
- There's also a weird thing where after you add your first directory, if you want to add to the home directory, you have to click on the home button

## Areas for improvement
- Write unit tests
- Add comments and documentation to better specify what functions do
- Refactor to move functions out of App
- Update logic for root element so that it looks better and also you don't need to use home button functionality
- Improve UI-- show which item is selected, right now it's not possible to see for files, and hard to see for directories since they highlight when clicked to collapse
- Pagination of file system to make it easier to browse
- Improve download/upload from JSON-- right now, after you click the download button, you'd have to move the file from your Downloads into this directory to upload the file
- Make add file/directory form show up on the directory to make it easier to see where you're adding file/directory and avoid scrolling back and forth; same for deleting
