## Photo converter

### Instruction
* Instal latest Node.js  
* `git clone `  
* Open `cd shareimage`  
* Next run `yarn` or `npm install`

### How to run

First you must have folder with images, default is  `sources` folder wher is all images to convert.
Default folder to output images files it is `public`.
Exampel `node script.js --breakpoints=576`

### Configure app

arguments | default | require | description
---- | :-------: | :--------: | -----------
`--breakpoints` |  | ✔ | --breakpoints=500,600,700 or --breakpoints=500
`--sources` | `sources` | | --sources=images or --sources=images/berlin
`--output` | `output` | | --output=picture or --output=picture/berlin
`--format` | `jpg` |  | --format=webp or --format=png
`--keep` |  | | --keep=true Keep output folder

### Examples

Generate one size - 576px width
```
node script.js --breakpoints=576
```
This command generate `output` folder. Output folder cointains folder `576` with generated images.
Now we need webp format, but not removeing images `jpg`.
```
node script.js --breakpoints=576 --format=webp --keep=true
```

> another example of use

```
node script.js --breakpoints=576,768 --sources=sources/berlin --output=images/berlin
```
This command will create such a structure for us:
```
images
├──berlin
├──├──576
├──├──├──IMG_001.jpg
├──├──├──IMG_002.jpg
├──├──├──...
├──├──768
├──├──├──IMG_001.jpg
├──├──├──IMG_002.jpg
└──├──├──...
```

```
sources
├──berlin
├──├──IMG_001.jpg
├──├──IMG_002.jpg
└──├──...
```

## Other information

The images used are from 
[https://source.unsplash.com/](https://source.unsplash.com/)