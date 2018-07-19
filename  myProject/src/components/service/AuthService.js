export const store = (theForm,logStore) => {
	logStore.push(theForm)
    let logStoreList = JSON.stringify(logStore)
	localStorage.setItem("logStore", logStoreList)
   
    console.log(localStorage)
    return false;
   } 
   export let logStorage = [] 
   export let itemStore = []
export const storeData = (data, itemStorage) =>{
let i = []

        if(data.file){
            data.file.then(function(data){ 
                i[0] = data
                return data })
          console.log(itemStorage)

        }
        data.file = i
        itemStorage.push(data)
        let itemStoreList = JSON.stringify(itemStorage)
        localStorage.setItem("itemStorage", itemStoreList)
    
}
//function to sign in
   function login(theForm) {
    document.getElementById('welcomeMessage').innerHTML = "";
    let inputUsername = theForm["username"];
    let inputPassword = theForm["password"];
    let username = inputUsername.value;
    let password = inputPassword.value;
    if ((username == localStorage.getItem('username')) && (password == localStorage.getItem('password'))) {
     document.getElementById('welcomeMessage').innerHTML = "Welcome " + localStorage.getItem('username') + "!";
      } else {
     document.getElementById('welcomeMessage').innerHTML = "Invalid Log-in!";
    }
    return false;
   } // end login()
export const getBase64Image = (img) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
export const getBet = () =>{
    
}