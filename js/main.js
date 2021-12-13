var x = document.getElementById('site_name');
var y = document.getElementById('site_url');
var p1_in = document.getElementById('p1');
var p2_in = document.getElementById('p2');
var count = 0;
var items = [];
if(localStorage.getItem('items',items) == null)
{
    items = [];
}
else
{
    items = JSON.parse(localStorage.getItem('items',items));
    display();
}

// check() returns zero if the user entered a valid input, and the number of invalid inputs otherwise
function check(){
    for(var i = 0; i < items.length; i++)
    {
        if(x.value == items[i].name)
        {
            p1_in.innerHTML = "This name already exists";
            p1_in.style.display = "block";
            count ++;
            break;
        }
    }
    if(x.value == "")
    {
        p1_in.innerHTML = "Name is required";
        p1_in.style.display = "block";
        count ++;
    }
    if(y.value == "")
    {
        p2_in.innerHTML = "Url is required";
        p2_in.style.display = "block";
        count++;
    }
    return count;

}

// add an item to the local storage:
function add(){
    if (check() == 0)
    {
        var item = {
            name: x.value,
            url: y.value
        };
        // add http:// if it doesn't exist
        if(item.url.slice(0,4) != "http")
        {
            item.url = "https://" + y.value;
        }
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        x.value = "";
        y.value = "";
        display();
    }
}

// delete an item from the local storage:
function del(index){
    items.splice(index,1);
    localStorage.setItem('items',JSON.stringify(items));
    display();
}

// display all saved items:
function display(){
    var x = "";
    for (var i = 0; i < items.length; i++)
    {
        x += `
        <div class="col-md-12 my-4 py-4 t-r">
            <div class="row">
                <div class="col-md-3">
                    <h3 class="pp-title">${items[i].name}</h3>
                </div>
                <div class="col-md-9">
                    <div class="btns">
                        <a href="${items[i].url}" target="_blank" class="btn1 mr-2">Visit</a>
                        <button onclick="del(${i})" class="btn2">Delete</button>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById('snd-row').innerHTML = x;
}