
//A simple monitor that allowes live subsscriptions (clips, bb, Ros) Topics. Showes a textaul representation of the topics lively updated.
function simple_monitor(){

	var div_ids=0;// index to be used to make unique ids

	window.$layout_container.append("<div id=monitor_div  class=wedgit container>  </div>");//the wedgit container
	$("#monitor_div").append("<button class=smplmntr > subscribe </button>");
	$("#monitor_div").append("<input  type='text' class=smplmntr > </input>");

	$(document).ready(function()
	{
	    $("#monitor_div").find(":button") .click(function() 
	    {
	    	var prefiexed_topic_name = $("#monitor_div").find(":text").val(); 

	    	$("#monitor_div").append("<div id=monitor_div_"+div_ids+" class=smplmntr > </div>"); //where the topic wil be displaied

	    	var listener = new ROSLIB.Topic({
			    ros : ros,
			    name : prefiexed_topic_name,
			    messageType : 'mm',
			    throttle_rate:window.throttle_rate ,
		  	});
		  	listener.div_index=div_ids; //keep the div's id as a topic attridute
		  	listener.subscribe(function(message) 
		  	{
		  		var div_id="#monitor_div_"+this.div_index;
		  		
		  		$(div_id).empty();// clear the div

		  		for (var key in message)//present the content in the div 
		  		{
		  			var div_content = key + " : ";
		  			if(message[key].constructor === Array)
		  			{
		  				for( var fact in message[key] )
		  				{
		  					div_content+= JSON.stringify(message[key][fact], null, 5) + "<br>"; //TODO: maybe i dont need to stringfiy 
		  				}
		  			}
		  			else
		  			{
		  				div_content+= message[key] + "<br>"; 
		  			}
		
		  			div_content+=  "<br>"; 
		  			$(div_id).append(div_content);
		  		}
		  		
		  	});

		  	div_ids++;
	    });

	});
}

