
Vue.component('test' , { 
	template: '\
		<div>\
		This is the cusmtos one\
		</div>\
	'
})

Vue.component('simple-wedgit' , { 
	template: '\
		<div>\
		    <input v-model="input_text">\
		    <button v-on:click="subscribe">\
		     	Subscribe\
		    </button>\
		 </div>\
	',
	
  data: function () {
  	return {
  	    show: true ,
  	    input_text : 'clips/order', 
  	}
  },

  methods: {

  	subscribe: function (){  

		var ros_topic = new ROSLIB.Topic({
		      ros : ros,
		      name : 'some_topic',
		      messageType : 'mm',
		      throttle_rate:window.throttle_rate ,
		    });

	  	ros_topic .name = this.input_text;	 	
	  	ros_topic .subscribe(this.updateValues);
	},
	
	updateValues: function(message) {

		// for (var key in message)//present the content in the div 
		// {
		// 	var div_content = key + " : ";
		// 	if(message[key].constructor === Array)
		// 	{
		// 		for( var fact in message[key] )
		// 		{
		// 			div_content+= JSON.stringify(message[key][fact], null,e 5) + "<br>"; //TODO: maybe i dont need to stringfiy 
		// 		}
		// 	}
		// 	else
		// 	{
		// 		div_content+= message[key] + "<br>"; 
		// 	}

		// 	div_content+=  "<br>"; 
		// 	$(div_id).append(div_content);
		// }

		console.log ( message );	
	  	console.log ( this.input_text );
	}
	
  }
});


