var changeContact = function(increment){
    let id = Number(document.getElementById("contactId").innerHTML)
    if(id+increment > 0){
        document.getElementById("contactId").innerHTML = id + increment
    }
}