CREATE TABLE IF NOT EXISTS `ut_dm_tmm` (
  `sys_pk` int(11) NOT NULL AUTO_INCREMENT,
  `access_movil` int(11) DEFAULT NULL,
  `agente` int(11) DEFAULT NULL,
  `cc` int(11) DEFAULT NULL,
  `zn` int(11) DEFAULT NULL,
  `pwd` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`sys_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `ut_dn_dmm_token` (
  `sys_pk` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(32) NOT NULL,
  `creacion` datetime NOT NULL,
  `expiracion` datetime NOT NULL,
  `revocado` int(11) DEFAULT '0',
  `datos` text,
  PRIMARY KEY (`sys_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `dm_kds` (
  `cproduccion` int(11) DEFAULT NULL,
  `pwd` varchar(32) DEFAULT NULL,
  `shortpool` int(11) DEFAULT NULL
) 

