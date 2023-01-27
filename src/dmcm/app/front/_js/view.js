var body_mesas=document.querySelector(".body-mesas");
var data_foodbev=[];
var list_orders=[];
var list_requireds=[];
var list_adds_dmns={};
var views={
      init:function()
      {
            
      },
      print_mesas:function(data) {
            var html="";
          for (var i =0; i<data.length; i++) {
            var itm=data[i];
            html+=`<div class="${css_class_mesa} mesa_${itm.sys_pk}" onclick="controller.verify_size_window(\'${itm.sys_pk}\',\'${itm.code}\',${itm.available_seats})">
                        <div class="${this.color(itm.status)} mesa_color_estatus"></div>            
                        <div class="div-mesa_person">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                              </svg>
                              <p class="p-person">${itm.occupied_seats}/${itm.available_seats}</p>
                              <div class="mesa_color ${this.flag_color(itm.flag)} mesa_color_${itm.sys_pk}"></div>
                        </div>
                        <div style="display:flex; align-items:center;justify-content:center; margin-top:28px;">
                              <svg width="30" height="30" fill="#333" viewBox="0 0 37.325 24.419" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="userSpaceOnUse" id="prefix__a"><path d="M19.998 154.593l-5.551 8.074 10.707 7.297 4.271-6.212c-.023-.041-.02-.108.034-.182.045-.061.081-.129.12-.193a1.7 1.7 0 00.05-.097c-.019-.04-.014-.097.031-.164l.119-.172.004-.006.019-.044c.033-.087.072-.172.11-.257a2.002 2.002 0 01.206-.377l.104-.155.098-.142c.03-.048.065-.093.094-.141l.053-.094z" fill="red" stroke-width=".265"/></clipPath></defs><path d="M37.323 0L11.517.03.005 7.842l25.805-.03zM.004 9.954h2.75v14.45H.004zM23.498 9.968h2.75v14.45h-2.75zM34.575 2.557h2.75v14.45h-2.75z"/><path d="M11.454.057h2.75v14.45h-2.75z"/><path d="M0 7.839l25.786-.035.003 2.535-25.786.035z"/><path clip-path="url(#prefix__a)" transform="matrix(.82843 -.5601 .56968 .82186 -79.693 -115.26)" d="M30.058 161.652l-.001.001h.001zm-.001.001H15.144v1.489h13.794c0-.035.01-.076.034-.12a.266.266 0 01.099-.107.34.34 0 01.082-.04l.006-.006a.576.576 0 00.039-.047l.053-.075.06-.087.062-.09.063-.093.053-.077.045-.064.045-.066.04-.06.043-.06.049-.071.05-.074c.016-.024.034-.047.052-.07l.038-.047a4.061 4.061 0 00.074-.1l.029-.042a.266.266 0 01.103-.093z"/><path d="M37.321 0l-.133.001v1.714l.066.015v-.514l.003-.084.005-.062a3.624 3.624 0 00.004-.124v-.05c0-.063.015-.11.038-.144l.002-.016.004-.017V.716.713l-.001.003a.143.143 0 01.013-.048zm-.133 1.853v.194l.02-.116a.127.127 0 01.03-.066l-.05-.012z"/><path d="M36.162.001h1.159v2.542h-1.16z"/><path d="M37.09 2.618l.193-.13.037.056-.192.13z"/><path d="M37.174 2.527h.029v.03h-.03zM25.286 7.964L36.114.749l.446.653-10.827 7.215z"/></svg>
                        </div>
                        <div class="div-mesa_name">
                              <a>${itm.code}</a>
                        </div>
                  </div>`;
          }
          body_mesas.innerHTML=html;
          event.hide_loading();
      },
      print_foodbev:function(data,lineDesc="")
      {
            var content=document.querySelector(".column-content");
            var barra=document.querySelector(".barr-atr");
            barra.classList.add("barra_product");
            barra.style="";
            barra.setAttribute("onclick","controller.back();")
            barra.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="25" style="height: 100%;width: 3rem;color: #FFF; position:absolute;left:0; background-color:var(--purple);" height="25" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                        <div class="descr-line">${lineDesc}</div>`;

            var html="";
            data_foodbev=data;
            for (var i =0; i <data.length; i++) {
                  var itm=data[i];
                  html+=`
				  	<div class="column-content-foodbev shadow" id="foodbev_${itm.sku}" onclick="controller.data_foodbev(${itm.sys_pk})">
						<div class="foodbev-img-container">
							<div class="foodbev-img">
								<img src="https://i.pinimg.com/originals/4d/ab/43/4dab43f36bd8cc659dfa9d9def255c4c.jpg" style="width: inherit;" />								
							</div>							
						</div>
						<div class="prod-center">
							<small>${itm.desc_cp}</small>
						</div>
						<div class="foodbev-btn foodbev-line" style="min-height:4.69rem;display:flex;align-items:center;line-height: 1.2rem;font-weight: 500; flex-wrap:wrap;">
							${itm.description}
							<div class="foodbev-price foodbev-price-line">
								<small >$ ${views.format(itm.price,2,".",",")}</small>
							</div>
						</div>
                	</div>`;
            }
            content.innerHTML=html;
            
            event.hide_loading();

      },
      exist_adds:function(options)
      {
             for(l=0;l<options.length;l++)
            {
                  var op=options[l];
                  if(op.name===name_addcs)
                  {
                        return true;
                  }
            }
            return false;
      },
      add_foodbev:function(sys_pk,other=false)
      {
            var lista_foodbev=document.querySelector(".list-products-li");
            var html=lista_foodbev.innerHTML;
            for (var i = 0; i<data_foodbev.length; i++) 
            {
                var itm=data_foodbev[i];
                var countadd=1;
                if(itm.options && list_adds_dmns && !views.exist_adds(itm.options)){
                  itm.options.push(list_adds_dmns);
                }
                        
                        

                if(sys_pk===itm.sys_pk)
                {
                  var uuid=controller.guid();
                  var options=itm.options;
                  var required=false;
                  var prodcenter={
                        code:itm.cod_cp,
                        description:itm.desc_cp
                  }
                  var sku={
                        prodcenter:prodcenter,
                        uuid:uuid,
                        sku:itm,
                        quantity:1,
                        price:views.format(itm.price * 1,2,".",","),
                        adds:0,
                        total:0,
                        _priceProd_:views.format(itm.price * 1,2,".",","),
                  }

                  if(other){
                         controller.other_equals(uuid,sys_pk);
                  }
                  else
                        list_orders.push(sku);

                  if(controller.isrequired(options))
                  {
                        controller.show_modal('#modal-indicaciones');
                        views.show_indications(options,uuid);
                  }

                 
                   html+=`<li class="list-group-item" id="${uuid}" >
                              <div class="item-order">
                                    <div class="small-description">
                                          <h5>${itm.description}</h5>
                                    </div>
                                    <div class="div-price" id="div-price_${uuid}">
                                          <h3>$ ${views.format(itm.price * 1,2,".",",")}</h3>
                                    </div>
                                    <div class="" id="detail-indications_${uuid}"></div>
                              </div>
                        <small class="list-btns">
							<button onclick="controller.data_foodbev(${itm.sys_pk},true)" title="Otro igual a este">
				  				<div>
				  					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" /><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" /></svg>
								</div>
								<span>Otro igual</span>
							</button>
							<button onclick='controller.indicatios(${JSON.stringify(itm)},"${uuid}")'>
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" /><path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" /></svg>
								</div>
								<span>Indicaciones</span>
							</button>
							<button onclick="controller.quit('${uuid}')">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-bag-dash" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" /><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" /></svg>
								</div>
								<span>quitar</span>
							</button>
                        <small>
                  </li>`;
                  break;
                }
              
            }
            lista_foodbev.innerHTML=html;
            views.counter();
            views.showTotal();
            if(other)
            {
                   var btnacept=document.querySelector("#btn_addcs");
                  btnacept.click();
            }
            var btnexecute=document.querySelector("#btnExecute");
            if(btnexecute)
                  btnexecute.setAttribute("Onclick","controller.send_data_orders();");
      },
      select_waiter:function(idselect,data)
      {
            var select=document.querySelector("#"+idselect);
            var options="";

            for (var i =0; i <data.length; i++) {
                  var itm=data[i];
                  options+=`<option value="${itm.sys_pk}">${itm.nombre}</option>`;
            }
            select.innerHTML=options;
      },
      counter:function()
      {
            var count=document.querySelector("#count");
            var lista_foodbev=document.querySelector(".list-products-li");
            var counter=lista_foodbev.childNodes.length;
            if(counter>99)
                  counter="99+";
            count.innerHTML=counter;
      },
      showTotal:function()
      {
            var price=0;
            list_orders.forEach(function(e,i){
                  price+=Number(e.price);
                  // if(e.adds)
                  //       price+=Number(e.adds);
                  // if(e.options)
                  // {
                  //       var options=e.options;
                  //       for(var i=0;i<options.length;i++)
                  //       {
                  //             var values=options[i].values;
                  //             for(var j=0;j<values.length;j++)
                  //             {
                  //                   var val=values[j];
                  //                   if(val.amount)
                  //                         price+=Number(val.amount);
                                    
                  //             }
                  //       }
                  // }
                        
            });
            var eprice=document.querySelector("#div-total-all");
            var currenttotal=document.querySelector("#totalcurrent");
            if(currenttotal)
            {
                  var ct=currenttotal.getAttribute("total");
                  var t=price + Number(ct.replace(",",""));
                  // currenttotal.setAttribute("total",views.format(t,2,".",","));
                  currenttotal.innerHTML=`$ ${views.format(t,2,".",",")}`;
            }
            eprice.innerHTML=`<span>Total: $ </span>${views.format(price,2,".",",")}`;
      },
      showSubTotal:function(uuid,price)
      {
            var subtotal=document.querySelector(`#div-price_${uuid}`);
            if(subtotal)
                  subtotal.innerHTML=`<h3>$ ${views.format(price,2,".",",")}</h3>`;
      },
      show_indications:function(options,uuid,uuid_ant="")
      {
            var multiples=document.querySelector("#div-multiples");
            if(multiples)multiples.innerHTML="";

            var select=document.querySelector("#div-singles");
            if(select)select.innerHTML="";

            var html="";
            var html_select="";
            list_requireds=[];

            if(!options)
                  var options=[];


            if(options)
                  for (var a = 0;a<options.length; a++) {
                        
                  var itm=options[a];
                  var itm_val=itm.values;

                  var html_val="";

                  if(itm.required)
                        list_requireds.push(itm);


                  if(itm.type==="multiple")
                  {
                        for(j=0;j<itm_val.length;j++)
                        {
                              var val=itm_val[j];
                              var checked=false;
                              list_orders.forEach(function(elem,index) {
                                    if(elem.uuid===uuid || elem.uuid===uuid_ant)
                                    {
                                          if(elem.options)
                                          {
                                                elem.options.forEach(function(el,i){
                                                      var values_list=el.values;
                                                      values_list.forEach(function(e,ind){
                                                            if(val.text.replace(/ /g,"")==e.text.replace(/ /g,""))
                                                            {
                                                                  checked=true;
                                                                  return false;
                                                            }
                                                      });
                                                });
                                          }
                                    }
                                    
                              });
                              var check="";
                              if(checked)
                                    check="checked";
                              var sku="";
                              if(val.sku)
                                    sku=val.sku;
                              html_val+=`<div class="div-check_${itm.name.replace(/ /g,"")}">
                                          <input type="checkbox" ${check}="true" sku="${sku}" amount="${views.format(val.amount,2,".",",")}" id="${val.text.replace(/ /g,"")}" value="${val.text}">
                                          <label for="${val.text.replace(/ /g,"")}">${val.text}</label>
                                    </div>`;

                        }
                        var name="";
                        if(itm.name===name_addcs){name="Adiccional";}
                        else{name=itm.name;}
                        html+=`<h3 class="h3-name" value="${itm.name}">${name}</h3>
                        <div class="div-multiple">
                              ${html_val}
                        </div>
                        `;
                  }
                  else if(itm.type==="single")
                  {
                        var selectoption=`<select id="single_${itm.name.replace(/ /g,"")}_" class="form-control w-100 select-apparence ">
                        <option value=""></option>`;
                        for(t=0;t<itm_val.length;t++)
                        {
                              var valt=itm_val[t];
                              var selected=false;
                              for(var v=0;v<list_orders.length;v++)
                              {
                                    var elem=list_orders[v];
                                    if(elem.uuid===uuid)
                                    {

                                          if(elem.options)
                                          {
                                                for (var el =0; el<elem.options.length; el++) {
                                                      var values_list=elem.options[el].values;
                                                      for(var e=0;e<values_list.length;e++)
                                                      {
                                                            var elm=values_list[e];
                                                            if(valt.text.replace(/ /g,"")==elm.text.replace(/ /g,""))
                                                            {
                                                                  selected=true;
                                                                 break;
                                                            }
                                                            if(selected)
                                                                  break;
                                                      }
                                                      if(selected)
                                                            break;
                                                }
                                          }
                                    }
                                    if(selected)
                                          break;
                              }
                              var selection="";
                              if(selected)
                                    selection="selected";
                              selectoption+=`
                                    <option ${selection}="true" amount="${views.format(valt.amount,2,".",",")}" value="${valt.text}">${valt.text}</option>
                              `;
                        }
                        selectoption+=`</select>`;
                        html_select+=`
                        <div class="body-single">
                              <h3 class="h3-name">${itm.name}</h3>
                              <div class="div-single_${itm.name.replace(/ /g,"")}">
                                    ${selectoption}
                              </div>
                        </div>
                        `;
                        
                  }
                  
                  
            }
            if(html=="")
                  multiples.style.display="none";
            else
            {
                  multiples.innerHTML=html;
                  multiples.style.display="block";
            }
            if(html_select=="")
                  select.style.display="none";
            else
            {
                  select.innerHTML=html_select;
                  select.style.display="grid";
            }

            var notas=document.querySelector("#txtnotas-indicacion");
            list_orders.forEach(function(elem,index){
                  if(elem.uuid==uuid)
                  {
                        var times=document.querySelectorAll("#times > button");
                        times.forEach(function(e,i){
                              e.classList.remove("hover-btn");
                              if(elem.time===e.getAttribute("value"))
                              {
                                    e.classList.add("hover-btn");
                                    return false;
                              }
                        });
                        if(elem.notas)
                        {
                              notas.value=elem.notas;
                              return false;
                        }else
                        {
                              notas.value="";
                              return false;
                        }
                  }
                        
            });

            var btnacept=document.querySelector("#btn_addcs");
            btnacept.setAttribute("onclick",`controller.add_indications("${uuid}")`);
      },
      add_details:function(time,text_detail,detail_indications)
      {
        var tm="";
        if(time)
        {
          tm=`<small class="lifetime">${controller.lifetime(time.getAttribute("value"))+" Tiempo"}</small>`;
          time.classList.remove("hover-btn");
        }
        if(text_detail!="" && text_detail!=",")
        {
          var tm1=`<br>${tm}`;
          detail_indications.innerHTML=`<small>${text_detail.slice(0,-1)}</small>${tm1}`;
          detail_indications.classList.add("detail-indications");
        }else
        {
          detail_indications.innerHTML=`${tm}`;
          detail_indications.classList.add("detail-indications");
        }
      },
      format:function(number, decPlaces, decSep, thouSep)
      {
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
          decSep = typeof decSep === "undefined" ? "." : decSep;
          thouSep = typeof thouSep === "undefined" ? "," : thouSep;
          var sign = number < 0 ? "-" : "";
          var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
          var j = (j = i.length) > 3 ? j % 3 : 0;

          return sign +
              (j ? i.substr(0, j) + thouSep : "") +
              i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
              (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
      },
      color:function(status)
      {
            //el valor de retorno es una clase css
            switch(status)
            {
                  case 0:return "table_available";//disponible
                  case 1:return "table_opened"; //abierta
                  case 2:return "table_closed"; //cerrada
            }
      },
      flag_color:function(flag)
      {
            //el valor de retorno es una clase css
            switch(flag)
            {
                  case 0:return "flag_white";
                  case 1:return "flag_yellow"; 
                  case 2:return "flag_green"; 
                  case 3:return "flag_orange"; 
                  case 4:return "flag_purple"; 
                  default:return "flag_white";
            }
      },
      print_ordenes:function(data)
      {
            var table_ordenes=document.querySelector(".ordenes");
            var lbltotal=document.querySelector("#lbltotal");
            var lblticket=document.querySelector("#lblticket");
            var card_info=document.querySelector(".card-info");
            var name_table=document.querySelector("#name_table");

            var new_command=document.querySelector("#new_command")
            var message=document.querySelector("#message")
            var imp_close=document.querySelector("#imp_close")
            var re_print=document.querySelector("#re_print")
            var mesa=document.querySelector(`.mesa_${data.sys_pk}`);
            var mesa_color=document.querySelector(`.mesa_color_${data.sys_pk}`);

            var infvnt=document.querySelector("#info-vnt");
            var lblnotavnt=document.querySelector("#lblnotavnt");

            lblnotavnt.innerHTML=data.notetable;
            if(infvnt && data.notetable=="")
                  infvnt.style.height="5rem";
            else
                  infvnt.style.height="4rem";

            if(mesa)
                  if(mesa.classList.contains("table_opened"))
                        mesa.classList.remove("table_opened");
            if(mesa)
                  mesa.classList.add(this.color(data.status))
            // mesa_color.classList.add(this.flag_color(data.flag))
            if(card_info)
            {
                  card_info.style.opacity="";
                  card_info.style.pointerEvents="";
            }
            
            var html="";
            var total=0;
            var data_orders={
                  sys_pk:data.sys_pk,
                  sys_guid:data.sys_guid,
                  reference:data.reference,
                  balance:data.balance,
                  code:data.code
            }
          for (var i =0; i<data.orders.length; i++) {
            var itm=data.orders[i];
            total+=itm.total;
            var description=`<b>${itm.description}</b>`;
            if (Number(itm.time)!=0)
                  description+=` ${controller.lifetime(itm.time)} Tiempo.`;
            if(Number(itm.discount)!=0)
                  description+=`${itm.discount}`;
            if(itm.notes!="")
                  description+=`</br>${itm.notes}`;
            description+=`</br><label class="fsz-12" style="color:#888;">${itm.created}</label>`;

            html+=`<tr>
                  <td style="padding-bottom: 16px;">
                        <div class="cellgrid">
                              <div class="divplus" onclick='controller.addmore(${JSON.stringify(data_orders)},${itm.linea},"${itm.sku}")'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                              </div>
                              <div class="text-center">
                                    ${itm.quantity}
                              </div>
                              <div class="divminus" onclick='controller.quit_prod("${data.sys_guid}","${itm.sku}",${itm.sys_pk},${itm.pkdorden})'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                    </svg>
                              </div>
                        </div>                  
                  </td>
                  <td style="width:60%;padding-bottom: 16px;">${description}</td>
                  <td class="text-end" style="padding-bottom: 16px; color:var(--purple);">$ ${views.format(itm.total,2,".",",")}</td>
            </tr>`;
          }
          if(lblticket)
          lblticket.innerHTML=data.reference;
          if(lbltotal)
            lbltotal.innerHTML="$ "+views.format(data.balance,2,".",",");
         if(table_ordenes)
          table_ordenes.innerHTML=html;
         if(name_table)
          name_table.innerHTML=`<div class=""><h3>${data.code}</h3></div><br>`;

            re_print.setAttribute("onclick",`controller.reprint("${data.sys_pk}")`);
          if(data.status==2)
          {
            if(new_command)
            {
                  new_command.setAttribute("onclick",``);
                  new_command.classList.add("disabled");
            }
            if(message)
                  message.classList.add("disabled");
            if(re_print)
                  re_print.classList.remove("disabled");
            if(imp_close)
            {
                  imp_close.innerHTML =`<div class="div-img"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16"><path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" /></svg></div>Reabrir`;
                  imp_close.setAttribute("onclick",`controller.reopen_table("${data.sys_pk}")`);
            }
            
           
          }else if (data.status==1)
          {
            if(new_command)
            {
                  new_command.classList.remove("disabled");
                  new_command.setAttribute("onclick",`controller.new_command("${data.sys_guid}",${data.sys_pk},"${data.code}","${data.reference}","${views.format(data.balance,2,".",",")}");`); //newcommand
            }
            if(message)
                  message.classList.remove("disabled");
            if(re_print)
                  re_print.classList.add("disabled");
            if(imp_close)
            {
                  imp_close.innerHTML =`<div class="div-img"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /></svg></div>Imp/Cerrar`;
                  imp_close.setAttribute("onclick",`controller.close_table("${data.sys_pk}")`);
            }
            
          }

          
      },
      print_prodc:function(data)
      {
            var prodc_display=document.querySelector(".div-prodc");
            var html=prodc_display.innerHTML;

            for (var i =0; i<data.length; i++) {
                  var itm=data[i];
                  html+=`<div class="product" id="product_${i+1}">
                        <button class="btn" data="centrop" onclick="controller.foodbev(this,${itm.sys_pk})" id="cproduccion">
                        ${itm.description}
                        </button>
                  </div>
                  `;
            }
            prodc_display.innerHTML=html;
      },
      print_lines:function(data)
      {
            var line_display=document.querySelector(".column-content");

            var html="";

            for (var i =0; i<data.length; i++) {
                  var itm=data[i];
                  html+=`
					<div class="column-content-foodbev shadow" id="linea_${itm.sys_pk}" onclick="controller.foodbev(this,'',${itm.sys_pk},'${itm.description}')">
						<div class="foodbev-img-container">
							<div class="foodbev-img">
								<img src="data:image/png;base64,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" style="width: inherit;" />								
							</div>							
						</div>
						<div class="foodbev-btn" style="min-height:4.69rem;display:flex;align-items:center;line-height: 1.2rem;font-weight: 500;">
							${itm.description}
						</div>
						<div class="foodbev-price">
							<small ></small>
						</div>
					</div>`;
                 
            }
            line_display.innerHTML=html;
            event.hide_loading();
      },
      print_caption_waiter:function(id,text)
      {
            var elem=document.querySelector("#"+id);
            if(elem)
                  elem.innerHTML=text;
      },
      select_table:function(e)
      {
            // var elem=document.querySelector("#"+id);
            var tables=document.querySelectorAll(".body-mesas div");
            waiters.forEach(function (element,index) {
                  element.classList.remove("table-selected");
            });

            var elm=document.querySelector(e);
            elm.classList.add("table-selected");
      }
    };