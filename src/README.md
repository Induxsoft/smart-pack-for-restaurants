Instalación de Smart Pack For Restaurants (SPFR)

1. Coloque los archivos o carpetas necesarias junto a los binarios de devkron
	- Basic Web Layer (dkl-web) 
		- fso
		- webauth.dkl
		- website.dkl
  		- cookies.dkl		
		
		```Link de descarga:``` https://github.com/Induxsoft/dkl-web
	- Soporte de impresión de bajo nivel y protocolo ESC/POS para Devkron
		- prnsender
		- esc_pos.dkh
		- esc-pos-wrapper.dll
		
		```Link de descarga windows:``` https://github.com/Induxsoft/lowlevelprn4dkl/raw/main/build/lowlevprn-win-x64.zip
		
		```Link de descarga linux:``` https://github.com/Induxsoft/lowlevelprn4dkl/raw/main/build/lowlevprn-lnx-x64.zip
		
	- devkron.license (Si no cuenta con una licencia de devkron póngase en contacto con induxsoft)

2. Ejecute el script del archivo dm_spfr.sql en la base de datos a utilizar para SPFR

3. Configure el archivo connections.xml que se encuentra junto a los binarios de devkron

4. Dentro de la carpeta web, cree una carpeta con el nombre de su IP o Host

5. Coloque el contenido de smart-pack-for-restaurants en la carpeta creada anteriormente

6. Configure la conexión en el archivo config.dk 

	- Coloque el nombre cualificado de una conexión en @config/connection
	
	- Establezca el valor de la variable @use_bdconfig a true (para que la aplicaión tome la conexión especificada)
	
	- Establezca el valor de la variable @accept_qnames a true (para que el servicio acepte nombres cualificado de conexión)
	
8. Coloque el nombre cualificado de una conexión en el idp, en la variable dbqname 
	
Ejemplos para acceder :
		Enterprise browser Android o web
		
		http(s)://Host/comandas/
		
		http(s)://Host/kds/
		
		http(s)://Host/gestion-meseros/
		
		http(s)://Host/gestion-kds/






