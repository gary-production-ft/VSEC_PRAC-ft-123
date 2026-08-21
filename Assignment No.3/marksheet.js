// Array to store students

let students = [];


// Add student function

function addStudent(){


    let name = document.getElementById("name").value;

    let ds = Number(document.getElementById("ds").value);

    let dm = Number(document.getElementById("dm").value);

    let sa = Number(document.getElementById("sa").value);

    let ip = Number(document.getElementById("ip").value);



    let average = (ds + dm + sa + ip) / 4;



    let student = {

        name:name,
        ds:ds,
        dm:dm,
        sa:sa,
        ip:ip,
        average:average.toFixed(2)

    };


    students.push(student);



    displayRecords();


    // clear input

    document.getElementById("name").value="";
    document.getElementById("ds").value="";
    document.getElementById("dm").value="";
    document.getElementById("sa").value="";
    document.getElementById("ip").value="";


}



// Display all records

function displayRecords(){


    let table = document.getElementById("recordTable");


    table.innerHTML="";


    for(let i=0;i<students.length;i++){


        let row = 
        `
        <tr>
        <td>${students[i].name}</td>
        <td>${students[i].ds}</td>
        <td>${students[i].dm}</td>
        <td>${students[i].sa}</td>
        <td>${students[i].ip}</td>
        <td>${students[i].average}</td>
        </tr>
        `;


        table.innerHTML += row;


    }


}




// Find topper

function showTopper(){


    if(students.length==0){

        alert("No Records Available");
        return;

    }


    let topper = students[0];


    for(let i=1;i<students.length;i++){


        if(students[i].average > topper.average){

            topper = students[i];

        }

    }



    document.getElementById("topper").innerHTML =

    " Topper : " + topper.name +
    " (Average Marks : " + topper.average + ")";


}