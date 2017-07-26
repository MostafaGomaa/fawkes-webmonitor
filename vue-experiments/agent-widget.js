
Vue.component('agent-widget' , { 

	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h2> {{title}}</h2> 														\
					<button v-on:click="init"> start </button> 									\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "agent_widget",

			title: "Agent",

			classObject: {
  				col_element : true
  			},

  	    	show: true ,

	  	    topics: { 
		  	    	clips: { "lock-role": [] , holding: [] , state: [] , tasks: [] , "locked-resource" : [] , skills: [] },
	  	    		}
  		}
  	}
});