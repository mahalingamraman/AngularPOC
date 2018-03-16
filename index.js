var data=new Array();
var k=0;
function addAddress(){
	var name=document.frm.txtname.value;
	var sex;
	if(document.frm.txtr1[0].checked)
		sex="male";
	else
		 sex="female";
	var dat=document.frm.txtyear.value+":"+document.frm.txtmonth.value+":"+document.frm.txtdate.value;
	var tam="",eng="",tel="";
	if(document.frm.txttamil.checked)
	{tam="tamil";}
	if(document.frm.txtenglish.checked)
	{eng="english";}
	if(document.frm.txttelugu.checked)
	{tel="telugu";}
	var comm=document.frm.comments.value;
	data[k]=new Array(7);
	data[k][0]=name;
	data[k][1]=dat;
	data[k][2]=sex;
	data[k][3]=tam;
	data[k][4]=eng;
	data[k][5]=tel;
	data[k][6]=comm;
	k++;
	document.frm.txtname.value="";
	document.frm.comments.value="";
console.log(data);
	loaddata(data);
}

function loaddata(data){
	var table=document.all.tbl;
	if(table.rows.length!="")
	{
		for(var i=table.rows.length;i>1;i--)
		{
			table.deleteRow(i-1);
		}
	}

	for(var i=0;i<k;i++){
		if(data[i][0].length!=""){
				var newRow = table.insertRow (table.rows.length);
			 var cell0=newRow.insertCell(newRow.cells.length);
			 cell0.innerHTML="<input type=\"radio\" name=\"id\" value=\""+i+"\" style=\"cursoronhand\" onclick=\"load1("+i+")\">";
				 var cell1 = newRow.insertCell (newRow.cells.length);
					cell1.appendChild(document.createTextNode(data[i][0]));
			 var cell2 = newRow.insertCell (newRow.cells.length);
				 cell2.appendChild(document.createTextNode(data[i][1]));
				 var cell3 = newRow.insertCell (newRow.cells.length);
				 cell3.appendChild(document.createTextNode(data[i][2]));
				 var cell4 = newRow.insertCell (newRow.cells.length);
				 cell4.innerHTML=data[i][3]+","+data[i][4]+","+data[i][5];
				 var cell5 = newRow.insertCell (newRow.cells.length);
				 cell5.appendChild(document.createTextNode(data[i][6]));
			}
		}
}
function load1(i)
{
	var da=data[i][1];
	var ye=da.substring(0,da.indexOf(":"));
	da=da.substring(da.indexOf(":")+1,da.length);
	var mo=da.substring(0,da.indexOf(":"));
	da=da.substring(da.indexOf(":")+1,da.length);
	var d=da.substring(0,da.length);
	document.frm.txtname.value=data[i][0];
	document.frm.txtyear.value=ye;
	document.frm.txtmonth.value=mo;
	document.frm.txtdate.value=d;
	if(data[i][2]=="male")
		document.frm.txtr1[0].checked=true;
	else
		document.frm.txtr1[1].checked=true;
	if(data[i][3]=="tamil")
		document.frm.txttamil.checked=true;
	else
		document.frm.txttamil.checked=false;
	if(data[i][4]=="english")
		document.frm.txtenglish.checked=true;
	else
		document.frm.txtenglish.checked=false;
	if(data[i][5]=="telugu")
		document.frm.txttelugu.checked=true;
	else
		document.frm.txttelugu.checked=false;
		document.frm.comments.value=data[i][6];
		document.frm.id1.value=i;
	}
function updateAddress()
{
	var h=document.frm.id1.value;
	if(h=="")
		alert("Select the name");
	else
	{
		var name=document.frm.txtname.value;
		var sex;
		if(document.frm.txtr1[0].checked)
			sex="male";
		else
			 sex="female";
		var dat=document.frm.txtyear.value+":"+document.frm.txtmonth.value+":"+document.frm.txtdate.value;
		var tam="",eng="",tel="";
		if(document.frm.txttamil.checked)
		{tam="tamil";}
		if(document.frm.txtenglish.checked)
		{eng="english";}
		if(document.frm.txttelugu.checked)
		{tel="telugu";}
		var comm=document.frm.comments.value;
		data[h][0]=name;
		data[h][1]=dat;
		data[h][2]=sex;
		data[h][3]=tam;
		data[h][4]=eng;
		data[h][5]=tel;
		data[h][6]=comm;
		loaddata(data);
		document.frm.txtname.value="";
		document.frm.comments.value="";
		document.frm.id1.value="";
		}
}
function deleteAddress()
{
	var h=document.frm.id1.value;
	if(h=="")
		alert("Select the name");
	else
	{
		data[h][0]="";
		data[h][1]="";
		data[h][2]="";
		data[h][3]="";
		data[h][4]="";
		data[h][5]="";
		data[h][6]="";
		loaddata(data);
		document.frm.txtname.value="";
		document.frm.comments.value="";
		document.frm.id1.value="";
	}

}
function fetchAddress(){
fetch('get.php')
	.then(
		function(response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			// Examine the text in the response
			response.json().then(function(data) {
				let columnArr =[{colDisplay:'user name', beDisplay:'username'}, {colDisplay:'d o b',beDisplay:'dob'},{colDisplay:'gen der',beDisplay:'gender'}];
				console.log(data);
				if(data.length){
					let table ="<table border=1><tr>";
							columnArr.map(column=>{table+="<th>"+column.colDisplay+"</th>"});
					table+="</tr>";
					data.map(da=>{
						table+="<tr>";
							columnArr.map(column=>{
								table+="<td>"+da[column.beDisplay]+"</td>";
							});
						table+="</tr>";
					});
					table+= "</table>";
					document.getElementById('backend-data').innerHTML = table;
					}
			});
		}
	)
	.catch(function(err) {
		console.log('Fetch Error :-S', err);
	});

}
