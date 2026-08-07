let roll = 1;

function addStudent()
{

    let name = document.getElementById("name").value;

    if(name=="")
    {
        alert("Enter Student Name");
        return;
    }

    let table = document.getElementById("table");

    let row = table.insertRow();

    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);

    c1.innerHTML = roll;
    c2.innerHTML = name;

    c3.innerHTML = "<button class='present' onclick='markPresent(this)'>Present</button> <button class='absent' onclick='markAbsent(this)'>Absent</button>";

    c4.innerHTML = "<button onclick='deleteRow(this)'>Delete</button>";

    roll++;

    document.getElementById("name").value="";

    calculate();
}

function markPresent(btn)
{

    let cell = btn.parentNode;

    cell.innerHTML="Present";

    cell.style.color="green";

    calculate();
}

function markAbsent(btn)
{

    let cell = btn.parentNode;

    cell.innerHTML="Absent";

    cell.style.color="red";

    calculate();
}

function deleteRow(btn)
{

    let row = btn.parentNode.parentNode;

    row.remove();

    calculate();
}

function calculate()
{

    let table=document.getElementById("table");

    let present=0;

    let absent=0;

    let total=0;

    for(let i=1;i<table.rows.length;i++)
    {

        let status=table.rows[i].cells[2].innerHTML;

        if(status=="Present")
        {

            present++;
            total++;
        }

        else if(status=="Absent")
        {

            absent++;
            total++;
        }

    }

    document.getElementById("present").innerHTML=present;

    document.getElementById("absent").innerHTML=absent;

    if(total==0)
    {

        document.getElementById("percentage").innerHTML=0;
    }

    else
    {

        let per=(present/total)*100;

        document.getElementById("percentage").innerHTML=per.toFixed(2);
    }

}