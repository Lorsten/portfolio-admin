let Dbinfo = new Object();
/*urllocal
Dbinfo.url = "http://localhost/portfolio_api/index.php/";
*/
Dbinfo.url = "http://studenter.miun.se/~olan1700/dt057g/portfolio/server/index.php/";

function displayError(parentEle, message) {
    let parent = document.getElementById(parentEle);
    if (document.getElementById('messageBox')) {
        document.getElementById('messageBox').remove();
    }
    let element = document.createElement('div');
    element.className = "container bg-danger p-3 mt-5";
    element.id = "messageBox";
    message.forEach(index => {
        element.innerHTML += "<h3>" + index + "</h3>";
    })
    parent.appendChild(element);
}




/*
Function for creating data in a associative array and using JSON.stringify to make it ready to send to the server

*/

function CreateData(jsonData, table, Method) {
    let url = Dbinfo.url + table;
    fetch(url, {
            method: Method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then((res) => {
            if (res.status !== 200) {
                return;
            }
            alert("Data added");
            res.json()
        })
        .then(data => {
            console.log(data);

        }).catch(err => console.error("Fetch error:", err));
}

// Function for validating form input
function validateforms(formid, submitButton, target, table, method) {
    let form = document.getElementById(formid);
    // Array for errors
    let error = [];
    // Create an object to store both the element id and it's value
    let data = {};
    if (getURLVariables('ID')) {
        data[Dbinfo.ID[0]] = Dbinfo.ID[1];

    }
    target.preventDefault();
    [...form.elements].filter(ele => ele.id !== submitButton).forEach(element => {
        if (element.value.length < 1) {
            error.push(element.id + " is empty");
        } else {
            data[element.id] = element.value;
        }

    })
    if (error.length > 0) {
        displayError('form-flex', error);
        return;
    }
    CreateData(data, table, method);

}

//Function for creating a form taking three parameters, the data, table name and if the forms should have value
function createForm(data, table, InputData = false) {

    let headline = document.createElement("h4");

    let back = document.createElement("h3");
    back.innerHTML = "<a href='add.php>back</a>";
    headline.innerHTML = table;
    let parent = document.getElementById('main-form');
    let element = document.getElementById("form-flex");

    //Remove all element from form-flex
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
    let form = document.createElement("form");
    form.className = " bg-light";
    form.id = "form-add";
    if (data[0]['COLUMN_name']) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i]['COLUMN_name'].includes('ID')) {
                form.innerHTML += "<div class='form-group bg-light'>" +
                    "<label for='" + data[i]['COLUMN_name'] + "'>" + data[i]['COLUMN_name'] + "</label>" +
                    "<input type='text' class='form-control form-control-lg' id='" + data[i]['COLUMN_name'] + "''></div>";
            }
        }
    } else {


        // Using Object.keys to loop through the objects key and create text fields.
        Object.keys(data[0]).forEach(key => {
            // dont write out the id for the table
            if (key.includes('ID')) {
                Dbinfo.ID = [key, data[0][key]];
            } else {

                form.innerHTML += "<div class='form-group bg-light'>" +
                    "<label for='" + key + "'>" + key + "</label>" +
                    "<input type='text' class='form-control form-control-lg' id='" + key + "'value='" + (InputData ? data[0][key] : "") + "'></div>";
            }
        });
    }

    parent.appendChild(back);
    parent.appendChild(headline);
    form.innerHTML += "<button type='submit' name='addData' id='add-button' class='btn btn-primary'>Add data</button>";
    parent.appendChild(form);
    // Add a event listener to the submit
    form.addEventListener("submit", function (e) {
        // If url ID exists method is PUT else POST
        let method = (getURLVariables('ID') ? 'PUT' : 'POST');
        validateforms("form-add", 'add-button', e, table, method);
    })
}

