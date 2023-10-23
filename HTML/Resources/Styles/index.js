
let count = 0;
let myExcercises = [];
let myPoints = [];

const url = 'https://localhost:7203/api/Excercise';

async function handleOnLoad()
{
   
    let response = await fetch(url);
    let data = await response.json();
    myExcercises = data;

    let html = `
    <div class ="title">
        <h1 style="color: darkred; font-family:fantasy; font-size: 60px; font-style: italic;">TideFit</h1>
        <h2 style="color: whitesmoke; font-family: Georgia; font-size: 30px;">Excercise Tracker</h2>
    </div>
    
    
    <div class="container" style="border: 5px solid darkgray; padding-top: 10px;">
        
        <h3 style="color: darkred; font-family:fantasy; font-size: 40px;">Add An Excercise:</<h3>

        <h6>
            <form  onSubmit= "return false">

            <label for="day" style= "font-family: Georgia; font-size: 25px; font-style: bold;">Day:</label><br>
            <input type="date" id="day" name="day"><br>
            <br>

            <label for="type" style= "font-family: Georgia; font-size: 25px; font-style: bold;">Type:</label><br>
                <select name="type" id="type">
                    <option value="Null"></option>
                    <option value="Running">Running</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Biking">Biking</option>
                </select><br>
            <br>

            <label for="distance" style= "font-family: Georgia; font-size: 25px; font-style: bold;">Distance:</label><br>
            <input type="text" id="distance" name="distance"><br>
            <br>

            <button onclick = "addExcercise()" class = "btn btn-primary">Submit</button>
        </h6>
    </div>
        

    </form>

    <div id = "tableBody"></div> `;

    document.getElementById('app').innerHTML=html;
    await populateTable();

}




async function addExcercise()
{

    const day = document.getElementById('day').value;
    const type = document.getElementById('type').value;
    const distance = document.getElementById('distance').value;

    const newExcercise = 
    {
        Day: day,
        Type: type,
        Distance: distance,
        Pinned: false,
        Deleted: false
    };

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(newExcercise),
        headers:
        {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    await handleOnLoad();
}





async function deleteExcercise(exceId)
{
    let newExcercise;
    for(let i = 0; i < myExcercises.length; i++){
        if(myExcercises[i].exceId == exceId){
            newExcercise = 
            {
                exceId: myExcercises[i].exceId,
                day: myExcercises[i].day,
                type: myExcercises[i].type,
                distance: myExcercises[i].distance,
                pinned: myExcercises[i].pinned,
                deleted: !myExcercises[i].deleted
            }

        }

    }

    
    await fetch(`${url}/${newExcercise.exceId}`, {
        method: "PUT",
        body: JSON.stringify(newExcercise),
        headers:
        {
            "content-type": "application/json"
        },

    })

    await handleOnLoad();
}




async function pinExcercise(exceId)
{
    let newExcercise;
    for(let i = 0; i < myExcercises.length; i++){
        if(myExcercises[i].exceId == exceId){
            newExcercise = 
            {
                exceId: myExcercises[i].exceId,
                day: myExcercises[i].day,
                type: myExcercises[i].type,
                distance: myExcercises[i].distance,
                pinned: !myExcercises[i].pinned,
                deleted: myExcercises[i].deleted
            }

        }

    }

    
    await fetch(`${url}/${newExcercise.exceId}`, {
        method: "PUT",
        body: JSON.stringify(newExcercise),
        headers:
        {
            "content-type": "application/json"
        },

    })

    await handleOnLoad();
}






async function populateTable()
{
    await sortExcercises();

    let html = `
    <table class="table table-dark table-striped table-bordered">
       
        <thead>
            <tr>
                <th scope="col" class="padding" style="font-size: 20px; text-align: center;">Date Completed</th>
                <th scope="col" class="padding" style="font-size: 20px; text-align: center;">Activity Type</th>
                <th scope="col" class="padding" style="font-size: 20px; text-align: center;">Distance in Miles</th>
                <th scope="col" class="padding" style="font-size: 20px; text-align: center;">Pin and Delete</th>
            </tr>
        </thead>`
    

        
    
        myExcercises.forEach(function(excercise) {

            let buttonText;
            if(excercise.pinned)
            {
                buttonText = 'Pinned'
            }else{
                buttonText = 'pin'
            }
            
           
                html += `
                <tr>
                    <td>${excercise.day}</td>
                    <td>${excercise.type}</td>
                    <td>${excercise.distance}</td>
                    <td>
                        <button class = "btn btn-secondary" onclick = "pinExcercise('${excercise.exceId}')">${buttonText}</button>
                        <button class = "btn btn-danger" onclick = "deleteExcercise('${excercise.exceId}')">Delete</button>
                    </td>
                </tr>`;
            
        })
        

    html += `</table>`
    document.getElementById('tableBody').innerHTML=html;
}





async function sortExcercises()
{
    
    myExcercises.sort(function(a, b) {
        const dateA = new Date(a.day).getTime();
        const dateB = new Date(b.day).getTime();
        return dateB - dateA;
    });

}



