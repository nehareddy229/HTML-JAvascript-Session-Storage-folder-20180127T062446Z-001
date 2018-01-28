//Created by Anusha Gajula and Neha Reddy Anumalla 
//Group-6



//variable declaration



var itemNo=0,qty="";
var finalAmount=0.0;
var discount=0.0;
var billInfo="";
var pcode;


var asyncRequest;

function clearFields()
{
	document.getElementById("fullName").value="";
	document.getElementById("cardNo").value="";
	document.getElementById("validityDate").value="";
	document.getElementById("mobileNo").value="";
	document.getElementById("email").value="";
	document.getElementById("address").value="";
	document.getElementById("promocode").value="";
			
			
}
	
function start(){
     if(sessionStorage.getItem("userName")!=null)
		{			
	    	document.getElementById("promocodeLable").style.visibility="hidden";
			document.getElementById("viewPayform").style.visibility="hidden";
			document.getElementById("userNote").innerHTML="Welcome - " + sessionStorage.getItem("userName");
			
			
			document.getElementById("viewPerfumesBtn").addEventListener("click",function(){ 
			document.getElementById("promocodeLable").style.visibility="hidden";
			document.getElementById("viewPayform").style.visibility="hidden";
							
              asyncRequest = new XMLHttpRequest();
              asyncRequest.addEventListener("readystatechange", function(){
							
			document.getElementById("viewListOfPerfumes").innerHTML="";
		    if(asyncRequest.readyState == 4 && asyncRequest.status ==200 && asyncRequest.responseXML){
										
				var tRow = document.createElement("tr")
				var td = document.createElement("td");
				var td2 = document.createElement("td")	
				td.innerHTML="Enter the quantity :";
				td2.innerHTML="<input type='text' value='1' id='quantityText'/>";
				tRow.appendChild(td);
				tRow.appendChild(td2);
											
	document.getElementById("viewListOfPerfumes").appendChild(tRow);
											
			    var perfumeDetails =  asyncRequest.responseXML.getElementsByTagName("Perfume");
										   
				for(var i = 0; i< perfumeDetails.length; i++){
					
					var Perfume = perfumeDetails.item(i);
					tRow = document.createElement("tr")//created one row
					td = document.createElement("td");
					 td2 = document.createElement("td");
													
					var imageUrl= Perfume.getElementsByTagName("imageUrl").item(0).firstChild.nodeValue;
					var name=Perfume.getElementsByTagName("name").item(0).firstChild.nodeValue;
					var price=Perfume.getElementsByTagName("price").item(0).firstChild.nodeValue;
					var quantity= Perfume.getElementsByTagName("quantity").item(0).firstChild.nodeValue;
					var volume=	Perfume.getElementsByTagName("volume").item(0).firstChild.nodeValue;
					var category =Perfume.getElementsByTagName("category").item(0).firstChild.nodeValue;
					var promocode = Perfume.getElementsByTagName("promoCode").item(0).firstChild.nodeValue;
					var discount=parseInt(promocode);
					var itemId=Perfume.getElementsByTagName("itemId").item(0).firstChild.nodeValue;
					
					td.innerHTML="<img src='"+imageUrl+"' width='250' height='230' alt='perfume image' /><br>";
					
					
					td2.innerHTML=name+"<br> Price : $"+price+"<br> Quantity : "+quantity+"<br> Volume : "+volume+"<br><input type='radio' name='selectedItem' id='selectedItem' value='"+itemId +"'> </input>Select this Item <br> <span style='background-color:	yellow;color:blue'>Promo Code :"+promocode+"<br>Use this promo code to get "+discount+" % discount.</span>";
														
					tRow.appendChild(td);
					tRow.appendChild(td2);
					document.getElementById("viewListOfPerfumes").appendChild(tRow);
																	  
				 }//end for
									 
	   }//end if
							
   },false);//eventlistner & callback
		asyncRequest.open("GET","PerfumeList.xml",true);
		asyncRequest.send(null);	 
	
	},false);
	

//check out button event handler	
 document.getElementById("CheckOutBtn").addEventListener("click",function(){ 

	var selectedItm;
					
 document.getElementById("promocodeLable").style.visibility="visible";
	var radios = document.getElementsByName('selectedItem');

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
									
		selectedItm=radios[i].value;
	break;
	}
	
  }

    if(selectedItm==""||selectedItm==null)
	{
	  document.getElementById("errMessage").innerHTML="<h3 style='color:red;'>Please select atleast one item</h3>";
	
	  document.getElementById("promocodeLable").style.visibility="hidden";
	}
	else{
		document.getElementById("errMessage").innerHTML="<h3 style='color:yellow;'>click on pay online button to complete transaction.</h3>";
		}
		qty=document.getElementById("quantityText").value;
		
		asyncRequest = new XMLHttpRequest();
		asyncRequest.addEventListener("readystatechange", function(){
							
	document.getElementById("viewListOfPerfumes").innerHTML="";
		
		if(asyncRequest.readyState == 4 && asyncRequest.status ==200 && asyncRequest.responseXML){
											
		var perfumeDetails =  asyncRequest.responseXML.getElementsByTagName("Perfume");

			for(var i = 0; i< perfumeDetails.length; i++){
				var Perfume = perfumeDetails.item(i);
										   
				var itemId=Perfume.getElementsByTagName("itemId").item(0).firstChild.nodeValue;
												
		if(selectedItm==itemId)
			{
											
			var imageUrl= Perfume.getElementsByTagName("imageUrl").item(0).firstChild.nodeValue;
			 
			var name=Perfume.getElementsByTagName("name").item(0).firstChild.nodeValue;
			var price=Perfume.getElementsByTagName("price").item(0).firstChild.nodeValue;
		    var quantity= Perfume.getElementsByTagName("quantity").item(0).firstChild.nodeValue;
			var volume=	Perfume.getElementsByTagName("volume").item(0).firstChild.nodeValue;
			var category =Perfume.getElementsByTagName("category").item(0).firstChild.nodeValue;
			var desc=Perfume.getElementsByTagName("description").item(0).firstChild.nodeValue;
			pcode = Perfume.getElementsByTagName("promoCode").item(0).firstChild.nodeValue;
										
											discount=parseInt(pcode);
											
												
											
											
	document.getElementById("summaryOfOrder").innerHTML="<img src='"+imageUrl+"' width='350' height='300' alt='perfume image' /><br><h3>"+name+"<br> Price : $"+price+"<br> Item Description : "+desc+"<br> Quantity : "+quantity+"<br> Volume : "+volume+"<br> <span style='background-color:	yellow;color:blue'>Promo Code :"+pcode+"<br>Use this promo code to get "+discount+" % discount.</span></h3>";
											
											
			var total=parseFloat(price)*parseInt(qty);
			var tax=total*0.085;
			finalAmount=(total+tax);
			billInfo='<h2>Billing Details</h2><hr>Number of Items : '+qty+'<br> Cost per Item : $'+price+'<br>Toal Cost : $'+total+'<br> Tax amount : $'+tax.toFixed(2)+'<br><hr><b>Final Amount : $ '+finalAmount.toFixed(2)+'</b>';
		break;
											
	}

      }//end for
   }//end if
							
	},false);//eventlistner & callback
	
	asyncRequest.open("GET","PerfumeList.xml",true);
	asyncRequest.send(null);	 
								
	},false);
			


			//payment button
		document.getElementById("payOnlineButton").addEventListener("click",function(){ 
		document.getElementById("promocodeLable").style.visibility="hidden";
		document.getElementById("summaryOfOrder").style.visibility="hidden";
		document.getElementById("viewPayform").style.visibility="visible";
		document.getElementById("summaryOfBill").style.visibility="visible";
		document.getElementById("viewListOfPerfumes").innerHTML="";
		document.getElementById("errMessage").innerHTML="<h3 style='color:yellow;'>All fields are mandatory.</h3>";
		var promoCode=document.getElementById("promocode").value;
									
		if(promoCode==pcode)
		{
				//calculate discount 				
			var dAmount=finalAmount*(discount/100);
			//subtract discount from final amount
			finalAmount=finalAmount-dAmount;
			
			
			billInfo+='<br>Discount  '+discount+' % : -$'+dAmount.toFixed(2)+'<br><br><hr><b>After discount Final Bill : $' + finalAmount.toFixed(2)+'</b>';
												
		}
									
			document.getElementById("amountLabel").innerHTML='<h2 style="color:drakblue;"> $ '+finalAmount.toFixed(2)+'</h2>';
			document.getElementById("summaryOfBill").innerHTML=billInfo;
		
									
		},false);
									
								
		
		
		document.getElementById("completeOrderBtn").addEventListener("click",function(){ 
		document.getElementById("viewPayform").style.visibility="hidden";
		document.getElementById("summaryOfBill").style.visibility="hidden";
		document.getElementById("summaryOfOrder").innerHTML="";
		document.getElementById("viewListOfPerfumes").innerHTML="";
		
			if(document.getElementById("fullName").value==""||document.getElementById("cardNo").value==""||document.getElementById("validityDate").value==""||document.getElementById("mobileNo").value==""||document.getElementById("email").value==""||document.getElementById("address").value=="")
			{
		
			
			document.getElementById("payfieldErrors").innerHTML="<h3 style='color:yellow;'>All fields are mandatory. Please verify</h3>";
			document.getElementById("viewPayform").style.visibility="visible";
				
			
			}
					else{
					document.getElementById("completePayment").innerHTML='<h2>Your payment has completed successfully.</h2><h3> Your ordered Item is send to following address.<br>Name   : '+
					document.getElementById("fullName").value+'<br>Address : '+document.getElementById("address").value+'<br> Mobile No : '+document.getElementById("mobileNo").value	+'</h3>';
				}
								
				},false);
									
						
		document.getElementById("resetBtn").addEventListener("click",function(){ 

			clearFields();
			
			},false);
							
}//session if
		
		
	else{
			
		sessionStorage.setItem("errMessage","Please Login to get User services ");
		 window.location="Login.html";
			
    }
		
	
	} // end function start()
		
		
//event listener for load
window.addEventListener("load",start,false);
		
		
		
		
		
		
		