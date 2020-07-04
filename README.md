## Photo converter

### Clone the repo and install dependencies
```bash
git clone 
cd node-sharp-images
npm i
```

### How to run

First you must have folder with images, default is `sources/YourFolder/YourPictures.jpg` folder where is all images to convert. See [folder structure](https://github.com/tomik23/node-sharp-images#folder-structure).
```
node index
```
> Tun in console
```
? Folder to convert
```
> The selection menu will appear, from which we choose the folder we want to process.
```
? Select breakpoints e.g. 576,768,992,1200...
```
> Enter the size of the photos, as a result we will get folders with this name and photos in this width. The default breakpoint is set to `576,768,992,1200`
```
? Select a format
```
> Choose one of three available formats `[jpg, png, webp]`, `jpg` is set by default
```
? Set photo quality [1 to 100]. The default `60`
```
> Set the quality of photos. In the range of 1 to 100

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