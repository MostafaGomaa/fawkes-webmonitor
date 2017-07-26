
Vue.component('agent-widget' , { 

	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h2> {{title}}</h2> 														\
					<button v-on:click="init"> start </button> 									\
					<lock-role :topic_data="lockRole" :robot_name="robot_name"> Loading Lock Role !! </lock-role> 								\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "agent_widget",
			title: "Agent Info",
			robot_name: "Rx",
			classObject: {
  				container : true
  			},
  	    	show: true ,
	  	    topics: { 
		  	    	clips: { "lock-role": [] , holding: [] , state: [] , tasks: [] , "locked-resource" : [] , skills: [] },
	  	    		}
  		}
  	},
  	computed: {
  		lockRole: function (){
  			return this.topics.clips["lock-role"][0];
  		}
  	}
});


Vue.component('lock-role' , { 
	props: [ 'topic_data' , 'robot_name' ],
	template: '	<div :id="generatedID"												\
					 :class= "classObject" >										\
						<img> </img> 												\
						<span v-if="!isMaster"> {{ topic_data.fields[0] }}</span>	\
				</div> 																\
				',

	data: function () {
		return{
			id_prefix: "lock_role__",
  	    	show: true ,
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true,
	  			container_header_element : true,
	  			master : (this.topic_data.fields[0] == "MASTER"),
	  			slave : (this.topic_data.fields[0] != "MASTER") 
  			}
  				
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		isMaster: function(){
  			return this.topic_data.fields[0] == "MASTER"; 
  		}

  	}
});





//TODO IN CSS RESTUCTURE ROUND
// let the CSS not use ids..I dont like ids