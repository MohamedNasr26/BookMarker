var nameInput =document.getElementById("sn");
var UrlInput=document.getElementById("su");
var addBtn=document.getElementById("addBtn");
var mainIndex=0;
var bookmarks=[];
var NameReg=/^[A-Za-z\._]{1,}$/;
var UrlReg=/^(https:\/\/)?(www.)?[A-Za-z0-9\._]{1,}\.[a-z]{3}$/;

if( localStorage.getItem("bookmarks") !=null){
    var bookmarks=JSON.parse(localStorage.getItem("bookmarks")) ;
    DisplayAllSites(bookmarks);
}
function addNewSite() {
    if(addBtn.innerHTML == "UpDate"){
        addBtn.innerHTML = "Submit"; 
        var bookMark={
            SName : nameInput.value,
            SUrl : UrlInput.value,
        }
        bookmarks.splice(mainIndex,1,bookMark);
    }else{
        var bookMark={
            SName : nameInput.value,
            SUrl : UrlInput.value,
        }
        bookmarks.push(bookMark); 
    }
    
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    clear();
    DisplayAllSites(bookmarks);

}
function clear(){
    nameInput.value="";
    UrlInput.value="";
}
function DisplayAllSites(anyArray){
    var cartona="";
    for ( var i = 0 ; i < anyArray.length  ; i++){
        cartona +=`
        <tr>
            <td class="text-white"> ${anyArray[i].SName}</td>
            <td class="text-white"> ${anyArray[i].SUrl}</td>
            <td>
              <button class="btn btn-success"> Vist </button>
            </td>
            <td>
              <button onclick="updateElememt(${i})" class="btn btn-info"> Update </button>
            </td>
            <td>
              <button onclick="deleteElement(${i})" class="btn btn-danger"> Delete </button>
            </td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML=cartona;
}  
function deleteElement(inx){
    bookmarks.splice(inx,1)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    DisplayAllSites(bookmarks);
}
function updateElememt(i){
    nameInput.value = bookmarks[i].SName;
    UrlInput.value = bookmarks[i].SUrl;
    document.getElementById("addBtn").innerHTML="UpDate";
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    mainIndex=i;
}
function SearchElement(term){
    var wantedElement=[];
    for( var i = 0 ; i< bookmarks.length ; i++){
        if( bookmarks[i].SName.toLowerCase().includes(term.toLowerCase())){
            wantedElement.push(bookmarks[i]);
        }
    }
    DisplayAllSites(wantedElement);
    
}
function isNameValid(){
    if(NameReg.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}
function isURLValid(){
    if(UrlReg.test(UrlInput.value)){
        return true;
    }else{
        return false;
    }
}
nameInput.onkeyup=function(){
    if ( isNameValid() && isURLValid()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled="true";
    }
}
UrlInput.onkeyup=function(){
    if ( isNameValid() && isURLValid()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled="true";
    }
}

