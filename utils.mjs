#! /usr/bin/env node
import yargs from 'yargs'
import fs from 'fs'
import chalk from 'chalk';


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
    let file = fs.readFileSync(filepath, "utf8");
    let arr = file.split(/\r?\n/);
    console.log(chalk.yellow("The keyword is found in the following lines:\n"));
    arr.forEach((line, idx) => {
        if (line.includes(keyword)) {
            console.log("Line : " + (idx + 1) + ':' + chalk.green(line));
        }
    });
    console.log(chalk.yellow("\nEnd of search"));
}


const { argv } = yargs(process.argv).scriptName("env")
    .usage(chalk.yellow("Usage: $0 -d [name] \nFile format : .env.[name]"))
    .example(
        chalk.yellow("$0 -p [name] --dg"),

    )
    .option("e", {
        alias: "env",
        describe: "create env file                       [env -e]",

    })
    .option("l", {
        alias: "local",
        describe: "reverse copy from .env.[name] to .env [env -l [name]]",

    })
    .option("c", {
        alias: "copy",
        describe: "create a copy of existing env file    [env -c [name]]   ",

    })
    .option("b", {
        alias: "blank",
        describe: "create a blank copy of env file       [env -b [name]]",

    })
    .option("d", {
        alias: "delete",
        describe: "delete specific env file by name      [env -d [name]]",

    })
    .option("r", {
        alias: "replace",
        describe: "replace all values  with empty string [env -r [name]]",

    })
    .option("p", {
        alias: "purge",
        describe: "create a copy  with empty variables   [env -p [name]]",

    })
    .option("o", {
        alias: "overwrite",
        describe: "overwrite  env copy                   [env -o [name]]\n",

    })
    .option("s", {
        alias: "search",
        describe: "lookup for keyword in file          [env -s [name]:keyword] <[env -s :keyword] searches in .env file>\n",

    })
    .option("dg", {
        describe: "keep <digits> only like server ports    [use with -p or -r] <optional>\n",

    })
    .option("str", {
        describe: "keep<strings> only & wipe all digits [use with -p or -r]    <optional>\n",

    })
    .option("h", {
        alias: "help",
    })
    .describe("help", "Show help.")
    .describe("version", "Show version number.")
    .epilog(chalk.blue("copyright 2022"))

if (argv.c) {
    try {
        let filename = (typeof argv.c === "string") ? argv.c : randomName();
        filename = filename.replace(".", "").replace("env", "");
        if (fs.existsSync("./.env")) {
            fs.copyFile('.env', '.env.' + filename, (err) => {
                if (err) throw err;
                console.log(chalk.green('.env. was copied to .env.' + filename));
            });
        }
        else {
            createFile(".env")
            createFile(".env." + filename)
        }
    } catch (err) {
        console.error(err)
    }

}
else if (argv.o) {
    try {
        let filename = (typeof argv.o === "string") ? argv.o : randomName();
        filename = filename.replace(".", "").replace("env", "");
        if (fs.existsSync("./.env") && fs.existsSync("./.env." + filename)) {
            fs.truncate('.env.' + filename, 0, function () {
                fs.copyFile('.env', '.env.' + filename, (err) => {
                    if (err) throw err;
                    console.log(chalk.green('.env.' + filename + "was updated successfully"));
                });
            })

        }
        else {
            createFile(".env")
            createFile(".env." + filename)
        }
    } catch (err) {
        console.error(err)
    }

}
else if (argv.s) {
    try {
  
        let filename = ""
        let keyword = ""
        let arg = argv.s;

        if (arg.includes(":")) {
            filename = argv.s.split(":")[0];
            keyword = argv.s.split(":")[1];
            filename = (filename === "" || filename === "env") ? ".env" : ".env." + filename.replace(".", "").replace("env", "");
            console.log("Looking for " +keyword+" in file " + filename+" ...");
            if (fs.existsSync(filename)) {
                searchKeyword(filename, keyword)
            }
            else {
                console.log(chalk.red("File not found"))
            }
        }

    } catch (err) {
        console.error(err)
    }

}
else if (argv.e) {
    try {
        createFile(".env")
    } catch (error) {
        console.log(error, "There was an error creating the file")
    }
}
else if (argv.b) {
    try {
        let filename = (typeof argv.b === "string") ? argv.b : randomName();
        filename = filename.replace(".", "").replace("env", "");
        createFile(".env." + filename)
    } catch (error) {
        console.log(error, "There was an error creating the file")
    }
}

else if (argv.d) {
    try {

        let filepath = (typeof argv.d === "string") ? ".env." + argv.d : ".env";
        console.log(filepath)
        if (fs.existsSync(filepath)) {
            deletefile_(filepath)
        }

    } catch (err) {
        console.error(err)
    }
}
else if (argv.r) {
    try {

        let filepath = (typeof argv.r === "string") ? ".env." + argv.r : ".env";
        if (filepath) {

            if (fs.existsSync(filepath)) {

                if (argv.dg) {
                    replaceAllwithEmpty(filepath, "digit")
                    console.log(chalk.green("All variables are wiped out and digits are kept"))
                }
                else if (argv.str) {
                    replaceAllwithEmpty(filepath, "string")
                    console.log(chalk.green("All variables are wiped out and strings are kept"))
                }
                else {
                    replaceAllwithEmpty(filepath)
                }
            }
        }

    } catch (err) {
        console.error(err)
    }
}
else if (argv.p) {
    try {

        let filepath = (typeof argv.p === "string") ? ".env." + argv.p : ".env." + randomName();

        if (filepath) {
            if (!fs.existsSync(filepath)) {
                fs.copyFile('.env', filepath, (err) => {
                    if (err) throw err;
                    if (argv.dg) {
                        replaceAllwithEmpty(filepath, "digit")
                        console.log(chalk.green("All variables are wiped out and digits are kept"))
                    }
                    else if (argv.str) {
                        replaceAllwithEmpty(filepath, "string")
                        console.log(chalk.green("All variables are wiped out and strings are kept"))
                    }
                    else {
                        replaceAllwithEmpty(filepath)
                    }
                    console.log(chalk.green('.env content was copied to ' + filepath));

                });

            }
        }

    } catch (err) {
        console.error(err)
    }
}
else if (argv.l) {
    try {

        let filepath = (typeof argv.l === "string") ? ".env." + argv.l : null;

        if (filepath) {
            if (fs.existsSync(filepath)) {
                fs.copyFile(filepath, '.env', (err) => {
                    if (err) throw err;
                    console.log(chalk.green(filepath + ' content was copied to .env'));

                });

            }
            else {
                console.log(chalk.red('cannot find file named ' + filepath));
            }
        }

    } catch (err) {
        console.error(err)
    }
}


else if (argv.h) {
    console.log(chalk.blue("Try env -h to learn more"))
}
else {
    console.log(chalk.yellow("no argument was passed , try env -h to learn more"))
}