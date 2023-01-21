var $prodc="";
var $line="";
var controller={
	    get_tables:function() {
        var uri=`${url}pos/dinner/tables/?waiter=${waiter_key}&cc=${$cc}&zone=${zone}`;
        model.invoke_service(uri,null,function(data) {
          views.print_mesas(data);
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      ismobile:function()
      {
        if (window.innerWidth<=1000){return true;}
        else {return false;}
      },
      resfresh_tables:function()
      {
      	event.show_loading();
      	controller.get_tables();
        //Sale al modelo para obtener datos e inyectarlos a la vista correspondiente
      },
      verify_size_window:function(id_table,code="",cuantity=2,e=null)
      {
        if(e)
          views.select_table(e);
        
      	if(id_table<=0)
      	{
      		// alert("La mesa no esta abierta.");
          var mesa=document.querySelector("#txttable");
          var num_people=document.querySelector("#txtnumpeople");
          num_people.value=cuantity;
          mesa.value=code;
      		this.show_modal("#open-table");
          mesa.focus();
      		return;
      	}
      	if(this.ismobile())
      	{
          var params=`&idt=${id_table}`;
          if(token!="")
            params+="&dmtm_token="+token;
          if(ws!="")
            params+="&dm_scr="+ws;
      		window.location.href=`./?view=vw_infocuenta${params}`;
      		return;
      	}
      	controller.get_table(id_table);
      },
      get_table:function(id_table){
      	
      	var uri=`${url}pos/dinner/tables/${id_table}/`;
      	model.invoke_service(uri,null,function(data) {
          views.print_ordenes(data);
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      show_modal:function(id)
      {
      	var modal=document.querySelector(id);
      	modal.classList.remove("hidde_control");
      },
      hide_modal:function(id)
      {
      	var modal=document.querySelector(id);//"#open-table"
        var mesa=document.querySelector("#txttable");
        var notas=document.querySelector("#txtnotas");
        var num_people=document.querySelector("#txtnumpeople");
        mesa.value="";
        num_people.value="2";
        notas.value="";
      	modal.classList.add("hidde_control");
      },
      close_view:function(idview,params="")
      {
        if(token!="")
          params+="&dmtm_token="+token;
        if(ws!="" && idview!="vw_workspace")
          params+="&dm_scr="+ws;
      	window.location.href="./?view="+idview+params;
      },
      open_view:function(idview,params="")
      {
        if(token!="")
          params+="&dmtm_token="+token;
        if(ws!="")
          params+="&dm_scr="+ws;
        window.location.href="./?view="+idview+params;
      },
      show_select_group:function()
      {
      	event.show_select();
      },
      open_table:function()
      {
      	var uri=`${url}pos/dinner/tables/`;
      	var mesa=document.querySelector("#txttable");
      	var notas=document.querySelector("#txtnotas");
      	var num_people=document.querySelector("#txtnumpeople");
      	if(mesa.value=="")
      	{
      		alert("Debe indicar un número de mesa.");
      		mesa.focus();
      		return;
      	}
      	if(Number(num_people.value)<1)
      	{
      		alert("Debe indicar un número de personas.");
      		num_people.focus();
      		return;
      	}
      	var data={
      		table:mesa.value,
      		notes:notas.value,
      		num_people:num_people.value,
      		waiter:waiter_key,//"#<@@(@waiter,'key')>",
      		cliente:"#<@code_publico_general>",
      		cc:$cc,//"#<@@(@waiter,'cc')>",
      		format:"#<@cadenaformato>"
      	}
      	model.invoke_service(uri,data,function(data) {
          controller.new_command(data.sys_guid,data.sys_pk,data.code,data.reference,views.format(data.balance,2,".",","));
          controller.get_tables();
          controller.hide_modal("#open-table");
          mesa.value="";
          num_people.value="2";
          notas.value="";
        },
        function(error) {
          alert(error.message);
        },"POST",false);
      },
      new_command:function(sys_guid,sys_pk="",name="",ticket="",balance="",line="",sku="")
      {
        var params="&desk=true&idtable="+sys_guid;
        if(this.ismobile())
        {
          var params="&desk=false&idtable="+sys_guid;
        }
        if(sys_pk!="")
          params+="&idt="+sys_pk
        if(name!="")
          params+="&n="+name;
        if(ticket!="")
          params+="&t="+ticket;
        if(balance!="")
          params+="&imp="+balance;
        if(line!="")
          params+="&line="+line;
        if(sku!="")
          params+="&sku="+sku;
        // if(token!="")
        //   params+="&dmtm_token="+token;
        this.open_view("newcommand",params);
      },
      reopen_table:function(id_table)
      {
        var uri=`${url}pos/dinner/tables/${id_table}`;
        var data={action:"open"}
        model.invoke_service(uri,data,function(data) {
          views.print_ordenes(data);
        },
        function(error) {
          alert(error.message);
        },"PATCH",false);

      },
      close_table:function(id_table)
      {
        var uri=`${url}pos/dinner/tables/${id_table}`;
        var data={action:"close"}
        model.invoke_service(uri,data,function(data) {
          views.print_ordenes(data);
        },
        function(error) {
          alert(error.message);
        },"PATCH",false);
      },
      back:function()
      {
        controller.get_lines();
        var barra=document.querySelector(".barr-atr");
        barra.style.display="none";
      },
      foodbev:function(elem,prodc="",line="",linedescrition="",sku="")
      {
        if(prodc!="")
          $prodc=prodc;
        if(line!="")
          $line=line;
        if(prodc=="" && line=="")
        {
          $prodc="";
          $line="";
        }
        
        var uri=`${url}pos/dinner/foodbev/?prodc=${$prodc}&line=${$line}&cc=${$cc}`;
        model.invoke_service(uri,null,function(data) {
          views.print_foodbev(data.foodbev,data.line.description);
          // views.print_foodbev(data.foodbev,data.line.description);
          var food=document.querySelector("#foodbev_"+sku);
          if(food)
            food.click();
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      send_data_orders:function()
      {
        var amount=0;
        for(var i=0;i<list_orders.length;i++)
        {
          var itm=list_orders[i];
          amount+=Number(itm.price);
        }
        var data={
          waiter:waiter_key,
          cc:$cc,
          amount:amount,
          details:list_orders
        }
        var uri=`${url}pos/dinner/tables/${idtable}/`;
        model.invoke_service(uri,data,function(data) {
          console.log(data)
          var view=view_first;
          var id_table=data.sys_pk;
          if(controller.ismobile())
          {
            view=view_second;
            var currenttotal=document.querySelector("#totalcurrent");
            var namem=document.querySelector("#name_m");
            var ticket=document.querySelector("#name_ticket");
            var params="&idt="+data.sys_pk;
            // if(currenttotal)
            //   params+="&imp="+currenttotal.getAttribute("total");
            // if(namem)
            //   params+="&n="+namem.getAttribute("value");
            // if(ticket)
            //   params+="&t="+ticket.getAttribute("value");
            controller.open_view(view,params);
            // controller.get_table(id_table);
            return;
          }
          controller.open_view(view,"&idt="+data.sys_pk);//
        },
        function(error) {
          alert(error.message);
        },"POST",false);
        
      },
      get_prodc:function(idcc="")
      {
        var uri=`${url}pos/dinner/prodc/?cc=${idcc}`;
        model.invoke_service(uri,null,function(data) {
          views.print_prodc(data);
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      get_lines:function(prodc="")
      {
        var uri=`${url}pos/dinner/fblines/?prodc=${prodc}`;
        model.invoke_service(uri,null,function(data) {
          views.print_lines(data);
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      get_adds_dmns:function()
      {
        var uri=`${url}pos/dinner/foodbev-adds/`;
        model.invoke_service(uri,null,function(data) {
          list_adds_dmns=data;
        },
        function(error) {
          alert(error.message);
        },"GET",false);
      },
      data_foodbev:function(sys_pk,other=false)
      {
        // var uri=`${url}pos/dinner/prodc/?_key=${sys_pk}`;
        // model.invoke_service(uri,null,function(data) {
        //   views.add_foodbev(data)
        // },
        // function(error) {
        //   alert(error.message);
        // },"GET",false);
        views.add_foodbev(sys_pk,other);
      },
      other_equals:function(uuid,sys_pk)
      {
        for (var i =0; i<list_orders.length; i++) {
          var list_ordr=list_orders[i];
          var sku=list_ordr.sku;
          if(sku.sys_pk===sys_pk)
          {
            var newsku =list_ordr;
            var data=JSON.stringify(newsku);
            var newdata=JSON.parse(data);
            newdata.uuid=uuid;
            newdata.price=sku.price;
            list_orders.push(newdata);
            controller.show_modal('#modal-indicaciones');
            views.show_indications(newdata.options,uuid);
            break;
          }
        }
        
      },
      quit:function(id)
      {
        list_orders.forEach(function(elem,index) {
          if(id===elem.uuid)
          {
            list_orders.splice(index,1);
            return false;
          }
        });
        var elem=document.querySelector(`.list-products-li > [id="${id}"]`);
        elem.remove();
        views.counter();
        views.showTotal();
      },
      indicatios:function(item,uuid)
      {
        controller.show_modal('#modal-indicaciones');
        views.show_indications(item.options,uuid);
      },
      lifetime:function(time)
      {
        switch(Number(time))
        {
          case 1:
            return "1er.";
            break;
          case 2:
            return "2do.";
            break;
          case 3:
            return "3er.";
            break;
          case 4:
            return "4to.";
            break;
          case 5:
            return "5to.";
            break;
        }
      },
      add_indications:function(id)
      {
        for(var s=0;s<list_requireds.length;s++)
        {
          var req=list_requireds[s];
          var selet_req=document.querySelector(`#single_${req.name.replace(/ /g,"")}_`);
          if(selet_req)
            if(selet_req.value=="")
            {
              alert(`El campo ${req.name} es requerido.`);
              return;
            }
        }
        var notas=document.querySelector("#txtnotas-indicacion");
        var detail_indications=document.querySelector(`#detail-indications_${id}`);
        var time=document.querySelector(".hover-btn");
        var text_detail="";
        list_orders.forEach(function(elem,index) {
          var data=elem.sku;
          if(id===elem.uuid)
          {
            var values=[];
            for (var i = 0; i < data.options.length; i++) {
              var opt=data.options[i];
              var vals=controller.get_indications(opt.name,opt.type=="multiple");
              
              if(vals!=null)
              {
                vals.values.forEach(function(e,i){
                  text_detail+=e.text+",";
                });
                values.push(vals);
              }
            }
            var price=0;
            for (var j = 0; j <values.length; j++) {
              var value=values[j];
              if(value.name==="adds")
              {
                var itm=value.values;
                for(a=0;a<itm.length;a++)
                {
                  var val=itm[a];
                  price+=Number(val.amount);
                }
                
              }
            }
            // if(list_orders[index].id)
            // {
            //   alert("ya fue agregado");
            //   return false;
            // }
           
            var subtotal=Number(list_orders[index].price) + price;
            // if(list_orders[index].adds && list_orders[index].adds==price)
            // {
            //   console.log("igual");
            //   var subtotal=Number(list_orders[index].price) + price;
            //   return false;
            // }
            // list_orders[index]["id"]=id;
            list_orders[index].price=subtotal;
            list_orders[index]["adds"]=price;
            list_orders[index]["total"]=price;
            list_orders[index]["options"]=values;
            list_orders[index]["notes"]=notas.value;
            text_detail+=notas.value+",";

            views.showSubTotal(id,subtotal);

            if(time){ 
              list_orders[index]["time"]=time.getAttribute("value");
            }
            return false;
          }
        });
        notas.value="";
        controller.hide_modal('#modal-indicaciones');
        views.add_details(time,text_detail,detail_indications);
        views.showTotal();

      },
      get_indications:function(name,ismultiple)
      {
        if(ismultiple)
          var indications=document.querySelectorAll(`.div-multiple > .div-check_${name.replace(/ /g,"")} > input`);
        else
          var indications=document.querySelectorAll(`.body-single > .div-single_${name.replace(/ /g,"")} > select`);

        var values=[];
        indications.forEach(function (elem,index) {
          if(elem.type==="checkbox")
          {
            if(elem.checked )
            {
              if(ismultiple && name===name_addcs)
              {
                var d={
                  text:elem.value,
                  sku:elem.getAttribute("sku"),
                  amount:Number(elem.getAttribute("amount"))
                };
              }else
                var d={
                  text:elem.value,
                  sku:"",
                  amount:0
                };
              values.push(d);
            }
          }
          else 
          {
            if(elem.options.selectedIndex>0)
            {
              var val=elem.options[elem.options.selectedIndex].value;
              var d={text:val};
              values.push(d);
            }
          }
        });
        if(name===name_addcs)
        {
          name="adds";
        }
        var data_indications={
            name:name,
            values:values
          }
        if(values.length>0)
          return data_indications;
        else
          return null;
      },
      addmore:function(data,linea,sku)
      {
        controller.new_command(data.sys_guid,data.sys_pk,data.code,data.reference,data.balance,linea,sku);
      },
      quit_prod:function(idt,sku,pkproducto,pkdorden)
      {
        var rs=confirm("¿Esta seguro que desea eliminar el elemento seleccionado?");
        if(!rs)
          return;

        var data={
          sku:sku,
          pkdorden:pkdorden,
          producto:pkproducto,
          action:"uptorder"
        }
        // console.log(data)
        // return;
        var uri=`${url}pos/dinner/foodbev/${idt}/`;
        model.invoke_service(uri,data,function(data) {
          views.print_ordenes(data);
        },
        function(error) {
          alert(error.message);
        },"PATCH",false);
      },
      time:function(e)
      {
        var time=document.querySelector(`#${e.id}`);
        var times=document.querySelectorAll("#times > button");
        times.forEach(function(elem,i){
          if(elem.classList.contains("hover-btn"))
          {
            elem.classList.remove("hover-btn");
          }
        });
        time.classList.add("hover-btn");
      },
      isrequired:function(options)
      {
        for (var j = 0; j<options.length; j++) {
          var option=options[j];
          if(option.required)
          {
            return true;
          }
        }
        return false;
      },
      reprint:function(id_table)
      {
        var uri=`${url}pos/dinner/tables/${id_table}`;
        var data={action:"reprint"}
        model.invoke_service(uri,data,function(data) {
          
        },
        function(error) {
          alert(error.message);
        },"PATCH",false);
      },
      gettoken:function(token)
      {
        
         var uri=`${url}pos/dinner/token/`;
         var data={token:token}
        model.invoke_service(uri,data,function(data) {
          $cc=data.json.cc;
          waiter_key=data.json.key;
          caption=data.json.caption;
          zone=data.json.zone;

          views.print_caption_waiter("caption-waiter",caption);
        },
        function(error) {
          window.location.href="./?view=&dm_scr="+ws;
          alert(error.message);
        },"POST",false,false);
      },
      get_waiters:function (selectwaiter="") {
        var uri=url+"pos/dinner/waiters/";
        if(selectwaiter!=""){uri+="?access=true"}
        model.invoke_service(uri,null,
          function(data)
          {
            list_waiters=data;
            if(selectwaiter!="")
            {
              views.select_waiter(selectwaiter,data);
            }else{views.list_waiters(data);}
            
          }
          ,function(error){alert(error.message);}
          ,"GET",false);
      },
      login:function(e)
      {
        var waiter=document.querySelector("#selectwaiter");
        var pwd=document.querySelector("#pwdlogin");
        var btn=document.querySelector("#"+e.id);

        var uri=url+"pos/dinner/waiters/login/";

        var data={
          waiter:waiter.value,
          pwd:pwd.value
        }

        btn.classList.add("disabled");
        model.invoke_service(uri,data,
          function(data)
          {
            btn.classList.remove("disabled");
            if(data==null)
            {
              alert("Usuario o contraseña incorrecta.");
              return;
            }
            token="";
            controller.open_view("vw_principal",`&dmtm_token=${data.token}`);
            //window.location.href=`/?view=vw_principal&dmtm_token=${data.token}`;
          }
          ,function(error){
            alert(error.message);
            btn.classList.remove("disabled");
          }
          ,"POST",false);
      },
      workspace:function()
      {
        var ws=document.querySelector("#idws");
        if(ws.value=="")
        {
          alert("El id del workspace es requerido.");
          return;
        }
        var params=`&dm_scr=${ws.value}`;
        controller.open_view("vw_principal",params)
      },
      guid:function(){
        //guid con - //[1e7]+-1e3+-4e3+-8e3+-1e11
        //guid sin - //[1e7]+1e3+4e3+8e3+1e11
        return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
}