//Created by Anusha Gajula and Neha Reddy Anumalla 
//Group-6



//variable declaration
	var asyncRequest;

	function start(){
		
		if(sessionStorage.getItem("errMessage")!=null){
		document.getElementById("errMessage").innerHTML=('<h3 style="color:yellow;">'+sessionStorage.getItem("errMessage")+'</h3>');
		}
		document.getElementById("LoginBtn").addEventListener("click",function(){ 
			
		var selectedItm;
		var userName=document.getElementById("username").value;
		var password=document.getElementById("password").value;
		
		asyncRequest = new XMLHttpRequest();
		asyncRequest.addEventListener("readystatechange", function(){
							
		if(asyncRequest.readyState == 4 && asyncRequest.status ==200 && asyncRequest.responseXML){
											
		var userDetails =  asyncRequest.responseXML.getElementsByTagName("User");

		for(var i = 0; i< userDetails.length; i++){
		
		var user = userDetails.item(i);
		var uName=user.getElementsByTagName("userName").item(0).firstChild.nodeValue;
		var pwd=user.getElementsByTagName("password").item(0).firstChild.nodeValue;
												
		if(uName==userName&&pwd==password){
	    sessionStorage.setItem("userName",userName);
		sessionStorage.removeItem("errMessage");
	    window.location="DisplayPerfume.html";
													
	    } //end internal if 
											
	    }//end for loop
								
	   if(userName==""&&password==""){
	   
	   document.getElementById("errMessage").innerHTML=('<h3 style="color:red;"> Username and password fileds can not be empty !<br>Please enter the Login Credentials and try again.</h3>');
										   
	   } else							 
	   if(userName=="Admin"&&password=="Admin"){
		sessionStorage.setItem("userName",userName);
		sessionStorage.removeItem("errMessage");
		window.location="AdminHome.html";
										  
		}
		else{
		document.getElementById("errMessage").innerHTML=('<h3 style="color:red;">Invalid  Username or password !<br>Please verify the Login Credentials and try again.</h3>');
		}
		}//end if
							
		},false);//eventlistner & callback
		asyncRequest.open("GET","Users.xml",true);
		asyncRequest.send(null);	 
														
		},false);
			
	}//End start function
		
		
//event listener for load
window.addEventListener("load",start,false);
		
		