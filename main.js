function checkForm (forma){
	var Name = forma.name.value;
	var Password = forma.pass.value;
	var state = forma.state.value;

	var fail = "";
	if (Name == "" || Password == "" || state =="")
		fail = "заполните все поля";
	else if (Name.length <=1 || Name.length > 50)
		fail = "Введите коректное имя";

	if (fail!=""){
		document.getElementById("error").innerHTML = fail;
		return false;
	}
	
	return true;
}