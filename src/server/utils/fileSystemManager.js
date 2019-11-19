'use strict'
const fs = require('fs');
const randomstring = require('randomstring');

class FileSystemManager{
  static saveImage(base64){
    const image = base64.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer(image, 'base64');
    const imageName = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });
    const path = process.env.IMAGE_SRC + imageName;
    return new Promise((resolve, reject) => {
        fs.writeFile(path, buf, err => {
            if(err) {
                console.log(err);
                reject({message: "no se puede guardar la imagen"});
            } else {
                resolve(imageName);
            }
        });        
    })
  }  
};

module.exports = FileSystemManager;