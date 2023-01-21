Instalación de Smart Pack For Restaurants (SPFR)

1. Coloque los archivos o carpetas necesarias junto a los binarios de devkron
	- Basic Web Layer (dkl-web) 
		- fso
		-webauth.dkl
		-website.dkl
		Link de descarga: https://github.com/Induxsoft/dkl-web
	-Soporte de impresión de bajo nivel y protocolo ESC/POS para Devkron
		-prnsender
		-esc_pos.dkh
		-esc-pos-wrapper.dll
		Link de descarga windows: https://github.com/Induxsoft/lowlevelprn4dkl/raw/main/build/lowlevprn-win-x64.zip
		Link de descarga linux: https://github.com/Induxsoft/lowlevelprn4dkl/raw/main/build/lowlevprn-lnx-x64.zip
		
	-devkron.license (Si no cuenta con una licencia de devkron póngase en contacto con induxsoft)

2. Ejecute el script del archivo .sql en la base de datos a utilizar para SPFR

3. Configure el archivo connections.xml que se encuentra junto a los binarios de devkron

4. Dentro de la carpeta web, cree una carpeta con el nombre de su IP/Host

4.1. Coloque el contenido de SPFR_APP en la carpeta creada anteriormente

5. Configure la conexión en el archivo config.dk 
	5.1. coloque el nombre cualificado de una conexión en @session_config/connection
	5.2. establezca el valor de la variable @use_bdconfig a true (para que la aplicaión tome la conexión especificada)
	5.3. establezca el valor de la variable @accept_qnames a true (para que el servicio acepte nombres cualificado de conexión)
	
6. Configure el proveedor de identidades (por default esta configurado con el idp de induxsoft) puede cambiarlo en _protected/auth.dk
	en la linea 12 ,colocando el proveedor de identidades de base de datos (dbidp.dk)
	6.1.- si en proveedor de identidades es dbidp.dk, coloque el nombre cualificado de una conexión en el idp, en la variable dbqname 
	
7. Instalar la aplicaion android que se encuentra en EBrowser
Ejemplos para acceder :
		Enterprise browser Android o web
		http(s)://IP/Host/comandas/
		http(s):// IP/Host/kds/
		http(s):// IP/Host/gestion-meseros/
		http(s):// IP/Host/gestion-kds/






