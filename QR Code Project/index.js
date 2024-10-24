/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([
        {
            name: "websiteLink",
            type: "input",
            message: "Give your website link here:",
        }
    ])
    .then((answers) => {

        const qrCode = qr.image(answers.websiteLink, { type: 'png' });
        const outputPath = './qrCode.png';
        const output = fs.createWriteStream(outputPath);
        qrCode.pipe(output);

        output.on('finish', () => {
            console.log("Image is generated and saved as qrCode.png");
        });

        // Save the website link to a text file
        fs.writeFile('websiteLink.txt', answers.websiteLink, (err) => {
            if (err) {
                console.error('Error saving the website link:', err);
            }
            else {
                console.log('Website link saved to websiteLink.txt');
            }
        });

    })
    .catch(error => {
        console.error('Oops! Something went wrong:', error);
    });