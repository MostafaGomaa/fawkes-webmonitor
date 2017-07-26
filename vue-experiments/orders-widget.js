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


Vue.component('product' , { 
	
	props: ['product_data'],	
	template: '<div :style="styleObject" :class="classObject">			\
				<div :style="{ backgroundColor : getCapColor }"			\
					class="products_cap" > 								\
					</div> 												\
				<div v-for = "item in product_data.rings"				\
					:style="{ backgroundColor : item }"					\
					class="products_ring" > 							\
					</div> 												\
					<div :style="{ backgroundColor : getBaseColor }"	\
					class="products_base" > 							\
					</div>											\
				</div>',
	data: function () {
		return{
			id : '',
			classObject: { product : true},
			styleObject: {}
  		}	
  	},

  	computed: {
  		styleObject: function (){

  		},

  		getBaseColor: function (){
  			return this.product_data["base"][0];

  		},

  		getCapColor: function (){
  			return this.product_data["cap"][0];

  		},

  		getRingColor: function (ring_index){
  			return this.product_data["rings"][0][ring_index];

  		},

  		getRingCount: function (){
  			return this.product_data["rings"][0].length();

  		}
  	}


});


Vue.component('orders-widget' , { 
	
	extends : widget,
	
	template: '	<div v-bind:class= "classObject" > 							\
					<h2> {{title}}</h2> 									\
					<button v-on:click="init"> starr </button> 				\
					<div v-for= "item in topics.clips.order">				\
						<product :product_data="getProductForOrder(item)"  > </product>\
						<br>												\
					</div>													\
				</div> 														\
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
					console.log( order["product-id"][0].constructor )

  			for (var i in this.topics.clips.product){
  				var product = this.topics.clips.product[i];
  				console.log( order["product-id"][0] )
  				console.log(product["id"][0]);
  	
  				if (product["id"][0] == order["product-id"][0] )
				{
					return product
				}
				}
  			}
  		}
  

});