function displayData(data, table) {
    if (data[0]['COLUMN_name']) {
        return;
    }
    let parent = document.getElementById("table_data");
    let count = 0;
    let ID;
    let list;
    let h3 = document.createElement("h3");
    let div = document.createElement("div");
    div.class = "w-80";
    h3.className = "mtb-2";
    h3.innerHTML = table;
    div.append(h3);

    //Iterate through the object with Object keys
    while (data.length > count) {
        list = document.createElement("ul");
        list.className = "pt-2 mt-1 w-80 list-unstyled border-bottom border-secondary";

        Object.keys(data[0]).forEach(key => {
            if (key.includes("ID")) {
                ID = data[count][key];
            }
            if (key.includes('url')) {
                list.innerHTML += "<li class='mt-1 '><a href='" + data[count][key] + "'>Link</a></li>";
            } else if(key.includes("institution")){
                list.innerHTML += "<li class='mt-1 text-break'>" + key + ":" + data[count][key] + "</li>";
            }
            else {
                list.innerHTML += "<li class='mt-1 '>" + key + ":" + data[count][key] + "</li>";
            }

        })
        list.innerHTML += "<li class='mt-1 '><a href='http://studenter.miun.se/~olan1700/dt057g/portfolio/admin/edit.php?ID=" + ID + "&Table=" + table + "'>Edit Data</a></li>";
        list.innerHTML += "<li class='remove mt-1' id='" + table + ID + "'>Remove data</li></a>";
        count++;
        div.appendChild(list)
        parent.appendChild(div);
    }


    //Jquery event unbind the click first to prevent repeat
    $(".remove").unbind("click").click(function (e) {


            //Create an eventlistener for reach remove class
            e.preventDefault();
            // Get the element which containes the h3 tag by using parentNode and firstelementChilds
            let headlineContainer = this.parentNode.parentNode.firstElementChild;
            let table = headlineContainer.innerHTML;
            //Change the id by removing the titel from the string
            let ID = this.getAttribute('id');
            let newID = ID.replace(table, "");

            let url = Dbinfo.url + table + "?ID=" + newID;

            if (confirm('Are you sure you would like to delete this?')) {
                // Using fetch and Method delete to remove a single row from the table
                fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then((res) => {
                        if (res.status !== 200) {
                            alert("Not deleted");
                            return;
                        }
                        this.parentNode.remove();
                        alert("Deleted");

                        res.json()
                    })
                    .then(data => {
                        console.log(data);

                    }).catch(err => console.error("Fetch error:", err));
            }

        });
    }



    /* Function for retriving the data from the server using fetch GET.
       The function takes two extra parameters, if the data should be inputed and if the data should be displayed
     */
    function getData(table, url, inputData = false, mainPage = false) {

        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                if (res.status !== 200) {
                    console.log("Unable to retrive data");
                    return;
                }
                res.json().then(data => {
                    if (mainPage) {
                        displayData(data, table);

                    } else {
                        createForm(data, table, inputData);
                    }
                })

            })
            .catch(err => console.error("Fetch error:", err));
    };
    //function for retriving the url variables value
    function getURLVariables(variable) {

        let query = window.location.search.substring(1);
        let variables = query.split("&");
        for (let i = 0; i < variables.length; i++) {
            let varible = variables[i].split("=");
            if (varible[0] === variable) {
                return varible[1];
            }
        }
        return false;
    }

    // Check if element main-form exists on load
    window.onload = function () {

        if (document.getElementById("main-form")) {
            document.querySelectorAll('.table').forEach(item => {
                item.addEventListener("click", function () {
                    getData(this.getAttribute('id'), Dbinfo.url + this.getAttribute('id'));
                })
            })

        }
        //Get data if user is on adminpage
        if (document.getElementById('main-tabels')) {
            getData('website', Dbinfo.url + "website", false, true);
            getData('education', Dbinfo.url + "education", false, true);
            getData('work', Dbinfo.url + "work", false, true);



        }
        // If login element exists 
        if (document.getElementById('login')) {
            document.getElementById("message").innerHTML = "";
            document.getElementById('login').addEventListener("submit", function (e) {
                let Error = [];
                [...this.elements].filter(item => item.name !== "login").forEach(element => {
                    if (element.value.length < 1) {
                        Error.push(element.name + " is empty");
                        e.preventDefault();
                    }
                })
                displayError("loginform", Error);
            });
        }
        if (document.querySelectorAll('.content')) {
            document.querySelectorAll('.content').forEach(element => {
                element.addEventListener("click", function () {
                    this.style.display = "block";
                });
            })
        }
        if (document.getElementById('edit_div')) {
            let id = getURLVariables('ID');
            let table = (getURLVariables('Table'))
            getData(table, Dbinfo.url + table + "?ID=" + id, true);
        }

    }