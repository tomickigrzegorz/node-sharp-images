## Photo converter

### Instruction
* Instal latest Node.js  
* `git clone `  
* Next run `yarn` or `npm install`

### How to run

First you must have folder with images, default is `sources/YourFolder/YourPictures` folder where is all images to convert.
```
node script
```
The selection menu will appear:
```
? Folder to convert
```
> Mandatory field, enter the name of the folder that contains the images, this folder must be in the sources folder
```
? Select a format
```
> Choose one of three available formats `[jpg, png, webp]`, `jpg` is set by default
```
? Select breakpoints e.g. 576,768,992,1200
```
> Enter the size of the decimal photos, as a result we will get folders with this name and photos in this humidity. The default breakpoints are set to `576`
```
? Maximum photo height
```
> The inserted number will be responsible for the height of the photos, useful especially when the photo is vertical, then aspect ratio is maintained. The default is `800`
```
? Keep folders
```
> The ability to choose whether to clear the output folder or leave its contents. Choosing `Y` - leaves the folder, choosing `n` deletes the contents of the output folder. The default is set to `Y`


### Folder structure

```
sources
└── lwow
    ├── IMG_0367.jpg
    ├── IMG_0368.jpg
    └── ...
```

```
output
└── lwow
    ├── 576
    │   ├── IMG_0367.jpg
    │   ├── IMG_0368.jpg
    │   └── ...
    ├── 769
    │   ├── IMG_0367.jpg
    │   ├── IMG_0368.jpg
    │   └── ...
    └── 992
        ├── IMG_0367.jpg
        ├── IMG_0368.jpg
        └── ...
```