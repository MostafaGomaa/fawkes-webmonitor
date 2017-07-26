
Vue.component('agent-widget' , { 

	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h2> {{title}}</h2> 														\
					<button v-on:click="init"> start </button> 									\
					<lock-role :topic_data="lockRoleTopic"  									\
								:robot_name="robot_name"> 										\
						Loading Lock Role !! 													\
					</lock-role> 																\
					<holding :holding_data="holdingTopic" 										\
							:workpiece_data="productOfHolding" 									\
							:robot_name="robot_name"> 											\
						Loading Holding !! 														\
					</holding> 																	\
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
		  	    	clips: { "lock-role": [] , holding: [] , state: [] , tasks: [] , "locked-resource" : [] , skills: [] , product: [] },
	  	    		}
  		}
  	},
  	computed: {
  		lockRoleTopic: function (){
  			return this.topics.clips["lock-role"][0];
  		}, 

  		holdingTopic: function (){
  			return this.topics.clips["holding"][0];
  		},

 		productOfHolding: function (){
			// console.log( order["product-id"][0].constructor )
  			for (var i in this.topics.clips.product){
  				var product = this.topics.clips.product[i];
  				// console.log( order["product-id"][0] )
  				// console.log(product["id"][0]);
  				if (product["id"][0] == this.topics.clips["holding"][0].fields[0] )
				{
					return product
				}
				}
  		}
  	},
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


Vue.component('holding' , { 
	props: [ 'holding_data', 'workpiece_data' , 'robot_name' ],
	template: '	<div :id="generatedID"																\
					 :class= "classObject" >														\
					<p> Holding: {{holding}}</p>													\
					<workpiece :topic_data="workpiece_data"> Loading Workpiece !! </workpiece> 		\
				</div> 																				\
				',

	data: function () {
		return{
			id_prefix: "holding__",
  	    	show: true 
  		}
  	},

  	computed: {
  		classObject: function (){
  			return {
	  			wedgit : true,
	  			container_header_element : true
  			}	
  		},

  		generatedID: function(){
  			return this.id_prefix + this.robot_name;
  		},

  		holding: function(){
  			return this.holding_data.fields[0];
  		}

  	}
});





//TODO IN CSS RESTUCTURE ROUND
// let the CSS not use ids..I dont like ids