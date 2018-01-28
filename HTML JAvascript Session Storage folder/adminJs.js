//Created by Anusha Gajula and Neha Reddy Anumalla 
//Group-6

//variable declaration
var asyncRequest;

function start(){
//here the function add event listeners to the user events using the anonymous function
//In these anonymous functions we are calling the function by passing the arguments
// for two button handling
  if(sessionStorage.getItem("userName")!=null)
	{			
    document.getElementById("userNote").innerHTML="Welcome - " + sessionStorage.getItem("userName");
	document.getElementById("viewUsersBtn").addEventListener("click",function(){ getXMLFile("Users.xml")},false);
	
	
	
	
	document.getElementById("viewPerfumesBtn").addEventListener("click",function(){ 
	asyncRequest = new XMLHttpRequest();
	asyncRequest.addEventListener("readystatechange", function(){
	
	//empty table			
	document.getElementById("userDetails").innerHTML="";
	
	if(asyncRequest.readyState == 4 && asyncRequest.status ==200 && asyncRequest.responseXML){
	
	//for table heading
	var htRow = document.createElement("tr")//created one row
	var htd = document.createElement("th");//created one cell
    var htd2 = document.createElement("th");
	var htd3 = document.createElement("th");
	var htd4 = document.createElement("th");
	var htd5 = document.createElement("th");
    var htd6 = document.createElement("th");
    var htd7 = document.createElement("th");
	var htd8 = document.createElement("th");
	var htd9 = document.createElement("th");
									
	  htd.innerHTML="Item Id";
	  htd2.innerHTML="Image URL";
	  htd3.innerHTML="Item Name";
	  htd4.innerHTML="Price ($)";
	  htd5.innerHTML="Item detail description";
	  htd6.innerHTML="Quantity ";
	  htd7.innerHTML="Volume in Oz";
	  htd8.innerHTML="Used for ";
	  htd9.innerHTML="Promocode";
									
		htRow.appendChild(htd);
		htRow.appendChild(htd2);
		htRow.appendChild(htd3);
		htRow.appendChild(htd4);
		htRow.appendChild(htd5);
		htRow.appendChild(htd6);
		htRow.appendChild(htd7);
		htRow.appendChild(htd8);
		htRow.appendChild(htd9);
		document.getElementById("userDetails").appendChild(htRow);
		

		
		var perfumeDetails =  asyncRequest.responseXML.getElementsByTagName("Perfume");
		for(var i = 0; i< perfumeDetails.length; i++){
		var Perfume = perfumeDetails.item(i);

		//table body
		var tRow = document.createElement("tr")//created one row
		var td = document.createElement("td");//created one cell
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		var td4 = document.createElement("td");
		var td5 = document.createElement("td");
		var td6= document.createElement("td");
		var td7 = document.createElement("td");
		var td8 = document.createElement("td");
		var td9 = document.createElement("td");
									
		td.innerHTML= Perfume.getElementsByTagName("itemId").item(0).firstChild.nodeValue;
		tRow.appendChild(td);
									
		td2.innerHTML= Perfume.getElementsByTagName("imageUrl").item(0).firstChild.nodeValue;
		tRow.appendChild(td2);
									
		td3.innerHTML= Perfume.getElementsByTagName("name").item(0).firstChild.nodeValue;
		tRow.appendChild(td3);
									
		td4.innerHTML= Perfume.getElementsByTagName("price").item(0).firstChild.nodeValue;
		tRow.appendChild(td4);
									
		td5.innerHTML= Perfume.getElementsByTagName("description").item(0).firstChild.nodeValue;
		tRow.appendChild(td5);
									
		td6.innerHTML= Perfume.getElementsByTagName("quantity").item(0).firstChild.nodeValue;
		tRow.appendChild(td6);
									
		td7.innerHTML= Perfume.getElementsByTagName("volume").item(0).firstChild.nodeValue;
		tRow.appendChild(td7);
									
		td8.innerHTML= Perfume.getElementsByTagName("category").item(0).firstChild.nodeValue;
		tRow.appendChild(td8);
									
		td9.innerHTML= Perfume.getElementsByTagName("promoCode").item(0).firstChild.nodeValue;
		tRow.appendChild(td9);
								  
		document.getElementById("userDetails").appendChild(tRow);
													  
								  
		 }//end for
		document.getElementById("TableHeading").innerHTML= "Itemwise Perfume Information";
							   
	}//end if
					
},false);//eventlistner & callback
		asyncRequest.open("GET","PerfumeList.xml",true);
		asyncRequest.send(null);	 	
		},false);
		}//session if
		else{
			
			sessionStorage.setItem("errMessage","Please Login to get ADMIN services ");
			 window.location="Login.html";
			
			}
		
	
	} // end function start()
		
		
			function getXMLFile(url){
		//this function is used to get the xml file and process
		try{
			//create a request to get XML file :credits.xml
			//instantiating asyncRequest through HTTP request;
			asyncRequest=new XMLHttpRequest();
			
			//just stores the the name of function processCredits
			asyncRequest.onreadystatechange=processUserDetails;
			
			//make the request and get XML file as url ;
			asyncRequest.open("GET",url,true);
			asyncRequest.send(null);
		} catch (exception){
		
			alert("XHR failed");
		}// End try/catch



	} //end function getXMLFile()
		
		
		function processUserDetails(){
		//this function process the credit information and display it 
		
		
		document.getElementById("userDetails").innerHTML="";
		if(asyncRequest.readyState==4&&asyncRequest.status==200&&asyncRequest.responseXML){
		  var messageText = "";
			//getting one data element from the response
		  var usersArray=asyncRequest.responseXML.getElementsByTagName("User");
		  
		  //table heading
		  var htRow = document.createElement("tr")//created one row
		  var htd = document.createElement("th");//created one cell
		  var htd2 = document.createElement("th");
		  var htd3 = document.createElement("th");
		  var htd4 = document.createElement("th");
						
		   htd.innerHTML="User Name";
		   htd2.innerHTML="Password";
		   htd3.innerHTML="First Name";
		   htd4.innerHTML="Last Name";
		   htRow.appendChild(htd);
		   htRow.appendChild(htd2);
		   htRow.appendChild(htd3);
		   htRow.appendChild(htd4);
		   
		document.getElementById("userDetails").appendChild(htRow);
						
						
						
						
		for(var i=0;i<usersArray.length;i++){
			var user= usersArray.item(i);
			//get the data inside the userName element
			var userName= user.getElementsByTagName("userName").item(0).firstChild.nodeValue;
						
			//get the data inside the password element
			var password= user.getElementsByTagName("password").item(0).firstChild.nodeValue;
			//get the data inside the firstName element
			var firstName= user.getElementsByTagName("firstName").item(0).firstChild.nodeValue;
						
			//get the data inside the lastName element
			var lastName= user.getElementsByTagName("lastName").item(0).firstChild.nodeValue;
							//table body (each row)
						var tRow = document.createElement("tr")//created one row
						var td = document.createElement("td");//created one cell
						var td2 = document.createElement("td");
						var td3 = document.createElement("td");
						var td4 = document.createElement("td");
						
						td.innerHTML= userName;
						tRow.appendChild(td);
						
						td2.innerHTML= password;
						tRow.appendChild(td2);
						
						td3.innerHTML= firstName;
						tRow.appendChild(td3);
						
						td4.innerHTML= lastName;
						tRow.appendChild(td4);
						
						
						
		    document.getElementById("userDetails").appendChild(tRow);
						
					
			}
			document.getElementById("TableHeading").innerHTML= "User Information";
					
				
			}// End :IF


	}//end function processUserDetails()
		
		
	
//event listener for load
window.addEventListener("load",start,false);