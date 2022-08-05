// * @author :  Abdelhadi Mouzafir
// * @copyright : abderox
// * @license :  ISC


import fs from 'fs'
import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen'

function createFile(name) {
    fs.writeFile(name, "", (err) => {
        if (err) throw err;
        console.log(name + ' was created successfully !');
    });
}
const randomName = (length = 4) => {

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;

};

function deleteFile(filepath) {
    fs.rm(filepath, { recursive: false }, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(chalk.green("File deleted successfully"));
    })
}
function deletefile_(filePath) {
    process.stdout.write(chalk.red("Confirm deletion (y/n)? | default Yes"));
    process.stdin.on("data", function (data) {
        if (data.toString().trim() === "y")
            deleteFile(filePath);
        else if (data.toString().trim() === "n")
            process.stdin.pause();
        else
            deleteFile(filePath);
        process.stdin.pause();
    });
}

function replaceAllwithEmpty(filepath, type = "all") {
    try {
        var data = fs.readFileSync(filepath, 'utf-8');

        switch (type) {
            case "string":
                var newValue = data.replace(/'/g, `"`).replace(/([^"]\b\d+\b)/g, '');
                break;
            case "digit":
                var newValue = data.replace(/'/g, `"`).replace(/"([^"]*)"/g, '""');
                break;
            case "all":
                var newValue = data.replace(/'/g, `"`).replace(/"([^"]*)"/g, '""').replace(/(\b\d+\b)/g, '');

                break;

            default:
                console.log("Invalid type");
                break;
        }

        fs.truncate(filepath, 0, function () {
            fs.writeFileSync(filepath, newValue, 'utf-8');
        })

        console.log(chalk.green('Now you have a spotless file '));
    } catch (error) {
        console.log(error)
    }

}

function searchKeyword(filepath, keyword) {

    let arr = []
    let linesWithword = []
    try {
        const stats = fs.statSync(filepath);
        let file = fs.readFileSync(filepath, "utf8");

        arr = file.split(/\r?\n/);
        if (stats.size > 0 && file.includes(keyword)) {
            console.log(chalk.yellow("The keyword is found in the following lines:\n"));
            arr.forEach((line, idx) => {
                if (line.includes(keyword)) {
                    console.log("Line : " + (idx + 1) + ':' + chalk.green(line));
                    linesWithword.push("Line " + (idx + 1) + ': ' + line);
                }
            });
            console.log(chalk.yellow("\nEnd of search"));
        }
        else {
            console.log(chalk.red("Cannot read from empty file 😢"));
            arr.length = 0;
            linesWithword.length = 0;
        }

    } catch (err) {
        console.log("🚀 ~ bin: env.mjs ~ line 100 ~ searchKeyword ~ err", err);
    }

    return [arr, linesWithword];
}

function replaceAtindexLine(filepath, keyword, index, newValue) {
    console.log(chalk.blue("Trying to find and replace " + chalk.red(keyword) + " with " + chalk.green(newValue)));
    const [arr, linesWithword] = searchKeyword(filepath, keyword);

    if (arr.length > 0 && linesWithword.length > 0) {

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "keyword",
                    message: "choose where to replace",
                    choices: linesWithword
                }
            ])
            .then((answers) => {
                let idx = parseInt(answers.keyword.split(':')[0].split(' ')[1]);
                arr.splice(idx - 1, 1, arr[idx - 1].replace(keyword, newValue));
                console.log(chalk.blue("replacing keyword " + chalk.red(keyword) + " at line " + chalk.green(idx) + " with " + chalk.green(newValue)));
                fs.truncate(filepath, 0, function () {
                    fs.writeFileSync(filepath, arr.join("\n"), 'utf-8');
                })

                console.log(boxen("\n Line  " + idx + ': ' + chalk.green(arr[idx - 1]), { padding: 1, borderColor: 'green', dimBorder: true }));

            })
    }
    else {
        console.log(chalk.bgRedBright("Keyword not found or empty file"));
    }
    //let newValue = arr.splice(index, 1, arr[index].replace(keyword, newValue));

}


export  { randomName, createFile, deletefile_, replaceAllwithEmpty, searchKeyword, replaceAtindexLine, deleteFile }; 