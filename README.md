## Photo converter

### Instruction
* Instal latest Node.js  
* `git clone `  
* Open `cd shareimage`  
* Next run `yarn` or `npm install`

### How to run

First you must have folder with images, default is  `sources` folder where is all images to convert.
Default folder to output images files it is `public`.
Exampel `node script --b=576`

### Configure app

arguments | default | require | description
---- | :-------: | :--------: | -----------
`--b` |  | ✔ | --b=500,600,700 or --b=500 [breakpoints]
`--s` | `sources` | ✔ | --s=images/lwow [sources]
`--o` | `output` | | --o=picture or --o=picture/berlin [output]
`--f` | `jpg` |  | --f=webp or --f=png or --f=jpg [format]
`--k` |  | | --k=true Keep output folder [keep]

### Examples

Generate one size - 576px
```
node script --s=sources/lwow --b=576
```
This command generate `output` folder. Output folder cointains folder `576` with generated images.
Now we need webp format, but not removeing images `jpg`.
```
node script --s=sources/lwow --b=576 --f=webp --k=true
```

> another example of use

```
node script --b=576,768 --s=sources/lwow --o=images/lwow
```
This command will create such a structure for us:
```
images
├── 576
│   ├── IMG_0367.jpg
│   ├── IMG_0368.jpg
│   ├── IMG_0369.jpg
│   ├── ...
└── 768
    ├── IMG_0367.jpg
    ├── IMG_0368.jpg
    ├── IMG_0369.jpg
    └── ...
```

```
sources
└── lwow
    ├── IMG_0367.jpg
    ├── IMG_0368.jpg
    ├── IMG_0369.jpg
    └── ...
```