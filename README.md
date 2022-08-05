# :computer: env-easy-cli

[![npm version](https://badge.fury.io/js/env-easy.svg)](https://badge.fury.io/js/env-easy)

- ## :eyeglasses: [abderox](https://github.com/abderox/)

## :bookmark_tabs: __v1.1.3__
#### :date: created : 31/July/2022
<p align="center"><img src = "https://github.com/abderox/env-helper-cli/blob/master/env.easy.png" alt="logo"/></p>

#### This  cli is there to improve your productivity by providing the most used routine env commands . 
- let's suppose you have cloned a project from github that includes ```.env.example``` file instead of ```.env ```.
- or you want to push the project you are working on now to your repository  . 
- In both cases , you can easily create respectively ```.env``` with all variables from ```.env.example``` file in the first case by typing the command below :arrow_down_small: 
- ```env -l example ```
- as same as in the second case ; creating a copy of ```.env ```--> ```.env.local``` with empty variables with a basic command .
- ```env -p local ```

> Instructions how to use 
- __This version is just for learning purpose__ 
- ``` install with npm command  ```
- ``` env -h  ```

```diff
- nothing omitted
+ now you can lookup a keyword and replace it by providing you with an interactive menu
```
- __USAGE examples__ 
- ```  env -s local:8000 --rw 3000``` this basically will lookup the keyword and return multiple lines if more than one 

<img src = "https://github.com/abderox/env-helper-cli/blob/master/env_3.png" alt="capture" align="center"/>



- __USAGE examples__ 
- ```  env -c local ```       this will create a copy of existing file or creating new one if not .
- ```  env -r local --str ``` this will wipe out all digits values and strings will be kept [PORT = 4000] ==> [PORT = ]
- ```  env -p local --dg ```  this will wipe out all strings values and digits will be kept [HOST = "localhost"] 
==> [HOST = ""] 
- ```  env -p local  ```       create fresh copy with empty variables 
- ```  env -r local  ```       wipe out all values  of the variables including digits and strings  
- ```  env -d local ```       this will delete file
- ```  env -s local:SERVER_PORT ```       looks up for SERVER_PORT keyword in the in the file (if upper case write it in upper case)
- ```  env -s :SERVER_PORT ```looks up for SERVER_PORT in .env file

- __Done__

<img src = "https://github.com/abderox/env-helper-cli/blob/master/env.png" alt="capture" align="center"/>
<img src = "https://github.com/abderox/env-helper-cli/blob/master/env_1.png" alt="capture" align="center"/>



:bangbang:
> :trollface: I WILL COME UP WITH BETTER NEXT TIME  !!

