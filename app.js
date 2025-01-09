function greetUser(name) {
    if (name === undefined) { 
        console.log("Hello, Guest!"); 
    } else {
        console.log("Hello " + name); 
    }
}

let users = ["Alice", "Bob", "Charlie"];
for (let i = 0; i < users.length; i++) { 
    greetUser(users[i]); 
}

greetUser(); 

function sum(a, b) {
  return a + b;
}

let result = sum(5, 10); 
console.log("Sum:", result);

