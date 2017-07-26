


Vue.component('workpiece' , { 
	props: ['topic_data'],
	template: '																				\
			<div :style="styleObject" :class="classObject(workpieceTypes.product)">			\
				<div :style="{ backgroundColor : getCapColor }"								\
					 :class="classObject(workpieceTypes.cap)" > 							\
					</div> 																	\
				<div v-if = "getRingCount > 2"												\
					 :style="{ backgroundColor : getRingColor(2) }"							\
					 :class="classObject(workpieceTypes.ring)" > 							\
				</div> 																		\
				<div v-if = "getRingCount > 1"												\
					 :style="{ backgroundColor : getRingColor(1) }"							\
					 :class="classObject(workpieceTypes.ring)" > 							\
				</div> 																		\
				<div v-if = "getRingCount > 0"												\
					 :style="{ backgroundColor : getRingColor(0) }"							\
					 :class="classObject(workpieceTypes.ring)" > 							\
				</div> 																		\
				<div :style="{ backgroundColor : getBaseColor }"							\
					 :class="classObject(workpieceTypes.base)" > 							\
				</div>																		\
			</div>',
	data: function () {
		return{
			id : '',
			styleObject: {},
			workpieceTypes: {
				base : 0,
				cap: 1,
				ring: 2,
				product:3
			}
  		}
  	},

  	methods : {
  		classObject: function(workpiece_type){
  			return {
  				product:  (workpiece_type == this.workpieceTypes.product) ,
  				products_base: (workpiece_type == this.workpieceTypes. base),
  				products_cap: (workpiece_type == this.workpieceTypes.cap),
  				products_ring: (workpiece_type == this.workpieceTypes.ring)
  			}
  		},

  		getRingColor: function (ring_index){
  			return this.topic_data["rings"][ring_index];

  		}
  	},


  	computed: {

  		getBaseColor: function (){
  			return this.topic_data["base"][0];

  		},

  		getCapColor: function (){
  			return this.topic_data["cap"][0];

  		},

  		getRingCount: function (){
  			return this.topic_data["rings"].length;

  		}
  	}


});

Vue.component('order-info',  {
	props: ['topic_data'],
	template: '																											\
			<div :class="classObject">																					\
				<span> Gate: {{ topic_data["delivery-gate"][0] }} </span>												\
				<br>																									\
				<span> {{ topic_data["begin"][0] + ":" + topic_data["end"][0] }} </span>								\
				<br>																									\
				<span> {{ topic_data["quantity-delivered"][0] + "/" + topic_data["quantity-requested"][0] }} </span>	\
				<br>																									\
			</div>',

	data: function () {
		return{
			classObject: { order_info: true }
		}
	}
});


Vue.component('order' , { 
	props: [ 'order_data' , 'product_data' ],
	template: '	<div v-bind:class= "classObject" >															\
						<workpiece :topic_data="product_data" > workpiece Not loaded !! </workpiece>		\
						<br>																				\
						<order-info :topic_data="order_data" > OrderInfo Not loaded !! </order-info>		\
					</div>																					\
				</div> 																						\
				',

	data: function () {
		return{
			id : "",

			classObject: {
  				order : true
  			},

  	    	show: true
  		}
  	}
});


Vue.component('orders-widget' , { 

	extends : widget,

	template: '	<div v-bind:class= "classObject" > 												\
					<h2> {{title}}</h2> 														\
					<button v-on:click="init"> starr </button> 									\
					<div v-for= "item in topics.clips.order">									\
						<order 	:product_data="getProductForOrder(item)" 						\
								:order_data=item > 												\
								Order Not Loaded !! 											\
						</order>																\
					</div>																		\
				</div> 																			\
				',

	data: function () {
		return{
			id : "orders_widget",

			title: "Orders",

			classObject: {
  				col_element : true
  			},

  	    	show: true ,

	  	    topics: { 
		  	    	clips: { order: [] , product: [] },
	  	    		}
  		}
  	}

  ,

  methods: {
  		getProductById: function (id){
  			for (var i in this.topics.clips.product){
  				var product = this.topics.clips.product[i];
  				if (product.id[0] === id )
				{return product}
				}
  			},
  		//TODO: i could not make this work as a computed..Figure out why and do it
  		getProductForOrder: function (order){
			// console.log( order["product-id"][0].constructor )
  			for (var i in this.topics.clips.product){
  				var product = this.topics.clips.product[i];
  				// console.log( order["product-id"][0] )
  				// console.log(product["id"][0]);
  
  				if (product["id"][0] == order["product-id"][0] )
				{
					return product
				}
				}
  			}
  		}
  

});


//OLD CODE
// Vue.component('order' , { 
// 	template: '\
// 		<div v-bind:class="classObject">\

		  
// 		 </div>\
// 	',

//   data: function () {
//   	return {
//   	   classObject:{
//   	   	order: true,


//   	   } 


//   	}
//   },

//   methods: {

//   	subscribe: function (){  

// 		var ros_topic = new ROSLIB.Topic({
// 		      ros : ros,
// 		      name : 'some_topic',
// 		      messageType : 'mm',
// 		      throttle_rate:window.throttle_rate ,
// 		    });

// 	  	ros_topic .name = this.input_text;
// 	  	ros_topic .subscribe(this.updateValues);
// 	},

// 	updateValues: function(message) {

// 		// for (var key in message)//present the content in the div 
// 		// {
// 		// 	var div_content = key + " : ";
// 		// 	if(message[key].constructor === Array)
// 		// 	{
// 		// 		for( var fact in message[key] )
// 		// 		{
// 		// 			div_content+= JSON.stringify(message[key][fact], null,e 5) + "<br>"; //TODO: maybe i dont need to stringfiy 
// 		// 		}
// 		// 	}
// 		// 	else
// 		// 	{
// 		// 		div_content+= message[key] + "<br>"; 
// 		// 	}

// 		// 	div_content+=  "<br>"; 
// 		// 	$(div_id).append(div_content);
// 		// }

// 		console.log ( message );
// 	  	console.log ( this.input_text );
// 	}

//   }