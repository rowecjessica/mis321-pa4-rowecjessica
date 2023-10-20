
let count = 0;
let myExcercises = [];
let myPoints = [];
// let maxExceId = 0;

const url = 'https://localhost:7203/api/Excercise';

async function handleOnLoad()
{
   
    let response = await fetch(url);
    let data = await response.json();
    myExcercises = data;

    // myPoints.forEach(function(point) {

    // })

    
    console.log("This is the import", myExcercises);
    console.log("This is the import type", myExcercises[0].type)
   
    // myActivities = JSON.parse(localStorage.getItem('myActivities')) || [];
    // if(!myActivities){myActivities= []};

    // console.log(myActivities);
    
    // myActivities.forEach(activity => {
    //     if (activity.Pinned === undefined) {
    //         activity.Pinned = false;
    //     }
    // });

    // myActivities.forEach(activity => {
    //     if (activity.Deleted === undefined) {
    //         activity.Deleted = false;
    //     }
    // });

    // myExcercises = ExcerciseUtility.GetAllExcercises();

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
    // let excercise = {Day: document.getElementById('day').value, Type: document.getElementById('type').value, Distance: document.getElementById('distance').value, Pinned:false,  Deleted: false};
    // console.log("what excercise am I saving:", excercise);

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

async function deleteExcercise()
{
    await fetch(url + '/1', {
        method: "DELETE",
        headers:
        {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

async function pinExcercise()
{

}


async function populateTable()
{
    // await sortExcercises();

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
            const isPinned = excercise.Pinned || false;
            const buttonText = isPinned ? 'Pinned' : 'Pin';
            
           
                html += `
                <tr>
                    <td>${excercise.day}</td>
                    <td>${excercise.type}</td>
                    <td>${excercise.distance}</td>
                    <td>
                        <button class = "btn btn-secondary" onclick = "pinExcercise('${excercise.ExceId}')">${buttonText}</button>
                        <button class = "btn btn-danger" onclick = "deleteExcercise('${excercise.ExceId}')">Delete</button>
                    </td>
                </tr>`;
            
        })
        

    html += `</table>`
    document.getElementById('tableBody').innerHTML=html;
}







// async function sortExcercises()
// {
//     console.log("sorting");

//     myExcercises.sort(function(a,b)
//     {
//         const dateA = new Date(a.Day);
//         const dateB = new Date(b.Day);
//         return dateA - dateB;
//     });
// }




// function handleActivityAdd()
// {  
    
//     if (myActivities.length > 0) {
//         myActivities.forEach(function(activity) {
//             if (activity.ExceId > maxExceId) {
//                 maxExceId = activity.ExceId;
//                 console.log(maxExceId)
//             }
//         });
//     }

//     let ID = maxExceId + 1;  
//     maxExceId = ID;

//     let activity = {ExceId: ID, Day: document.getElementById('day').value, Type: document.getElementById('type').value, Distance: document.getElementById('distance').value, Deleted: false};
//     myActivities.push(activity);
//     localStorage.setItem('myActivities', JSON.stringify(myActivities));
    
//     document.getElementById('day').value = "";
//     document.getElementById('type').value = "";
//     document.getElementById('distance').value = "";
//     activity.Pinned = false;
    
//     populateTable();

// }


// function handleActivityDelete(exceId)
// {
    
//     const activityIndex = myActivities.findIndex(activity => activity.ExceId == exceId);

    
//     if (activityIndex !== -1) {
//         myActivities.splice(activityIndex, 1);
//         localStorage.setItem('myActivities', JSON.stringify(myActivities));
//     }

//     populateTable();   
// }

// function handleActivityPin(exceId) {

//     const activityIndex = myActivities.findIndex(activity => activity.ExceId == exceId);

//     if (activityIndex !== -1) {
//         myActivities[activityIndex].Pinned = !myActivities[activityIndex].Pinned;
//         localStorage.setItem('myActivities', JSON.stringify(myActivities));
//     }
//     populateTable();
// }

